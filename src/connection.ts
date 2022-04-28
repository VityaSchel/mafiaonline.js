import { MafiaOnlineAPIClassDeclarations, MafiaOnlineAPICredentials } from './base.js'
import * as consts from './constants.js'
import * as net from 'net'

export default class MafiaOnlineAPIChat implements MafiaOnlineAPIClassDeclarations {
  credentials: MafiaOnlineAPICredentials
  account: object
  token: string
  id: number
  deviceID: string
  data: string[]
  _clientSocket: net.Socket

  _createConnection() {
    this._clientSocket = net.connect({ host: consts.host, port: consts.ports.sockets })
    this._createListener()
  }

  _createListener() {
    const bufferChunks = []
    this._clientSocket.on('data', chunk => {
      bufferChunks.push(chunk)
      console.log(chunk[0])
    })
  }

    //создается отдельный поток (типа подпроцесса) для обработки данных с сокета
    // беск. цикл начинается
        // ввести переменную для инфы bufData (пустые байты)
        // беск. цикл начинается
            // получить из клиента сокета 2084 байта
            // если количество полученных байт !== -1 то
                // если байты[последний] === 0 (поток закончен)
                    // [начать обработку данных]
                // иначе
                    // bufData += полученные из сокета байты



    // начало обработки данных:
    // bufData += полученные из сокета байты
    // декодировать буффер и записать в переменную bufDataDecoded
    // for(let str of d.trim().split(/[\u0000]/))
        // str = str.trim().slice(0, -1)
        // если str !== "p" то
            // обработкаЗакончена(str)

  _send(data: object = {}) {
    data['t'] = this.token
    data['uo'] ??= this.id
  }
}