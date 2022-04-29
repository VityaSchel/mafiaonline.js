import MafiaOnlineAPIConnection from './connection.js'
import Room from './constructors/room.js'

class MafiaOnlineAPIRooms {

  /**
   * Get rooms list and subscribe for changes
   * @param callback Callback that gets called with argument of type Room
   * @returns {function} Function to unsubscribe
   */
  async startRoomMonitoring(callback: (room: Room) => void): Promise<() => void> {
    await this._waitForReadyState()

    const roomIDs = []

    this._clientSocket.removeListener('data', this._defaultSocketResponseListener)
    const chatListener = this._processRequestResponse(response => {
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

    const processRoom = room => {
      if(roomIDs.includes(room.o)) return

      roomIDs.push(room.o)
      callback(new Room(room))
    }

    this._clientSocket.addListener('data', chatListener)
    this.log('Subscribed to room monitoring')
    this._sendData({ ty: 'acrl' })

    return () => {
      this._sendRequest({ ty: 'acd' }, 2)
      this._clientSocket.removeListener('data', chatListener)
      this._clientSocket.addListener('data', this._defaultSocketResponseListener)
    }
  }
}

interface MafiaOnlineAPIRooms extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIRooms