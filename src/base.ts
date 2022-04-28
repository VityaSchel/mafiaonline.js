import { aggregation, MafiaOnlineAPIError } from './utils.js'
import MafiaOnlineAPIAuth from './auth.js'
import MafiaOnlineAPIChat from './chat.js'
import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIAccount from './account.js'
import MafiaUser from './constructors/user.js'
import * as net from 'net'

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
  _listeners: Array<Function>
  _clientSocket: net.Socket
  _socketReady: boolean
  _authorized: boolean
  logs: boolean
}

export class MafiaOnlineAPIBase implements MafiaOnlineAPIClassDeclarations {
  constructor(credentials: MafiaOnlineAPICredentials, verboseLogs: boolean = false) {
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

    this.logs = verboseLogs
    if(this.logs) console.log('To stop MafiaOnline.js from logging debug into console, pass false as second argument to constructor.')

    this.account = null
    this.token = null
    this.id = null
    this.deviceID = "0"
    this.data = []
    this._listeners = []

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
  _listeners: Function[]
  credentials: MafiaOnlineAPICredentials
  account: MafiaUser
  token: string
  id: number
  deviceID: string
  data: string[]

  log(...messages) {
    if(this.logs) console.log((new Date()).toISOString(), 'Mafiaonline.js:', ...messages)
  }
}

export interface MafiaOnlineAPIBase extends 
  MafiaOnlineAPIAuth,
  MafiaOnlineAPIChat,
  MafiaOnlineAPIConnection,
  MafiaOnlineAPIAccount
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
  MafiaOnlineAPIAccount
])

export default MafiaOnlineAPIBase