import MafiaOnlineAPIBase from '../base.js'
import { hashPassword } from '../utils.js'
import ChatMessage, { MessageType } from './chatMessage.js'
import PlayerMiniProfile from './playerMiniProfile.js'

/**
 * @class MafiaRoom
 * @classdesc Room of Mafia Online
 * @memberof module:mafiaonline
 */
class MafiaRoom {
  data: any
  joined: boolean
  _join: (roomInstance: MafiaRoom, password?: string) => void
  _leave: (roomInstance: MafiaRoom) => void
  // onMessage?: (message: ChatMessage) => void
  chatUnsubscribe: () => void
  _chatEventsListeners: { onMessage: Array<(msg: object) => void> } = { onMessage: [] }
  super: MafiaOnlineAPIBase | any

  chat: {
    on: (event: 'message'/* | 'text_message'*/, callback: (msg: ChatMessage) => void) => void
    sendText: (msg: string) => void
  }

  constructor(data) {
    this.data = data

    // @ts-expect-error
    this.chat = {}
    this.chat.on = (event: 'message'/* | 'text_message'*/, callback: (msg: ChatMessage) => void) => {
      switch(event) {
        case 'message':
          this._chatEventsListeners.onMessage.push(callback)
          break

        default:
          break
      }
    }
    this.chat.sendText = (msgText: string) => {
      this.super._sendData({ ty: 'rmc', m: { ro: this.getID(), tx: msgText, t: 1 } })
    }
  }

  /**
   * Get ID of room
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {string} ID of room
   */
  getID(): string {
    return this.data.o
  }

  /**
   * Get room name
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {string} Name of room
   */
  getName(): string {
    return this.data.tt
  }

  /**
   * Get minimum level required to join the room
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {number} Minimum level for room
   */
  getMinimumLevel(): number {
    return this.data.mnl
  }

  /**
   * Returns true is room is password protected
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {boolean}
   */
  isPasswordProtected(): boolean {
    return this.data.pw === '1'
  }

  async getPlayers(): Promise<PlayerMiniProfile[]> {
    const players: object = await this.super._sendRequest({ ty: 'gp', ro: this.getID() }, 'pin')
    return players['pls'].map(playerData => new PlayerMiniProfile(playerData))
  }

  /**
   * Enters the room
   * @memberof module:mafiaonline.MafiaRoom
   */
  join(password?: string) {
    this._join.bind(this.super)(this, hashPassword(password))
  }

  /**
   * Leaves the room
   * @memberof module:mafiaonline.MafiaRoom
   */
  leave() {
    this._leave.bind(this.super)(this)
  }

  _onMessage(msg: ChatMessage) {
    // const broadcastToListeners = (listenersType: string) => this._chatEventsListeners[listenersType].forEach(callback => callback(msg))
    // TODO: implement more event types
    // switch (msg.getType()) {
    //   case '':
    //     broadcastToListeners('onMessage')
    //     break
    // }
    this._chatEventsListeners.onMessage.forEach(callback => callback(msg))
  }
}

export default MafiaRoom