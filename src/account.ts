import MafiaOnlineAPIConnection from './auth.js'
import MafiaUser from './constructors/user.js'

class MafiaOnlineAPIAccount {
  _socketReady: boolean
  _authorized: boolean
  account: MafiaUser

  async getUser() {
    const user = await this._sendRequest({ ty: 'acd' }, 2)
    this.account = new MafiaUser(user[0]['uu'])
    return this.account
  }
}

interface MafiaOnlineAPIAccount extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIAccount