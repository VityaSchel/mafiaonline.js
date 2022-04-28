import './.env.js'
import md5 from 'md5'

let password = process.env.PASSWORD

for (let i = 0; i < 5; i++)
  password = md5(password + 'azxsw')

console.log(password)