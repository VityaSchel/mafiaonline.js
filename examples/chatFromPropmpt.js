import './.env.js'
import MafiaOnlineAPI from '../dist/index.js'

import readline from 'readline'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'BOT> '
})

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD }, true)
await mafiaOnlineAPI.joinGlobalChat(async msg => {
  console.log(msg.sender?.getName(), msg.text)
})

rl.prompt()
rl.on('line', line => {
  console.log('SENT: ', line)
  mafiaOnlineAPI.sendToGlobalChat(line)
  rl.prompt()
}).on('close', () => {
  process.exit(0)
})