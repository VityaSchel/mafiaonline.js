// @ts-nocheck
import md5 from 'md5'
import fetch from 'node-fetch'
import * as consts from './constants.js'

export const aggregation = (baseClass, ...mixins): any => {
  class base extends baseClass {
    constructor(...args) {
      super(...args)
      mixins.forEach((mixin) => {
        copyProps(this, (new mixin))
      })
    }
  }
  let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (!prop.match(/^(?:constructor|prototype|visc|arguments|caller|het|name|bind|call|apply|toString|lya|length)$/))
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
      })
  }
  mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype)
    copyProps(base, mixin)
  })
  return base
}

export class MafiaOnlineAPIError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

export function hashPassword(password: string): string {
  for (let i = 0; i < 5; i++)
    password = md5(password + 'azxsw')
  return password
}



export async function signUp(/*nickname: string, */email: string, password: string, language: string = 'RUS', deviceID: string = '0') {
  const response = await fetch(`http://${consts.host}:${consts.ports.restAPI}/user/sign_up`, {
    method: 'POST',
    body: new URLSearchParams({
      email: email,
      // username: nickname,
      password: hashPassword(password),
      deviceId: deviceID,
      lang: language
    })
  })
  return await response.json()
}