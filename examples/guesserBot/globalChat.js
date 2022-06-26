import '../.env.js'
import MafiaOnlineAPI from '../../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })
let usersList = []
await mafiaOnlineAPI.joinGlobalChat(async msg => {
  if (msg.isHistory()) return
  if (msg.getType() !== 'clear_text') return
  if (msg.getSender().getName() === mafiaOnlineAPI.account.getName()) return

  const whoRegex = /^кто (.+)\?$/i
  const howMuchRegex = /^сколько (.+)\??$/i
  const isGayRegex = /^(\[([^\]]+)\]|я) гей\??$/
  if (whoRegex.test(msg.getText())) {
    const [, question] = msg.getText().match(whoRegex)
    await mafiaOnlineAPI.sendToGlobalChat(`[${usersList[Math.floor(Math.random() * usersList.length)].getName()}] ` + question)
  } else if (howMuchRegex.test(msg.getText())) {
    await mafiaOnlineAPI.sendToGlobalChat(`[${msg.getSender().getName()}], ` + Math.floor(Math.random()*100))
  } else if (isGayRegex.test(msg.getText())) {
    const [,, nickname] = msg.getText().match(isGayRegex)
    await mafiaOnlineAPI.sendToGlobalChat(`[${nickname ?? msg.getSender().getName()}] на ${Math.floor(Math.random() * 100)}% гей.`)
  }
}, users => usersList = users)
