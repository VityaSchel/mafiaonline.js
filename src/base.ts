import { aggregation } from './utils.js'
import MafiaOnlineAPIAuth from './auth.js'
import MafiaOnlineAPIChat from './chat.js'
import MafiaOnlineAPIConnection from './connection.js'
import * as net from 'net'

export interface MafiaOnlineAPICredentials {
  email: string;
  password: string;
}

export interface MafiaOnlineAPIClassDeclarations {
  credentials: MafiaOnlineAPICredentials
  account: object
  token: string
  id: number
  deviceID: string
  data: Array<string>
  _listeners: Array<Function>
  _clientSocket: net.Socket
  _ready: boolean
  logs: boolean
}

export class MafiaOnlineAPIBase implements MafiaOnlineAPIClassDeclarations {
  constructor(credentials: MafiaOnlineAPICredentials, verboseLogs: boolean = false) {
    this.credentials = credentials
    this.logs = verboseLogs
    if(this.logs) console.log('To stop MafiaOnline.js from logging debug into console, pass false as second argument to constructor.')

    this.account = null
    this.token = null
    this.id = null
    this.deviceID = null
    this.data = []
    this._listeners = []

    this._createConnection()
  }

  logs: boolean
  _clientSocket: net.Socket
  _ready: boolean
  _listeners: Function[]
  credentials: MafiaOnlineAPICredentials
  account: object
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
  MafiaOnlineAPIConnection 
{ }

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
        Object.create(null)
      );
    });
  });
}

applyMixins(MafiaOnlineAPIBase, [
  MafiaOnlineAPIBase,
  MafiaOnlineAPIAuth,
  MafiaOnlineAPIChat,
  MafiaOnlineAPIConnection
])

export default MafiaOnlineAPIBase