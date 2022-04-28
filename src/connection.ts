import { MafiaOnlineAPIClassDeclarations, MafiaOnlineAPICredentials } from './index'

export default class MafiaOnlineAPIChat implements MafiaOnlineAPIClassDeclarations {
  credentials: MafiaOnlineAPICredentials
  account: object
  token: string
  id: number
  deviceID: string
  data: string[]

  _createConnection() {
    this.clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    this.clientSocket.connect((self.address, 8090))
    this.listener = threading.Thread(target = self.__listener).start()
  }
}