/**
 * @class MafiaUser
 * @classdesc User of Mafia Online
 * @memberof module:mafiaonline
 */
class MafiaUser {
  data: object
  date: string | number | Date

  constructor(data) {
    this.data = data
  }

  /**
   * Get in-game ID of user
   * @memberof module:mafiaonline.MafiaUser
   * @returns {number} User ID
   */
  getID(): number {
    return this.data['o']
  }
  
  /**
   * Get user nickname
   * @memberof module:mafiaonline.MafiaUser
   * @returns {string} User nickname
   */
  getName(): string {
    return this.data['u']
  }

  /**
   * Get user experience
   * @memberof module:mafiaonline.MafiaUser
   * @returns {number} User experience
   */
  getExperience(): number {
    return this.data['ex']
  }

  /**
   * Get user last date of online
   * @memberof module:mafiaonline.MafiaUser
   * @returns {Date} Date of online
   */
  getLastOnlineDate(): Date {
    return new Date(this.date)
  }

  /**
   * Get user level
   * @memberof module:mafiaonline.MafiaUser
   * @returns {number} User level
   */
  getLevel(): number {
    return this.data['l']
  }

  /**
   * Get user reputation
   * @memberof module:mafiaonline.MafiaUser
   * @returns {number} User reputation
   */
  getReputation(): number {
    return this.data['a']
  }

  /**
   * Get information about played games
   * @memberof module:mafiaonline.MafiaUser
   * @returns {object} Object with stats
   */
  getPlayedGames(): object {
    return {
      overall: this.data['p']['g'],
      won: {
        asMafia: this.data['w']['im'],
        asPeaceful: this.data['w']['ip']
      },
      was: {
        mafia: this.data['w']['m'],
        comissar: this.data['w']['c'],
        doctor: this.data['w']['d'],
        prostitute: this.data['w']['lv'],
        terrorist: this.data['w']['t'],
        journalist: this.data['w']['j'],
        bodyguard: this.data['w']['bg'],
        barman: this.data['w']['br'],
        spy: this.data['w']['sp'],
        peaceful: this.data['w']['p']
      }
    }
  }

  /**
   * Get language of user
   * @memberof module:mafiaonline.MafiaUser
   * @returns {string} User locale
   */
  getLocale(): string {
    return this.data['slc']
  }

  /**
   * Check if user sex is male
   * @memberof module:mafiaonline.MafiaUser
   * @returns {boolean} True if user is male, false otherwise
   */
  isMale(): boolean {
    return this.data['s'] === 0
  }

  /**
   * Check if user sex is female
   * @memberof module:mafiaonline.MafiaUser
   * @returns {boolean} True if user is female, false otherwise
   */
  isFemale(): boolean {
    return this.data['s'] === 1
  }

  /**
   * Get user sex
   * @memberof module:mafiaonline.MafiaUser
   * @returns {number} 0 if user is male, 0 if user is female
   */
  getSex(): number {
    return this.data['s']
  }
}

export default MafiaUser