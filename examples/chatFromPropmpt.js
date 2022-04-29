import './.env.js'
import MafiaOnlineAPI from '../dist/index.js'
import chalk from 'chalk'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })
await mafiaOnlineAPI.joinGlobalChat(async msg => {
  switch (msg.getType()){
    case 'clear_text':
      print(msg.getSender()?.getName() + ': ' + msg.getText())
      break

    case 'join':
      print(chalk.green(msg.getText() + ' вошел в чат'))
      break

    case 'left':
      print(chalk.red(msg.getText() + ' вышел из чата'))
      break
  }
})



// === https://stackoverflow.com/a/57188810/13689893 ===

var stdin = process.stdin
var stdout = process.stdout
var prompt = '>'
var current = ''

stdin.setRawMode(true)
stdin.setEncoding('utf8')
stdout.write(prompt)

stdin.on('data', function (key) {

  switch (key) {
    case '\u001B\u005B\u0041'://up
    case '\u001B\u005B\u0043'://right
    case '\u001B\u005B\u0042'://down
    case '\u001B\u005B\u0044'://left  
      break

    case '\u0003':
      process.exit()
      break
      
    case '\u000d':
      mafiaOnlineAPI.sendToGlobalChat(current)
      current = ''
      console.log('\b')
      stdout.write(prompt)
      break

    case '\u007f':
      stdout.write('\r\x1b[K')
      current = current.slice(0, -1)
      stdout.write(prompt + current)
      break

    default:
      stdout.write(key)
      current += key
      break
  }
})

function print(str) {

  let totalCurrentLength = current.length + prompt.length
  let lines = Math.ceil(totalCurrentLength / stdout.columns)

  for (let i = 0; i < lines; i++) {
    stdout.clearLine()
    stdout.write('\u001B\u005B\u0041')
  }

  stdout.write('\u001B\u005B\u0042')

  stdout.cursorTo(0)
  console.log(str)
  stdout.write(prompt + current)
}