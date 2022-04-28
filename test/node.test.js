import MafiaOnlineAPI from '../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: 'test', password: 'test' }, true)
mafiaOnlineAPI._sendRequest({"ty":"gup"})
console.log('sent')