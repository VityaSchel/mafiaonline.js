import './.env.js'
import MafiaOnlineAPI from '../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD }, true)
await mafiaOnlineAPI.joinGlobalChat(async msg => {
  const regex = /^\/calc (-?\d{1,10}) ?(\+|-) ?(-?\d{1,10})$/

  if (!msg.isHistory && regex.test(msg.text)) {
    console.log('COMMAND TRIGGERED by', msg.sender.getName())
    const [, n1, op, n2] = msg.text.match(regex)
    console.log(await mafiaOnlineAPI.sendToGlobalChat(`[${msg.sender.getName()}], ${eval(Number(n1) + op + Number(n2))}`))
  }
})