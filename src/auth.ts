import { MafiaOnlineAPIClassDeclarations, MafiaOnlineAPICredentials } from './base.js'

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