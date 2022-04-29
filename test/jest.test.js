import './.env.js'
import MafiaOnlineAPI from '../dist/index.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: process.env.EMAIL, password: process.env.PASSWORD })

test('signs in', async () => {
  const user = await mafiaOnlineAPI.getUser()
  expect(user.getID()).toBe('user_6126389717b7d4d0efdfgy')
  expect(user.getName()).toBe('gadzabot')
})

test('signs out', async () => {
  const response = await mafiaOnlineAPI.signOut()
  expect(response.data).toBe('SUCCESS')
})

test('cannot get user after signed out', async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const user = await mafiaOnlineAPI.getUser()
  console.log(user)
})

afterAll(async () => await mafiaOnlineAPI.close())