import MafiaOnlineAPIConnection from './auth.js'
import MafiaUser from './constructors/user.js'
import { MafiaOnlineAPIError } from './utils.js'

class MafiaOnlineAPIAccount {
  _socketReady: boolean
  _authorized: boolean
  account: MafiaUser

  /**
   * Get authorized User
   * @returns Instance of User class
   */
  async getUser() {
    const user = await this._sendRequest({ ty: 'acd' }, 2)
    this.account = new MafiaUser(user[0]['uu'])
    return this.account
  }

  async setNickname(nickname) {
    if (!nickname.test(/^[a-zA-Zа-яА-Я0-9 ]+$/)) throw new MafiaOnlineAPIError('ERRNICKSETCHARS', 'Nickname must be [a-zA-Zа-яА-Я0-9 ]')

    const response = await this._sendRequest({
      ty: 'uns',
      u: nickname
    })
    switch(response['ty']) {
      case 'unws':
        throw new MafiaOnlineAPIError('ERRNICKSETAPI', 'Error while setting nickname: ' + JSON.stringify(response))

      case 'unex':
        throw new MafiaOnlineAPIError('ERRNICKEXISTS', 'Error while setting nickname: User with this nickname already exists')

      case 'uns':
        return true

      default:
        throw new MafiaOnlineAPIError('ERRNICKSET', 'Error while setting nickname: ' + JSON.stringify(response))
    }
  }
}

interface MafiaOnlineAPIAccount extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIAccount