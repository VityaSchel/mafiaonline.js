class MafiaUser {
  data: any
  date: string | number | Date

  constructor(data) {
    this.data = data
  }

  getID() {
    return this.data.o
  }
  
  getName() {
    return this.data.u
  }

  getExperience() {
    return this.data.ex
  }

  getLastOnlineDate() {
    return new Date(this.date)
  }

  getLevel() {
    return this.data.l
  }

  getReputation() {
    return this.data.a
  }

  getPlayedGames() {
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

  getLocale() {
    return this.data.slc
  }

  isMale() {
    return this.data.s === 0
  }

  isFemale() {
    return this.data.s === 1
  }

  getSex() {
    return this.data.s
  }
}

export default MafiaUser