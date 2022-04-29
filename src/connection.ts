import { MafiaOnlineAPICredentials } from './base.js'
import MafiaUser from './constructors/user.js'
import fetch from 'node-fetch'
import * as consts from './constants.js'
import * as net from 'net'
import { MafiaOnlineAPIError, banHandler } from './utils.js'

export default class MafiaOnlineAPIConnection {
  _socketReady: boolean
  _authorized: boolean
  _listeners: Function[]
  credentials: MafiaOnlineAPICredentials
  account: MafiaUser
  token: string
  id: number
  deviceID: string
  data: string[]
  _clientSocket: net.Socket
  log: Function
  _defaultSocketResponseListener: (...args: any[]) => void

  async _createConnection() {
    this._clientSocket = net.connect({ host: consts.host, port: consts.ports.sockets })
    this.log('Connecting to the TCP socket...')
    this._clientSocket.on('end', () => {
      if (!this._clientSocket['__closedGracefully'])
        throw new MafiaOnlineAPIError('ERRDISCONNECT', 'Socket disconnected')
    })
    await new Promise(resolve => this._clientSocket.on('connect', resolve))
    this.log('Connected to the TCP socket')
    this._socketReady = true
    this._createListener()
  }

  _createListener() {
    this._defaultSocketResponseListener = this._processRequestResponse(resultStr => {
      this.data.push(resultStr)
      this.log('Received response from server:', resultStr)
    })
    this._clientSocket.addListener('data', this._defaultSocketResponseListener)
  }

  _processRequestResponse(callback) {
    let container = []
    return chunk => {
      container.push(chunk)
      const lastChunk = chunk[chunk.length - 1] == 0
      if (lastChunk) {
        const bufferData = Buffer.concat(container)
        const data = bufferData.toString('utf-8')
        container = []
        for (let str of data.trim().split(/\u0000/)) {
          const resultStr = str.trim()//.slice(0, -1)
          if (resultStr.length > 0 && resultStr !== 'p') {
            let isBanned
            try {
              const response = JSON.parse(resultStr)
              if (response['ty'] === 'ublk') isBanned = true
            } catch(e) {/**/}
            if (isBanned) banHandler(JSON.parse(resultStr))

            callback(resultStr)
          }
        }
      }
    }
  }

  _sendData(data: object = {}, skipAuthorizationCheck = false) {
    return new Promise<void>(async (resolve, reject) => {
      await this._waitForReadyState(skipAuthorizationCheck)
      data['t'] = this.token
      data['uo'] ??= this.id
      this.log('Sent to server:', data)
      this._clientSocket.write(
        Buffer.from(JSON.stringify(data)+'\n'),
        err => err ? reject(err) : resolve()
      )
    })
  }
  
  _addListenerToQueue(segmentsCount = 1): Promise<Array<string>> {
    return new Promise(resolve => {
      this._listeners.push(resolve)
      this._listen(segmentsCount)
    })
  }

  async _listen(segmentsCount = 1, timeout: number|void = 15): Promise<Array<string>> {
    if(this._listeners.length !== 1) return

    let interval, timeoutInterval
    if(timeout) timeoutInterval = setTimeout(() => {
      clearInterval(interval)
      throw new MafiaOnlineAPIError('ERRTIMEOUT', 
        'Couldn\'t get a response from server within specified time. Adjust timeout argument to increase time or use _sendData method directly.')
    }, timeout * 1000)

    await new Promise<void>(resolve =>
      interval = setInterval(() => this.data.length >= segmentsCount && resolve(), 10)
    )

    clearInterval(interval)
    clearInterval(timeoutInterval)

    const segments = new Array(segmentsCount).fill(null).map(() => this.data.shift())

    const listenerCallback = this._listeners.shift()

    listenerCallback(segments)
    if(this._listeners.length > 0) this._listen()
  }

  /**
   * Wrapper around _sendData() and _listen()
   * @param data Object with data to send to server. Must be JSON-serializable.
   * @param {number} segmentsCount Number of segments that should be received from server
   * @param {boolean} skipAuthorizationCheck Skip awaiting for authorization
   */
  async _sendRequest(data: object = {}, segmentsCount = 1, skipAuthorizationCheck = false): Promise<object | Array<object>> {
    await this._sendData(data, skipAuthorizationCheck)
    const responseRawSegments = await this._addListenerToQueue(segmentsCount)
    const responseSegments = []
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

  _encodeAuthHeader() {
    return Buffer.from(`${this.id}=:=${this.token}`).toString('base64')
  }

  async _fetchRest(endpoint: string, body: object, authorizatonHeader = true): Promise<object> {
    await this._waitForReadyState(!authorizatonHeader)
    const response = await fetch(`http://${consts.host}:${consts.ports.restAPI}/${endpoint}`, {
      method: 'POST',
      body: new URLSearchParams(<URLSearchParams>body),
      ...(authorizatonHeader && ({ 
        headers: {
          Authorization: this._encodeAuthHeader()
        }
      }))
    })
    const parsedResponse = await response.json()
    return <object>parsedResponse
  }

  async _waitForReadyState(skipAuthorization = false) {
    let interval
    await new Promise<void>(resolve =>
      interval = setInterval(() =>
        this._socketReady &&
        (skipAuthorization || this._authorized) &&
        resolve()
      , 10)
    )
    clearInterval(interval)
  }
}