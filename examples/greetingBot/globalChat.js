import '../.env.js'
import MafiaOnlineAPI from '../../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })
await mafiaOnlineAPI.joinGlobalChat(async msg => {
  if (msg.isHistory()) return
  if (msg.getType() !== 'join') return
  if (msg.getText() === mafiaOnlineAPI.account.getName()) return

  await mafiaOnlineAPI.sendToGlobalChat(['ХАЙ', 'ПРИВЕТ'][Math.floor(Math.random()*2)] + ' ' + msg.getText())
})
