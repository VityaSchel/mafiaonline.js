import MafiaOnlineAPIBase from './base'
import MafiaOnlineAPIAuth from './auth'
import { aggregation } from './utils.js'

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
  MafiaOnlineAPIAuth
) { }