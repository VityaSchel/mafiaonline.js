import '../.env.js'
import MafiaOnlineAPI from '../../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })
await mafiaOnlineAPI.joinGlobalChat(async msg => {
  if (msg.isHistory()) return
  if (msg.getType() !== 'clear_text') return
  if (msg.getSender().getName() === mafiaOnlineAPI.account.getName()) return

  // const regex = /^кто (.+)\?$/i
  // if (regex.test(msg.getText())) {
  //   const [, question] = msg.getText().match(regex)
  //   await mafiaOnlineAPI.sendToGlobalChat( + question)
  // }
})
