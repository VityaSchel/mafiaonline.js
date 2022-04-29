/**
 * @class MafiaRoom
 * @classdesc Room of Mafia Online
 * @memberof module:mafiaonline
 */
class MafiaRoom {
  data: any

  constructor(data) {
    this.data = data
  }

  /**
   * Get ID of room
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {number} ID of room
   */
  getID() {
    return this.data.o
  }

  /**
   * Get room name
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {string} Name of room
   */
  getName() {
    return this.data.tt
  }

  /**
   * Get minimum level required to join the room
   * @memberof module:mafiaonline.MafiaRoom
   * @returns {number} Minimum level for room
   */
  getMinimumLevel() {
    return this.data.mnl
  }
}

export default MafiaRoom