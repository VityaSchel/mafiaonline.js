import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIChat from './chat.js'
import { MafiaOnlineAPIError } from './utils.js'
import MafiaRoom from './constructors/room.js'
import setupEventSystem from './helpers/_eventsSystem.js'
import ChatMessage from './constructors/chatMessage.js'

type RoomsListEvent = 'addRoom' | 'removeRoom' | 'updatePlayersInRoom' | 'updateRoomStatus'

class MafiaOnlineAPIRooms {
  monitoringRooms = false
  _roomListener

  /**
   * Get rooms list and subscribe for changes
   * @memberof module:mafiaonline
   * @returns {object} result Returning object
   * @returns {function} result.unsubscribe Function to unsubscribe. Always unsubscribe when you're not using monitoring!
   * @returns {function} result.getRooms Get updating array of rooms (local cache, not request)
   * @returns {function} result.addEventListener Subscribe to updates of specified event type ('addRoom': (room: MafiaRoom) => void; 'removeRoom': (room: MafiaRoom) => void; 'updatePlayersInRoom': (roomID: string, players: number) => void; 'updateRoomStatus': (roomID: string, status: number) => void)
   * @returns {function} result.removeEventListener Unsubscribe from updates of specified event type 
   */
  async startRoomMonitoring(): Promise<{ 
    unsubscribe: () => void, 
    getRooms: () => MafiaRoom[], 
    addEventListener: (eventType: RoomsListEvent, callback: () => void) => void,
    removeEventListener: (eventType: RoomsListEvent, callback: () => void) => void
  }> {
    await this._waitForReadyState()

    let rooms: MafiaRoom[] = []
    
    const eventSystem = setupEventSystem(['addRoom', 'removeRoom', 'updatePlayersInRoom', 'updateRoomStatus'])

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
            eventSystem.internal.broadcast('removeRoom', removedRoom)
          })()
          break

        case 'add':
          processRoom(json['rr'])
          break

        case 'pn':
          eventSystem.internal.broadcast('updatePlayersInRoom', json['ro'], json['n'])
          break

        case 'gsrl':
          eventSystem.internal.broadcast('updateRoomStatus', json['ro'], json['s'])
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
      eventSystem.internal.broadcast('addRoom', roomInstance)
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
      getRooms: () => rooms,
      addEventListener: eventSystem.external.addEventListener,
      removeEventListener: eventSystem.external.removeEventListener
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

    const joined = () => {
      room.joined = true
      this._sendData({ ty: 'cp', ro: room.getID() })
      const unsubscribe = this._manageChat({
        onMessage: (msg: ChatMessage) => room._eventsSystem.internal.broadcast('message', msg),
        onLeave: () => this._sendData({ ty: 'rp', ro: room.getID() })
      })

      const roomEventsListener = this._processRequestResponse(response => {
        const json = JSON.parse(response)
        switch(json['ty']) {
          case 'roles':
            room.roles = json['roles']
            break

          case 'gd':
          case 'gs':
            room._eventsSystem.internal.broadcast('phaseChange', { 
              0: 'nighttime_chat', 
              1: 'nighttime_vote',
              2: 'daytime_chat',
              3: 'daytime_vote'
            }[json['d']])
            break

          default:
            break
        }
      })

      this._clientSocket.addListener('data', roomEventsListener)

      room.chatUnsubscribe = unsubscribe
      room.eventsUnsubscribe = () => {
        this._clientSocket.removeListener('data', roomEventsListener)
      }
    }

    const result = await this._sendRequest({ ty: 're', psw: password, ro: room.getID() }, 're')
    switch (result['ty']) {
      case 'rpiw':
        throw new MafiaOnlineAPIError('ERRRPIW', 'Specified room password is wrong')
  
      case 'ulne':
        throw new MafiaOnlineAPIError('ERRULNE', 'Your level is not high enough to join this room')
  
      case 're':
        joined()
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
    await room.eventsUnsubscribe()
  }
}


interface MafiaOnlineAPIRooms extends MafiaOnlineAPIConnection, MafiaOnlineAPIChat { }

export default MafiaOnlineAPIRooms