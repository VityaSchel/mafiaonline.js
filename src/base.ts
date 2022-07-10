import { MafiaOnlineAPIError } from './utils.js'
import MafiaOnlineAPIAuth from './auth.js'
import MafiaOnlineAPIChat from './chat.js'
import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIAccount from './account.js'
import MafiaOnlineAPIRooms from './rooms.js'
import MafiaUser from './constructors/user.js'
import * as net from 'net'
import { nanoid } from 'nanoid'

export interface MafiaOnlineAPICredentials {
  email?: string;
  password?: string;
  token?: string;
  userID?: string;
}

export interface MafiaOnlineAPIClassDeclarations {
  credentials: MafiaOnlineAPICredentials
  account: MafiaUser
  token: string
  id: number
  deviceID: string
  data: Array<string>
  _listeners: { codes: string[], callback: (response: object) => void }[]
  _clientSocket: net.Socket
  _socketReady: boolean
  _authorized: boolean
  logs: boolean
  _closed: boolean
  joinedChat: {
    type: 'global' | 'room' | null
  }
}

export class MafiaOnlineAPIBase implements MafiaOnlineAPIClassDeclarations {
  constructor(credentials: MafiaOnlineAPICredentials, verboseLogs: boolean | string[] = false) {
    let tokenCredentials
    if (credentials.token && credentials.userID){
      tokenCredentials = true
      this.credentials = { token: credentials.token, userID: credentials.userID }
    } else if(credentials.email && credentials.password) {
      tokenCredentials = false
      this.credentials = { email: credentials.email, password: credentials.password }
    } else {
      throw new MafiaOnlineAPIError('ERRCOSTRUCTOR', 'Error while initializing class: credentials must be one of { token: string, userID: string } or { email: string, password: string }')
    }

    this.log = (...messages) => {
      if (!this.logs || verboseLogs === false) return
      if (verboseLogs === true) console.log((new Date()).toISOString(), 'Mafiaonline.js:', ...messages)
      else verboseLogs.push(`${new Date().toISOString()} Mafiaonline.js: ${messages.join(' ')})`)
    }

    this.logs = verboseLogs === false || Array.isArray(verboseLogs)
    if(this.logs) this.log('To stop MafiaOnline.js from logging debug into console, pass false as second argument to constructor.')

    this.account = null
    this.token = null
    this.id = null
    this.deviceID = nanoid(12)
    this.data = []
    this._listeners = []
    this.joinedChat = {
      type: null
    }

    this._createConnection()
      .then(() => {
        if(tokenCredentials) {
          this._signInWithToken(
            this.credentials.token,
            this.credentials.userID
          )
        } else {
          this._signInWithEmail(
            this.credentials.email,
            this.credentials.password
          )
        }
      })
  }

  logs: boolean
  _clientSocket: net.Socket
  _socketReady: boolean
  _authorized: boolean
  _listeners: { codes: string[], callback: (response: object) => void }[]
  credentials: MafiaOnlineAPICredentials
  account: MafiaUser
  token: string
  id: number
  deviceID: string
  data: string[]
  _closed: boolean

  /**
   * Closes current socket and cleans up all stuff. Does not delete session, use signOut() before close()!
   * @memberof module:mafiaonline
   * @returns {Promise}
   */
  async close(): Promise<void> {
    return new Promise<void>(async resolve => {
      if(!this._socketReady) {
        await this._waitForReadyState(true)
      }

      this._clientSocket['__closedGracefully'] = true
      this._clientSocket.end(resolve)
    })
  }
}

export interface MafiaOnlineAPIBase extends 
  MafiaOnlineAPIAuth,
  MafiaOnlineAPIChat,
  MafiaOnlineAPIConnection,
  MafiaOnlineAPIAccount,
  MafiaOnlineAPIRooms
{ }

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
        Object.create(null)
      )
    })
  })
}

applyMixins(MafiaOnlineAPIBase, [
  MafiaOnlineAPIAuth,
  MafiaOnlineAPIChat,
  MafiaOnlineAPIConnection,
  MafiaOnlineAPIAccount,
  MafiaOnlineAPIRooms
])

/**
 * Mafia Online API
 * @module mafiaonline
 * @typicalname MafiaOnlineAPI
 */
export default MafiaOnlineAPIBase