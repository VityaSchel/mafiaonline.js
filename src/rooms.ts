import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIChat from './chat.js'
import { MafiaOnlineAPIError } from './utils.js'
import MafiaRoom from './constructors/room.js'

class MafiaOnlineAPIRooms {
  monitoringRooms = false
  _roomListener

  /**
   * Get rooms list and subscribe for changes
   * @memberof module:mafiaonline
   * @param {function} [addCallback] Optional. Callback that gets called when new room appears with argument of type Room
   * @param {function} [removeCallback] Optional. Callback that gets called when new room appears with argument of type Room
   * @returns {object} result Returning object
   * @returns {function} result.unsubscribe Function to unsubscribe. Always unsubscribe when you're not using monitoring!
   * @returns {function} result.getRooms Get updating array of rooms (local cache, not request)
   */
  async startRoomMonitoring(
    addCallback?: (room: MafiaRoom) => void, 
    removeCallback?: (room: MafiaRoom) => void
  ): Promise<{ unsubscribe: () => void, getRooms: () => MafiaRoom[] }> {
    await this._waitForReadyState()

    let rooms: MafiaRoom[] = []

    const roomListener = this._processRequestResponse(response => {
      const json = JSON.parse(response)
      switch(json['ty']) {
        case 'rs':
          json['rs'].forEach(processRoom)
          break

        case 'rm':
          (() => {
            const removedRoom = rooms.find(room => room.getID() === json['ro'])
            rooms = rooms.filter(room => room.getID() !== json['ro'])
            removeCallback(removedRoom)
          })()
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
      rooms = null
      this._clientSocket.removeListener('data', roomListener)
    }

    const processRoom = (room: object) => {
      if (rooms.some(room => room.getID() === room['o'])) return

      const roomInstance = new MafiaRoom(room)
      rooms.push(roomInstance)
      roomInstance._join = this.joinRoom
      roomInstance._leave = this.leaveRoom
      roomInstance.super = this
      addCallback(roomInstance)
    }

    this._roomListener = roomListener
    this._clientSocket.addListener('data', roomListener)
    this.monitoringRooms = true
    this.log('Subscribed to room monitoring')
    this._sendData({ ty: 'acrl' })

    return {
      unsubscribe: async () => {
        stopMonitoring()
        await this._sendRequest({ ty: 'acd' }, 'uud')
      },
      getRooms: () => rooms
    }
  }

  /**
   * Join room. You can also call join() method directly on Room instance
   * @memberof module:mafiaonline
   * @param {Room} room Room instance. Must be obtained from monitoring by calling startRoomMonitoring() function
   * @param {string} [password] Optional. Password in clear text, hashing is done on library side
   */
  async joinRoom(room: MafiaRoom, password = '') {
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
            onMessage: room._onMessage.bind(room),
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
  async leaveRoom(room: MafiaRoom) {
    await room.chatUnsubscribe()
  }
}


interface MafiaOnlineAPIRooms extends MafiaOnlineAPIConnection, MafiaOnlineAPIChat { }

export default MafiaOnlineAPIRooms