import MafiaOnlineAPIConnection from './connection.js'
import User from './constructors/user.js'
import { MafiaOnlineAPIError, banHandler } from './utils.js'
import ChatMessage from './constructors/chatMessage.js'

class MafiaOnlineAPIChat {
  id: number

  /**
   * Subscribe to global public chat
   * @memberof module:mafiaonline
   * @param {function} callback Callback function, that gets called everytime a new message sent by someone in chat with message argument. It is strongly recommended that you check msg.isHistory() before interacting with it, because when you join chat, server sends you a lot of history messages (that were sent before you joined).
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
        callback(new ChatMessage(msg, subscriptionDate))
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