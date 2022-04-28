import MafiaOnlineAPI from '../dist/index.js'

test('Class initialized', () => {
  const mafiaOnlineAPI = new MafiaOnlineAPI({ email: 'test', password: 'test' })
  console.log(mafiaOnlineAPI)
})