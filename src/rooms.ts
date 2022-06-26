import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIChat from './chat.js'
import Room from './constructors/room.js'
import { MafiaOnlineAPIError } from './utils.js'

class MafiaOnlineAPIRooms {
  monitoringRooms = false

  /**
   * Get rooms list and subscribe for changes
   * @memberof module:mafiaonline
   * @param callback Callback that gets called with argument of type Room
   * @returns {function} Function to unsubscribe
   */
  async startRoomMonitoring(callback: (room: Room) => void): Promise<() => void> {
    await this._waitForReadyState()

    const roomIDs = []

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
      if (!this.monitoringRooms) return
      this.monitoringRooms = false
      this._clientSocket.removeListener('data', roomListener)
      this._clientSocket.addListener('data', this._defaultSocketResponseListener)
    }

    const processRoom = room => {
      if(roomIDs.includes(room.o)) return

      roomIDs.push(room.o)
      const roomInstance = new Room(room)
      roomInstance._join = this.joinRoom
      roomInstance._leave = this.leaveRoom
      callback(roomInstance)
    }

    this._clientSocket.addListener('data', roomListener)
    this.monitoringRooms = true
    this.log('Subscribed to room monitoring')
    this._sendData({ ty: 'acrl' })

    return async () => {
      stopMonitoring()
      await this._sendRequest({ ty: 'acd' })
    }
  }

  /**
   * Join room. You can also call join() function directly on Room instance
   * @memberof module:mafiaonline
   * @param {Room|string} room Room instance or room ID (looks like ru_room_62bfahsdga54ghsj12dasd)
   * @param {string} [password] Password in clear text, hashing is done on library side
   */
  async joinRoom (room: Room | string, password = '') {
    if(this.monitoringRooms) {
      this.monitoringRooms = false
      this._clientSocket.removeListener('data', roomListener)
      this._clientSocket.addListener('data', this._defaultSocketResponseListener)
    }

    if (!(room instanceof Room)) {
      room = new Room()
    }

    const result = await this._sendRequest({ ty: 're', psw: password, ro: room.getID() })
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
            onLeave: () => this._sendData({ ty: 'rp', ro: roomInstance.getID() })
          })
          roomInstance.chatUnsubscribe = unsubscribe
        })()
        return true
  
      default:
        return
    }
  }
  
  const leaveRoom = async (roomInstance: Room) => {
    await roomInstance.chatUnsubscribe()
  }
}


interface MafiaOnlineAPIRooms extends MafiaOnlineAPIConnection, MafiaOnlineAPIChat { }

export default MafiaOnlineAPIRooms