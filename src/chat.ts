import MafiaOnlineAPIConnection from './connection.js'
import User from './constructors/user.js'
import { MafiaOnlineAPIError, banHandler } from './utils.js'
import ChatMessage from './constructors/chatMessage.js'


interface _manageChatArgs {
  onMessage: (msg: ChatMessage) => void
  onLeave?: () => void | Promise<void>
}

class MafiaOnlineAPIChat {
  id: number
  joinedChat: {
    type: 'global' | 'room' | null
  }

  /**
   * Subscribe to global public chat
   * @memberof module:mafiaonline
   * @param {function} callback Callback function, that gets called everytime a new message sent by someone in chat with message argument. It is strongly recommended that you check msg.isHistory() before interacting with it, because when you join chat, server sends you a lot of history messages (that were sent before you joined).
   * @returns {function} Unsubscribe function
   */
  async joinGlobalChat(callback: (msg: ChatMessage) => void) {
    await this._waitForReadyState()
    this._sendData({ ty: 'acc' })
    const unsubscribe = this._manageChat({
      onMessage: callback,
      onLeave: async () => {
        await this._sendRequest({ ty: 'acd' }, 'uud')
      }
    })    
    this.log('Subscribed to public chat')
    return unsubscribe
  }

  /**
   * Send message to global chat. Must join global chat first using joinGlobalChat(). Must verify email in order to be able to send more than one message.
   * @memberof module:mafiaonline
   * @param {string} content Text content of message
   * @param {number} messageStyle Style of message (VIP-only)
   */
  async sendToGlobalChat(content: string, messageStyle = 0) {
    if (this.joinedChat.type === 'global') throw new MafiaOnlineAPIError('ERRMESSAGEOUTSIDE', 'You are trying to send message to global chat, while not in global chat.Join it first with joinGlobalChat() function')
    await this._sendData({
      ty: 'cmc',
      m: {
        tx: content,
        mstl: messageStyle,
      }
    })
  }

  /**
   * Chat manager that handles new messages
   * @memberof module:mafiaonline
   * @param {object} events Events object as first arg
   * @param {function} events.onMessage Callback with message class as argument
   * @param {function} events.onLeave Called on unsubscribing. Must be as simple, as possible
   * @returns {function} Unsubscribe function
   */
  _manageChat({ onMessage, onLeave }: _manageChatArgs): () => Promise<void> {
    const messageIDS = [], subscriptionDate = Date.now()

    const chatListener = this._processRequestResponse(response => {
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
      onMessage?.(new ChatMessage(msg, subscriptionDate))
    }

    this._clientSocket.addListener('data', chatListener)

    return async () => {
      await onLeave()
    }
  }
}

interface MafiaOnlineAPIChat extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIChat