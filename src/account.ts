import MafiaUser from './constructors/user.js'

class MafiaOnlineAPIAccount {
  _socketReady: boolean
  _authorized: boolean
  account: MafiaUser

  async getUser() {
    await new Promise<void>(resolve => 
      setInterval(() => 
        this._socketReady && 
        this._authorized &&
        resolve()
      , 10)
    )
    
    return this.account
  }
}

// interface MafiaOnlineAPIAccount extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIAccount