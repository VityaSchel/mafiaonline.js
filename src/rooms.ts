import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIChat from './chat.js'
import Room from './constructors/room.js'
import { MafiaOnlineAPIError } from './utils.js'

class MafiaOnlineAPIRooms {

  /**
   * Get rooms list and subscribe for changes
   * @param callback Callback that gets called with argument of type Room
   * @returns {function} Function to unsubscribe
   */
  async startRoomMonitoring(callback: (room: Room) => void): Promise<() => void> {
    await this._waitForReadyState()

    const roomIDs = []
    let monitoring = false

    this._clientSocket.removeListener('data', this._defaultSocketResponseListener)
    const roomListener = this._processRequestResponse(response => {
      const json = JSON.parse(response)
      switch(json['ty']) {
        case 'rs':
          json['rs'].forEach(processRoom)
          break

        case 'add':
          processRoom(json['rr'])
          break

        default:
          break
      }
    })

    const stopMonitoring = () => {
      if (!monitoring) return
      monitoring = false
      this._clientSocket.removeListener('data', roomListener)
      this._clientSocket.addListener('data', this._defaultSocketResponseListener)
    }

    const joinRoom = async (roomInstance: Room, password = '') => {
      if (!monitoring) return false
      stopMonitoring()
      const result = await this._sendRequest({ ty: 're', psw: password, ro: roomInstance.getID() })
      switch (result['ty']) {
        case 'rpiw':
          throw new MafiaOnlineAPIError('ERRRPIW', 'Specified room password is wrong')

        case 'ulne':
          throw new MafiaOnlineAPIError('ERRULNE', 'Your level is not high enough to join this room')

        case 're':
          (() => {
            roomInstance.joined = true
            this._sendRequest({ ty: 'cp', ro: roomInstance.getID() })
            const unsubscribe = this._manageChat({
              onMessage: roomInstance.onMessage,
              // onLeave: () => throw new MafiaOnlineAPIError('ERRUNEXPECTEDLEAVE', 'Do not leave room chat directly. Instead use roomInstance.leave()')
            })
            roomInstance.chatUnsubscribe = unsubscribe
          })()
          return true

        default: 
          return
      }
    }

    const leaveRoom = (roomInstance: Room) => {
      //
    }

    const processRoom = room => {
      if(roomIDs.includes(room.o)) return

      roomIDs.push(room.o)
      const roomInstance = new Room(room)
      roomInstance._join = joinRoom
      roomInstance._leave = leaveRoom
      callback(roomInstance)
    }

    this._clientSocket.addListener('data', roomListener)
    monitoring = true
    this.log('Subscribed to room monitoring')
    this._sendData({ ty: 'acrl' })

    return async () => {
      stopMonitoring()
      await this._sendRequest({ ty: 'acd' })
    }
  }
}

interface MafiaOnlineAPIRooms extends MafiaOnlineAPIConnection, MafiaOnlineAPIChat { }

export default MafiaOnlineAPIRooms