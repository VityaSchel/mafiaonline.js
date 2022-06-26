# Examples of using mafiaonline.js

In order to run any of these examples, you must follow these steps:

1. Create new project using `npm`
2. Install latest version of mafiaonline.js using instructions from README.md (`npm install mafiaonline.js`)
3. Copy contents of any example file
4. Install all dependencies listed in copied file
5. Copy `.env.js` file and install `dotenv`
6. Fill `.env` file in root of project using `.env.sample` file
7. Run copied file using `node filename.js`

**Please make sure you have separate account for your bot! It's very important since you can't have multiple sessions. Also I recommend you to run bot from VPN or proxy so its ban won't expand on your account**

## Global chat bot

This bot runs in global chat (available from main menu). You can create it by using `joinGlobalChat` and `sendToGlobalChat` methods. See examples below, demonstrating how to interact with users.

- [Calculator](./globalChatCalculator.js)
  - Run in command line, join global chat from other account and use command `/calc digit + digit` or `/calc digit - digit`
- [Chat from prompt](./chatFromPropmpt.js)
  - In-game global chat implemented as CLI. Type "exit" to safely leave the chat and exit the process
  - ![Chat in cli screenshot](https://user-images.githubusercontent.com/59040542/166064524-4471edc6-caa1-4109-81f4-6bbbdcfca807.jpg)
- [Greeting bot](./greetingBot/globalChat.js)
  - Just run and join global chat from your own account and watch as all people are greeted.

## Chatbots

Some bots can work inside room and global chat.

- 