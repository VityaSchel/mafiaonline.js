import MafiaOnlineAPI from '../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD }, true)
mafiaOnlineAPI.signIn(process.env.EMAIL, process.env.PASSWORD)
console.log('sent')