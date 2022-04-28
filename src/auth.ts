import { MafiaOnlineAPICredentials, MafiaOnlineAPIClassDeclarations } from './base.js'
import MafiaOnlineAPIConnection from './connection.js'
import { MafiaOnlineAPIError } from './utils.js'
import md5 from 'md5'

class MafiaOnlineAPIAuth {
  token: string
  id: number
  credentials: MafiaOnlineAPICredentials
  deviceID: string

  _encodeAuthHeader() {
    return Buffer.from(`${this.id}=:=${this.token}`).toString('base64')
  }

  /**
   * Sign in into account
   * @param email Email of the account
   * @param password Password of the account
   * @returns User account as an object
   */
  async signIn(email, password) {
    const response = await this._sendRequest({
      d: this.deviceID,
      ty: 'sin',
      e: this.credentials.email,
      pw: this.hashPassword(this.credentials.password)
    })
    if(response['ty'] === 'siner') {
      switch(response['e']){
        case -1:
          throw new MafiaOnlineAPIError('ERRLOGINUSERNOTFOUND', 'Couldn\'t sign in into the account: User not found')

        case -3:
          throw new MafiaOnlineAPIError('ERRLOGINPASSWORDINCORRECT', 'Couldn\'t sign in into the account: Password incorrect')
          
        default:
          throw new MafiaOnlineAPIError('ERRLOGIN', 'Couldn\'t sign in into the account')
      }
    }
  }

  hashPassword(password: string): string {
    for(let i = 0; i < 5; i++)
      password = md5(password + 'azxsw')
    return password
  }
}

interface MafiaOnlineAPIAuth extends MafiaOnlineAPIConnection {}

export default MafiaOnlineAPIAuth