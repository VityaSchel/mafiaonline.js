import '../.env.js'
import MafiaOnlineAPI, { signUp } from '../../dist/index.js'

// FILL THESE BEFORE RUNNING SCRIPT
const _ROOM_ = {
  name: 'Секта',
  password: ''
}

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })
const unsubscribe = await mafiaOnlineAPI.startRoomMonitoring(async room => {
  if (!room) return
  if (room.getName() === _ROOM_.name && (!_ROOM_.password || room.isPasswordProtected()) && (await room.getPlayers()).map(p => p.getName()).some(n => n === 'vityaschel')) {
    unsubscribe()
    room.join(_ROOM_.password)
    room.chat.sendText('ЛЫСОГО БОМЖА НАГЛО УДАРИЛ КЛОУН ЛОПАТОЙ')
    await new Promise(resolve => setTimeout(resolve, 500))
    room.chat.on('message', msg => {
      if (msg.getType() !== 'clear_text') return
      if (msg.getSender().getName() === mafiaOnlineAPI.account.getName()) return

      const ms = ['камень', 'ножницы', 'бумага']
      const lost = () => room.chat.sendText('Я ПРАИГРАЛ.')
      const win = () => room.chat.sendText('Я ВЫИГРАЛ. ИХИХИХХИХИХХ')
      const txt = msg.getText()
      if (ms.includes(txt)) {
        const my = ms[Math.floor(Math.random() * ms.length)]
        room.chat.sendText(my)
        if (txt === my) room.chat.sendText('НИЧЬЯ :/')
        else if(txt === 'камень') {
          if (my === 'ножницы') lost()
          else if (my === 'бумага') win()
        } else if(txt === 'ножницы') {
          if (my === 'бумага') lost()
          else if (my === 'камень') win()
        } else if (txt === 'бумага') {
          if (my === 'камень') lost()
          else if (my === 'ножницы') win()
        }
      }
    })
  }
})
