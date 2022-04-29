import { MafiaOnlineAPICredentials, MafiaOnlineAPIClassDeclarations } from './base.js'
import MafiaOnlineAPIConnection from './connection.js'
import { MafiaOnlineAPIError } from './utils.js'
import md5 from 'md5'
import MafiaUser from './constructors/user.js'

class MafiaOnlineAPIAuth {
  token: string
  id: number
  credentials: MafiaOnlineAPICredentials
  deviceID: string
  _authorized: boolean

  /**
   * Sign in into account using email and password
   * @param email Email of the account
   * @param password Password of the account
   * @returns User account as an object
   */
  async _signInWithEmail(email: string, password: string) {
    const response = await this._sendRequest({
      d: this.deviceID,
      ty: 'sin',
      e: email,
      pw: this._hashPassword(password)
    }, 1, true)
    return this._signInResult(response)
  }

  _hashPassword(password: string): string {
    for (let i = 0; i < 5; i++)
      password = md5(password + 'azxsw')
    return password
  }

  /**
   * Sign in into account using token
   * @param token Session token
   * @returns User account as an object
   */
  async _signInWithToken(token: string, userID: string) {
    const response = await this._sendRequest({
      d: this.deviceID,
      ty: 'sin',
      e: '', pw: '',
      t: token,
      o: userID
    }, 1, true)
    return this._signInResult(response)
  }

  async _signInResult(response: object) {
    switch (response['ty']) {
      case 'siner':
        switch (response['e']) {
          case -1:
            throw new MafiaOnlineAPIError('ERRLOGINUSERNOTFOUND', 'Couldn\'t sign in into the account: User not found')

          case -3:
            throw new MafiaOnlineAPIError('ERRLOGINPASSWORDINCORRECT', 'Couldn\'t sign in into the account: Password incorrect')

          default:
            throw new MafiaOnlineAPIError('ERRLOGIN', 'Couldn\'t sign in into the account')
        }

      case 'usi':
        this.account = new MafiaUser(response['uu'])
        this.token = response['uu']['t']
        this.id = response['uu']['o']
        this._authorized = true
        return this.account

      default:
        throw new MafiaOnlineAPIError('ERRLOGINUNKNOWN', 'Couldn\'t complete sign in process. Expected "usi" or "siner", got "' + response['ty'] + '"')
    }
  }

  /**
   * Sign out from account and delete session
   * @returns Response from REST API
   */
  async signOut() {
    return await this._fetchRest('user/sign_out', {})
  }

  static async signUp(nickname: string, email: string, password: string, language: string = 'RUS') {
    this._fetchRest('user/sign_up', {
      email: email,
      username: nickname,
      password: this._hashPassword(password),
      deviceId: this.deviceID,
      lang: language
    }, false)
  }
}

interface MafiaOnlineAPIAuth extends MafiaOnlineAPIConnection {}

export default MafiaOnlineAPIAuth