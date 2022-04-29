class MafiaUser {
  data: any
  date: string | number | Date

  constructor(data) {
    this.data = data
  }

  /**
   * Get in-game ID of user
   * @returns User ID
   */
  getID(): number {
    return this.data.o
  }
  
  /**
   * Get user nickname
   * @returns User nickname
   */
  getName(): string {
    return this.data.u
  }

  /**
   * Get user experience
   * @returns User experience
   */
  getExperience(): number {
    return this.data.ex
  }

  /**
   * Get user last date of online
   * @returns Date of online
   */
  getLastOnlineDate(): Date {
    return new Date(this.date)
  }

  /**
   * Get user level
   * @returns User level
   */
  getLevel(): number {
    return this.data.l
  }

  /**
   * Get user reputation
   * @returns User reputation
   */
  getReputation(): number {
    return this.data.a
  }

  /**
   * Get information about played games
   * @returns Object with stats
   */
  getPlayedGames(): object {
    return {
      overall: this.data.pg,
      won: {
        asMafia: this.data.wim,
        asPeaceful: this.data.wip
      },
      was: {
        mafia: this.data.wm,
        comissar: this.data.wc,
        doctor: this.data.wd,
        prostitute: this.data.wlv,
        terrorist: this.data.wt,
        journalist: this.data.wj,
        bodyguard: this.data.wbg,
        barman: this.data.wbr,
        spy: this.data.wsp,
        peaceful: this.data.wp
      }
    }
  }

  /**
   * Get language of user
   * @returns User locale
   */
  getLocale(): string {
    return this.data.slc
  }

  /**
   * Check if user sex is male
   * @returns True if user is male, false otherwise
   */
  isMale(): boolean {
    return this.data.s === 0
  }

  /**
   * Check if user sex is female
   * @returns True if user is female, false otherwise
   */
  isFemale(): boolean {
    return this.data.s === 1
  }

  /**
   * Get user sex
   * @returns 0 if user is male, 0 if user is female
   */
  getSex(): number {
    return this.data.s
  }
}

export default MafiaUser