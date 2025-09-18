import MafiaOnlineAPIBase from '../base.js'
import setupEventSystem, { EventsSystem } from '../helpers/_eventsSystem.js'
import { hashPassword } from '../utils.js'
// import ChatMessage, { MessageType } from './chatMessage.js'
import PlayerMiniProfile from './playerMiniProfile.js'
import { API_ROLES_KEYS } from '../data/constants.js'
import MafiaUser from './user.js'

type EventType = 'message' | 'gameStarted' | 'rolesRevealed' | 'phaseChange'

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
  chatUnsubscribe: () => void
  eventsUnsubscribe: () => void
  _eventsSystem: EventsSystem
  super: MafiaOnlineAPIBase | any
  roles: { userID: string, roleID: typeof API_ROLES_KEYS[keyof typeof API_ROLES_KEYS] }[]
  deadPlayers: string[]

  /**
   * Subscribe to events ('message': (msg: ChatMessage) => void; 'gameStarted': () => void; 'roleRevealed': (roleID: number, userID: string) => void; 'playerDied': (userID: string) => void; 'newVoteForPlayer': (userID: string, votes: number) => void; 'phaseChange': (phase: 'daytime_chat' | 'daytime_vote' | 'nighttime_chat' | 'nighttime_vote') => void)
   * @memberof module:mafiaonline.MafiaRoom
   */
  addEventListener: (eventType: EventType, callback: () => void) => void
  removeEventListener: (eventType: EventType, callback: () => void) => void
  sendText: (msg: string) => void

  constructor(data) {
    this.data = data
    
    this._eventsSystem = setupEventSystem(['message', 'gameStarted', 'rolesRevealed', 'phaseChange'])
    
    this.addEventListener = this._eventsSystem.external.addEventListener, 
    this.removeEventListener = this._eventsSystem.external.removeEventListener, 
    this.sendText = (msgText: string) => {
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
   * Get minimum number of players required to start the game
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {number} Minimum number of players
   */
  getMinimumPlayers(): number {
    return this.data.mnp
  }

  /**
   * Get maximum number of players that can join the room
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {number} Maximum number of players
   */
  getMaximumPlayers(): number {
    return this.data.mxp
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

  /**
   * Vote for player in second phase (daytime and nighttime)
   * @memberof module:mafiaonline.MafiaRoom
   */
  async voteForPlayer(userID: string) {
    this.super._sendData({ ty: 'vpl', uo: userID })
  }
}

export default MafiaRoom