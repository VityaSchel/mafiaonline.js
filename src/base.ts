import { aggregation } from './utils.js'
import nodefetch, { Headers } from 'node-fetch'
import MafiaOnlineAPIAuth from './auth.js'
import MafiaOnlineAPIChat from './chat.js'
import MafiaOnlineAPIConnection from './connection.js'

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
}

export class MafiaOnlineAPIBase implements MafiaOnlineAPIClassDeclarations {
  constructor(credentials: MafiaOnlineAPICredentials) {
    this.credentials = credentials

    this.account = null
    this.token = null
    this.id = null
    this.deviceID = null
    this.data = []

    this._createConnection()
  }

  credentials: MafiaOnlineAPICredentials
  account: object
  token: string
  id: number
  deviceID: string
  data: string[]

  // fetch(url, options = {}) {

  // }
}


export interface MafiaOnlineAPIBase extends 
  MafiaOnlineAPIAuth, 
  MafiaOnlineAPIChat,
  MafiaOnlineAPIConnection
{ }

// function applyMixins(derivedCtor: any, constructors: any[]) {
//   constructors.forEach((baseCtor) => {
//     Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//       Object.defineProperty(
//         derivedCtor.prototype,
//         name,
//         Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
//         Object.create(null)
//       )
//     })
//   })
// }

// applyMixins(MafiaOnlineAPIBase, [
//   MafiaOnlineAPIAuth
// ])

// export default MafiaOnlineAPIBase

export default class MafiaOnlineAPI extends aggregation(
  MafiaOnlineAPIBase,
  MafiaOnlineAPIAuth,
  MafiaOnlineAPIChat,
  MafiaOnlineAPIConnection
) { }