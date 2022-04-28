import dotenv from 'dotenv'
const __dirname = new URL('.', import.meta.url).pathname
dotenv.config({ path: __dirname + '.env' })