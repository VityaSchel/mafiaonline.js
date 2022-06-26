import { hashPassword } from '../utils.js'

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

  constructor(data) {
    this.data = data
  }

  /**
   * Get ID of room
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {number} ID of room
   */
  getID(): number {
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

  /**
   * Enters the room
   * @memberof module:mafiaonline.MafiaRoom
   */
  join(password?: string) {
    this._join(this, hashPassword(password))
  }

  /**
   * Leaves the room
   * @memberof module:mafiaonline.MafiaRoom
   */
  leave() {
    this._leave(this)
  }
}

export default MafiaRoom