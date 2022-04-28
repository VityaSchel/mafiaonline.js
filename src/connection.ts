import { MafiaOnlineAPICredentials } from './base.js'
import * as consts from './constants.js'
import * as net from 'net'
import { MafiaOnlineAPIError } from './utils.js'

export default class MafiaOnlineAPIConnection {
  _socketReady: boolean
  _authorized: boolean
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
    this._socketReady = true
    this._createListener()
  }

  _createListener() {
    const bufferChunks = []
    this._clientSocket.on('data', chunk => {
      this.log('Received chunk of data. Size:', chunk.length)

      bufferChunks.push(chunk)
      const lastChunk = chunk[chunk.length - 1] == 0
      if (lastChunk) {
        const bufferData = Buffer.concat(bufferChunks)
        let data = bufferData.toString('utf-8')
        for (let str of data.trim().split(/\u0000/)) {
          const resultStr = str.trim()//.slice(0, -1)
          if (resultStr.length > 0 && resultStr !== 'p') {
            this.data.push(resultStr)
            this.log('Received response from server:', resultStr)
          }
        }
      }
    })
  }

  _sendData(data: object = {}, skipAuthorizationCheck: boolean = false) {
    return new Promise<void>(async (resolve, reject) => {
      await new Promise<void>(resolve => 
        setInterval(() => 
          this._socketReady && 
          (skipAuthorizationCheck || this._authorized) &&
          resolve()
        , 10)
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
  
  _addListenerToQueue(segmentsCount: number = 1): Promise<Array<string>> {
    return new Promise(resolve => {
      this._listeners.push(resolve)
      this._listen(segmentsCount)
    })
  }

  async _listen(segmentsCount: number = 1, timeout: number|void = 15): Promise<Array<string>> {
    if(this._listeners.length !== 1) return

    let interval
    timeout && setTimeout(() => {
      clearInterval(interval)
      throw new MafiaOnlineAPIError('ERRTIMEOUT', 'Couldn\'t get a response from server within specified time. Adjust timeout argument to increase time or use _sendData method directly.')
    }, timeout * 1000)

    await new Promise<void>(resolve =>
      interval = setInterval(() => this.data.length >= segmentsCount && resolve(), 10)
    )

    const segments = new Array(segmentsCount).fill(null).map(() => this.data.shift())

    const listenerCallback = this._listeners.shift()

    listenerCallback(segments)
    if(this._listeners.length > 0) this._listen()
  }

  /**
   * Wrapper around _sendData() and _listen()
   * @param data Object with data to send to server. Must be JSON-serializable.
   */
  async _sendRequest(data: object = {}, segmentsCount: number = 1, skipAuthorizationCheck: boolean = false): Promise<object | Array<object>> {
    await this._sendData(data, skipAuthorizationCheck)
    const responseRawSegments = await this._addListenerToQueue(segmentsCount)
    let responseSegments = []
    for (let segment of responseRawSegments) {
      let response
      try {
        response = JSON.parse(segment)
      } catch(e) {
        console.error(response)
        console.log(e)
        throw new MafiaOnlineAPIError('ERRRESPSYNTAX', 'Couldn\'t parse JSON response from server in TCP socket.')
      }
      responseSegments.push(response)
    }
    return responseSegments.length === 1 ? responseSegments[0] : responseSegments
  }
}