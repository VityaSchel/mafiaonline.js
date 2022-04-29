import { MafiaOnlineAPICredentials, MafiaOnlineAPIClassDeclarations } from './base.js'
import MafiaOnlineAPIConnection from './connection.js'
import { MafiaOnlineAPIError, hashPassword } from './utils.js'
import * as consts from './constants'
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
      pw: hashPassword(password)
    }, 1, true)
    return this._signInResult(response)
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

          case -4:
            throw new MafiaOnlineAPIError('ERRLOGINTOKENINCORRECT', 'Couldn\'t sign in into the account: Token incorrect')

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

  /**
   * Verify user email
   * @returns Response from REST API
   */
  async verifyEmail(){
    return await this._fetchRest('user/email/verify', {
      lang: 'RUS'
    })
  }
}

interface MafiaOnlineAPIAuth extends MafiaOnlineAPIConnection {}

export default MafiaOnlineAPIAuth