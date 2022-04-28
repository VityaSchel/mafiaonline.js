import MafiaOnlineAPI from '../dist/index.js'

test('signs in', () => {
  const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })
  const user = await mafiaOnlineAPI.getUser()
  user.get
})