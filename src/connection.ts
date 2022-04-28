import { MafiaOnlineAPICredentials } from './base.js'
import * as consts from './constants.js'
import * as net from 'net'
import { MafiaOnlineAPIError } from './utils.js'

export default class MafiaOnlineAPIChat {
  _ready: boolean
  _listeners: Function[]
  credentials: MafiaOnlineAPICredentials
  account: object
  token: string
  id: number
  deviceID: string
  data: string[]
  _clientSocket: net.Socket
  log: Function

  async _createConnection() {
    this._clientSocket = net.connect({ host: consts.host, port: consts.ports.sockets })
    this.log('Connecting to the TCP socket...')
    this._clientSocket.on('end', () => { throw new MafiaOnlineAPIError('ERRDISCONNECT', 'Socket disconnected') })
    await new Promise(resolve => this._clientSocket.on('connect', resolve))
    this.log('Connected to the TCP socket')
    this._ready = true
    this._createListener()
  }

  _createListener() {
    const bufferChunks = []
    this._clientSocket.on('data', chunk => {
      this.log('Received chunk of data. Size:', chunk.length)

      bufferChunks.push(chunk)

      //this.log('Received response from server:', response)
      // console.log(chunk[0])
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

  _sendData(data: object = {}) {
    return new Promise<void>(async (resolve, reject) => {
      await new Promise<void>(resolve => 
        setInterval(() => this._ready && resolve(), 10)
      )
      this.log('Sent to server:', data)
      data['t'] = this.token
      data['uo'] ??= this.id
      this._clientSocket.write(
        Buffer.from(JSON.stringify(data)+'\n'),
        err => err ? reject(err) : resolve()
      )
    })
  }
  
  _addListenerToQueue(): Promise<string> {
    return new Promise(resolve => {
      this._listeners.push(resolve)
      this._listen()
    })
  }

  async _listen(timeout: number|void = 15) {
    if(this._listeners.length !== 1) return

    let interval
    timeout && setTimeout(() => {
      clearInterval(interval)
      throw new MafiaOnlineAPIError('ERRTIMEOUT', 'Couldn\'t get a response from server within specified time. Adjust timeout argument to increase time or use _sendData method directly.')
    }, timeout * 1000)

    await new Promise(resolve =>
      interval = setInterval(() => this.data.length !== 0 && resolve, 10)
    )

    const response = this.data.shift()
    const listenerCallback = this._listeners.shift()

    listenerCallback(response)
    if(this._listeners.length > 0) this._listen()
  }

  /**
   * Wrapper around _sendData() and _listen()
   * @param data Object with data to send to server. Must be JSON-serializable.
   */
  async _sendRequest(data: object = {}): Promise<object> {
    await this._sendData(data)
    const responseRaw = await this._addListenerToQueue()
    let response
    try {
      response = JSON.parse(responseRaw)
    } catch(e) {
      console.error(responseRaw)
      throw new MafiaOnlineAPIError('ERRRESPSYNTAX', 'Couldn\'t parse JSON response from server in TCP socket.')
    }
    return response
  }
}