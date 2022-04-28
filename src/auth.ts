export default class MafiaOnlineAPIAuth {
  token: string
  id: number

  encodeAuthHeader() {
    return Buffer.from(`${this.id}=:=${this.token}`).toString('base64')
  }
}