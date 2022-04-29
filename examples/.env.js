import { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url)) + '/'
dotenv.config({ path: __dirname + '.env' })