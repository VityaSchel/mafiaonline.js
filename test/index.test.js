import MafiaOnlineAPI from '../dist/index.js'

test('Login', () => {
  const mafiaOnlineAPI = new MafiaOnlineAPI({ email: 'test', password: 'test' })
  console.log(mafiaOnlineAPI)
  mafiaOnlineAPI.id = '123'
  expect(mafiaOnlineAPI.test()).toBe('123')
})