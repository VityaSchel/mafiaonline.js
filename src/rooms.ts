import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIChat from './chat.js'
import Room from './constructors/room.js'
import { MafiaOnlineAPIError } from './utils.js'

class MafiaOnlineAPIRooms {
  monitoringRooms = false
  _roomListener

  /**
   * Get rooms list and subscribe for changes
   * @memberof module:mafiaonline
   * @param callback Callback that gets called with argument of type Room
   * @returns {function} Function to unsubscribe
   */
  async startRoomMonitoring(callback: (room: Room) => void): Promise<() => void> {
    await this._waitForReadyState()

    const roomIDs = []

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
    }

    const processRoom = room => {
      if(roomIDs.includes(room.o)) return

      roomIDs.push(room.o)
      const roomInstance = new Room(room)
      roomInstance._join = this.joinRoom
      roomInstance._leave = this.leaveRoom
      roomInstance.super = this
      callback(roomInstance)
    }

    this._roomListener = roomListener
    this._clientSocket.addListener('data', roomListener)
    this.monitoringRooms = true
    this.log('Subscribed to room monitoring')
    this._sendData({ ty: 'acrl' })

    return async () => {
      stopMonitoring()
      await this._sendRequest({ ty: 'acd' }, 'uud')
    }
  }

  /**
   * Join room. You can also call join() method directly on Room instance
   * @memberof module:mafiaonline
   * @param {Room} room Room instance. Must be obtained from monitoring by calling startRoomMonitoring() function
   * @param {string} [password] Optional. Password in clear text, hashing is done on library side
   */
  async joinRoom(room: Room, password = '') {
    if(this.monitoringRooms) {
      this.monitoringRooms = false
      this._clientSocket.removeListener('data', this._roomListener)
    }

    const result = await this._sendRequest({ ty: 're', psw: password, ro: room.getID() }, 're')
    switch (result['ty']) {
      case 'rpiw':
        throw new MafiaOnlineAPIError('ERRRPIW', 'Specified room password is wrong')
  
      case 'ulne':
        throw new MafiaOnlineAPIError('ERRULNE', 'Your level is not high enough to join this room')
  
      case 're':
        (() => {
          room.joined = true
          this._sendData({ ty: 'cp', ro: room.getID() })
          const unsubscribe = this._manageChat({
            onMessage: room.onMessage,
            onLeave: () => this._sendData({ ty: 'rp', ro: room.getID() })
          })
          room.chatUnsubscribe = unsubscribe
        })()
        return true
  
      default:
        return
    }
  }
  
  /**
   * Leave room. You can also call leave() method directly on Room instance
   * @memberof module:mafiaonline
   * @param {Room} room Room instance. Must be obtained from monitoring by calling startRoomMonitoring() function
   */
  async leaveRoom(room: Room) {
    await room.chatUnsubscribe()
  }
}


interface MafiaOnlineAPIRooms extends MafiaOnlineAPIConnection, MafiaOnlineAPIChat { }

export default MafiaOnlineAPIRooms