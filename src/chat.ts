import MafiaOnlineAPIConnection from './connection.js'
import User from './constructors/user.js'
import { MafiaOnlineAPIError, banHandler } from './utils.js'

interface ChatMessage {
  isHistory: boolean
  sender: User
  text: string
  sentTimestamp: number
  raw: object
}

class MafiaOnlineAPIChat {
  id: number

  /**
   * Subscribe to global public chat
   * @param {function} callback Callback function, that gets called everytime a new message sent by someone in chat with message argument
   * @memberof module:mafiaonline
   * @returns {function} Unsubscribe function
   */
  async joinGlobalChat(callback: (msg: ChatMessage) => void) {
    await this._waitForReadyState()

    let chatListener
    const messageIDS = [], subscriptionDate = Date.now()
    const subscribeToPublicChat = () => {
      this._clientSocket.removeListener('data', this._defaultSocketResponseListener)
      this.log('Subscribed to public chat')

      chatListener = this._processRequestResponse(response => {
        const messages = JSON.parse(response)
        switch (messages.ty) {
          case 'u':
            return

          case 'm':
            messageIncoming(messages.m)
            break

          case 'ms':
            messages.ms.forEach(messageIncoming)
            break

          case 'ublk':
            banHandler(messages)
            break

          default:
            break
        }
      })

      const messageIncoming = msg => {
        if (messageIDS.includes(msg.c)) return
        messageIDS.push(msg.c)
        const message: ChatMessage = {
          isHistory: msg['c'] <= subscriptionDate,
          sender: msg['uu'] && new User(msg['uu']),
          text: msg['tx'],
          sentTimestamp: msg['c'],
          raw: msg
        }
        callback(message)
      }

      this._clientSocket.addListener('data', chatListener)
      this._sendData({ ty: 'acc' })
    }
    subscribeToPublicChat()
    return () => {
      this._sendRequest({ ty: 'acd' }, 2)
      this._clientSocket.removeListener('data', chatListener)
      this._clientSocket.addListener('data', this._defaultSocketResponseListener)
    }
  }

  /**
   * Send message to global chat. Must join global chat first using joinGlobalChat(). Must verify email in order to be able to send more than one message.
   * @memberof module:mafiaonline
   * @param {string} content Text content of message
   * @param {number} messageStyle Style of message (VIP-only)
   */
  async sendToGlobalChat(content: string, messageStyle = 0) {
    await this._sendData({
      ty: 'cmc',
      m: {
        tx: content,
        mstl: messageStyle,
      }
    })
  }
}

interface MafiaOnlineAPIChat extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIChat