import '../.env.js'
import MafiaOnlineAPI from '../../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })
await mafiaOnlineAPI.joinGlobalChat(async msg => {
  if (msg.getType() !== 'clear_text') return
  if (msg.getSender().getName() === mafiaOnlineAPI.account.getName()) return

  const ms = ['камень', 'ножницы', 'бумага']
  const lost = () => mafiaOnlineAPI.sendToGlobalChat('Я ПРАИГРАЛ.')
  const win = () => mafiaOnlineAPI.sendToGlobalChat('Я ВЫИГРАЛ. ИХИХИХХИХИХХ')
  const txt = msg.getText()
  if (ms.includes(txt)) {
    const my = ms[Math.floor(Math.random() * ms.length)]
    await mafiaOnlineAPI.sendToGlobalChat(my)
    if (txt === my) await mafiaOnlineAPI.sendToGlobalChat('НИЧЬЯ :/')
    else if (txt === 'камень') {
      if (my === 'ножницы') lost()
      else if (my === 'бумага') win()
    } else if (txt === 'ножницы') {
      if (my === 'бумага') lost()
      else if (my === 'камень') win()
    } else if (txt === 'бумага') {
      if (my === 'камень') lost()
      else if (my === 'ножницы') win()
    }
  }
})

await mafiaOnlineAPI.sendToGlobalChat('ЛЫСОГО БОМЖА НАГЛО УДАРИЛ КЛОУН ЛОПАТОЙ')