import './.env.js'
import MafiaOnlineAPI from '../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD }, true)
console.log(await mafiaOnlineAPI.getUser())