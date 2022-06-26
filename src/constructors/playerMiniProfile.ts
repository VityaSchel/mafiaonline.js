/**
 * @class PlayerMiniProfile
 * @classdesc Player's mini profile. Used in room.getPlayers()
 * @memberof module:mafiaonline
 */
class PlayerMiniProfile {
  data: object

  constructor(data: object) {
    this.data = data
  }

  /**
   * Get in-game ID of user
   * @memberof module:mafiaonline.PlayerMiniProfile
   * @returns {number} User ID
   */
  getID(): number {
    return this.data['o']
  }

  /**
   * Get user nickname
   * @memberof module:mafiaonline.PlayerMiniProfile
   * @returns {string} User nickname
   */
  getName(): string {
    return this.data['u']
  }

  /**
   * Returns true if player is alive in the game
   * @memberof module:mafiaonline.PlayerMiniProfile
   * @returns {boolean} Is player alive
   */
  isAlive(): string {
    return this.data['u']
  }

  /**
   * Check if user sex is male
   * @memberof module:mafiaonline.PlayerMiniProfile
   * @returns {boolean} True if user is male, false otherwise
   */
  isMale(): boolean {
    return this.data['s'] === 0
  }

  /**
   * Check if user sex is female
   * @memberof module:mafiaonline.PlayerMiniProfile
   * @returns {boolean} True if user is female, false otherwise
   */
  isFemale(): boolean {
    return this.data['s'] === 1
  }

  /**
   * Get user sex
   * @memberof module:mafiaonline.PlayerMiniProfile
   * @returns {number} 0 if user is male, 0 if user is female
   */
  getSex(): number {
    return this.data['s']
  }
}

export default PlayerMiniProfile