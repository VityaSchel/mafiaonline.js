import './.env.js'
import MafiaOnlineAPI from '../dist/index.js'

// import readline from 'readline'
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: 'BOT> '
// })

// const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD }, true)
// await mafiaOnlineAPI.subscribeToChat(async e => {
//   console.log(e.isHistory, e.t, e.uu?.u, e.tx)

//   // if(!e.isHistory && e.tx === '123') {//.startsWith('/gadzabot')) {
//   //   console.log('=====')
//   //   console.log('COMMAND TRIGGERED')
//   //   console.log(await mafiaOnlineAPI.sendToGlobalChat('1'))//`[${e.uu?.u}], привет мир!`)
//   //   await new Promise(resolve => setTimeout(resolve, 1500))
//   //   console.log(await mafiaOnlineAPI.sendToGlobalChat('2'))//`[${e.uu?.u}], foo bar`)
//   //   console.log('=====')
//   // }
//   // console.log(e)
// })

// rl.prompt()
// rl.on('line', line => {
//   console.log('=====SENT=====')
//   console.log('=====SENT=====')
//   console.log('=====SENT=====', line)
//   mafiaOnlineAPI.sendToGlobalChat(line)
//   rl.prompt()
// }).on('close', () => {
//   process.exit(0)
// });