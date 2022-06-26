import MafiaOnlineAPIConnection from './auth.js'
import MafiaUser from './constructors/user.js'
import { MafiaOnlineAPIError } from './utils.js'

class MafiaOnlineAPIAccount {
  _socketReady: boolean
  _authorized: boolean
  account: MafiaUser

  /**
   * Get authorized User
   * @memberof module:mafiaonline
   * @memberof module:mafiaonline
   * @returns {Promise<MafiaUser>} Instance of User class
   */
  async getUser(): Promise<MafiaUser> {
    const user = await this._sendRequest({ ty: 'acd' })
    this.account = new MafiaUser(user[0]['uu'])
    return this.account
  }

  /**
   * Set nickname of authorized user
   * @param {string} nickname New nickname of user
   * @memberof module:mafiaonline
   * @returns {Promise<boolean>} True if nickname set successfully
   */
  async setNickname(nickname: string): Promise<boolean> {
    if (!/^[a-zA-Zа-яА-Я0-9 ]+$/.test(nickname)) throw new MafiaOnlineAPIError('ERRNICKSETCHARS', 'Nickname must be [a-zA-Zа-яА-Я0-9 ]')

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

  /**
   * Set server language. Mustn't change frequently (once in 6 hours)
   * @param {string} locale One of 'ru', 'en'
   * @memberof module:mafiaonline
   * @returns {object} Response from server, like this: {"ty":"slc","slc":"ru"}
   */
  async setLocale(locale: 'ru' | 'en') {
    if(!['ru', 'en'].includes(locale)) throw new MafiaOnlineAPIError('ERRLOCALEINCORRECT', 'Locale must be one of \'ru\', \'en\'')
    return await this._sendRequest({
      type: 'usls',
      slc: locale
    })
  }
}

interface MafiaOnlineAPIAccount extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIAccount