import { MafiaOnlineAPICredentials } from './base.js'
import MafiaUser from './constructors/user.js'
import fetch from 'node-fetch'
import * as consts from './constants.js'
import * as net from 'net'
import { MafiaOnlineAPIError, banHandler } from './utils.js'

export default class MafiaOnlineAPIConnection {
  _socketReady: boolean
  _authorized: boolean
  _listeners: { codes: string[], callback: (response: object) => void }[]
  credentials: MafiaOnlineAPICredentials
  account: MafiaUser
  token: string
  id: number
  deviceID: string
  data: string[]
  _clientSocket: net.Socket
  log: Function
  logs: boolean
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

  /**
   * Creates default listener that should be used until program exits.
   * Only called once while connecting.
   */
  _createListener() {
    this._defaultSocketResponseListener = this._processRequestResponse(resultStr => {
      this.data.push(resultStr)
      this._dataReceived()
      this.log('Received response from server:', resultStr)
    })
    this._clientSocket.addListener('data', this._defaultSocketResponseListener)
  }

  /**
   * Parses TCP chunks into strings
   */
  _processRequestResponse(callback: (result: string) => void) {
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
              if (response['ty'] === 'err') this.logs && console.error('Unexpected error received from server', response)
            } catch(e) {/**/}
            if (isBanned) banHandler(JSON.parse(resultStr))

            callback(resultStr)
          }
        }
      }
    }
  }

  /**
   * Send data directly to server without expecting answer to it
   * @param {object} [data] JSON-serializable data to send
   * @param {boolean} [skipAuthorizationCheck] Pass true to skip awaiting authorization
   */
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
  
  _addListenerToQueue(reactToCodes: string|string[], segmentsCount = 1): Promise<Array<object>> {
    return new Promise(resolve => {
      if (typeof reactToCodes === 'string') reactToCodes = [reactToCodes]

      const responses = []
      for (let i = 0; i < segmentsCount; i++) {
        const callback = (response: object) => {
          responses.push(response)
          if(i === segmentsCount - 1) resolve(responses)
        }
        this._listeners.push({ codes: reactToCodes, callback })
      }
    })
  }

  /**
   * Called by _defaultSocketResponseListener when new string gets pushed into this.data
   * Finds listener that requested data among this._listeners and passes data into callback
   * If listener not found, ignores it because it may be some global message like chat or rooms monitoring
   */
  async _dataReceived() {
    let response: object | null = null
    try {
      response = JSON.parse(this.data.pop())
    } catch(e) {
      response = null
    }

    if (response === null) {
      // Couldn't find what's the code, so ignore it
      return
    }

    const code: string = response['ty']
    const listenerIndex = this._listeners.findIndex(listener => listener.codes.includes(code))
    if (listenerIndex === -1) {
      // Couldn't find who's been asking for this response, so ignore it
      return
    }
    const listener = this._listeners[listenerIndex]
    this._listeners.splice(listenerIndex, 1)
    listener.callback(response)
  }

  // /**
  //  * Call to wait for data from server in TCP socket.
  //  * @param segmentsCount 
  //  * @param timeout 
  //  * @returns 
  //  */
  // async _listen(segmentsCount = 1, timeout: number|void = 15): Promise<Array<string>> {
  //   if(this._listeners.length !== 1) return

  //   let interval, timeoutInterval
  //   if(timeout) timeoutInterval = setTimeout(() => {
  //     clearInterval(interval)
  //     throw new MafiaOnlineAPIError('ERRTIMEOUT', 
  //       'Couldn\'t get a response from server within specified time. Adjust timeout argument to increase time or use _sendData method directly.')
  //   }, timeout * 1000)

  //   await new Promise<void>(resolve =>
  //     interval = setInterval(() => this.data.length >= segmentsCount && resolve(), 10)
  //   )

  //   clearInterval(interval)
  //   clearInterval(timeoutInterval)

  //   const segments = new Array(segmentsCount).fill(null).map(() => this.data.shift())

  //   const listenerCallback = this._listeners.shift()

  //   listenerCallback(segments)
  //   if(this._listeners.length > 0) this._listen()
  // }

  /**
   * Wrapper around _sendData() and _listen()
   * @param data Object with data to send to server. Must be JSON-serializable.
   * @param {string|string[]} reactToCodes List of short-codes that server may return in response
   * @param {number} segmentsCount Number of segments that should be received from server
   * @param {boolean} skipAuthorizationCheck Skip awaiting for authorization
   */
  async _sendRequest(data: object = {}, reactToCodes: string | string[], segmentsCount = 1, skipAuthorizationCheck = false): Promise<object | Array<object>> {
    await this._sendData(data, skipAuthorizationCheck)
    const response = await this._addListenerToQueue(reactToCodes, segmentsCount)
    // const responseSegments = []
    // for (const segment of responseRawSegments) {
    //   // let response
    //   // try {
    //   //   response = JSON.parse(segment)
    //   // } catch(e) {
    //   //   console.error(response)
    //   //   console.log(e)
    //   //   throw new MafiaOnlineAPIError('ERRRESPSYNTAX', 'Couldn\'t parse JSON response from server in TCP socket.')
    //   // }
    //   responseSegments.push(segment)
    // }
    return response.length === 1 ? response[0] : response
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