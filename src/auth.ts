import { MafiaOnlineAPIClassDeclarations, MafiaOnlineAPICredentials } from './index'

export default class MafiaOnlineAPIAuth implements MafiaOnlineAPIClassDeclarations {
  credentials: MafiaOnlineAPICredentials
  account: object
  token: string
  id: number
  deviceID: string
  data: string[]

  encodeAuthHeader() {
    return Buffer.from(`${this.id}=:=${this.token}`).toString('base64')
  }
}