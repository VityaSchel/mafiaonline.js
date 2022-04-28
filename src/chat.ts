import { MafiaOnlineAPIClassDeclarations, MafiaOnlineAPICredentials } from './base'

export default class MafiaOnlineAPIChat implements MafiaOnlineAPIClassDeclarations {
  credentials: MafiaOnlineAPICredentials
  account: object
  token: string
  id: number
  deviceID: string
  data: string[]

  test() {
    return this.id
  }
}