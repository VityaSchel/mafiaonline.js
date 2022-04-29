import MafiaOnlineAPIConnection from './connection.js'
import MafiaOnlineAPIAccount from './account'
import User from './constructors/user.js'

interface ChatMessage {
  isHistory: boolean,
  sender: User,
  text: string,
  sentTimestamp: number,
  raw: object
}

class MafiaOnlineAPIChat {
  id: number

  async subscribeToChat(callback: (msg: ChatMessage) => void) {
    await new Promise<void>(resolve =>
      setInterval(() =>
        this._socketReady &&
        this._authorized &&
        resolve()
      , 10)
    )

    let timeout, unsubscribe, chatListener
    const messageIDS = [], subscriptionDate = Date.now()
    const subscribeToPublicChat = () => {
      this._clientSocket.removeListener('data', this._defaultSocketResponseListener)
      this.log('Subscribed to public chat')

      const bufferChunks = []
      chatListener = this._processRequestResponse(bufferChunks, response => {
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
        }
      })

      const messageIncoming = msg => {
        if (messageIDS.includes(msg.c)) return
        messageIDS.push(msg.c)
        const message: ChatMessage = {
          isHistory: msg['c'] <= subscriptionDate,
          sender: new User(msg['uu']),
          text: msg['tx'],
          sentTimestamp: msg['c'],
          raw: msg
        }
        callback(message)
      }

      this._clientSocket.addListener('data', chatListener)
      this._sendData({ ty: 'acc' })
      // unsubscribe = subscribeToAPI(this.client, request, messages => {
      //   switch (messages.ty) {
      //     case 'u':
      //       return

      //     case 'm':
      //       callback(messages.m)
      //       break

      //     case 'ms':
      //       messages.ms.forEach(callback)
      //       break
      //   }

      //   setAPItimeout()
      // })
      // const setAPItimeout = () => {
      //   clearInterval(timeout)
      //   timeout = setInterval(() => { unsubscribe(); subscribeToPublicChat() }, 6500)
      // }
      // setAPItimeout()
    }
    subscribeToPublicChat()
    // let client = { client: this.client }
    return () => {
      clearInterval(timeout)
      unsubscribe()
      this._sendRequest({ ty: 'acd' }, 2)
      this._clientSocket.removeListener('data', chatListener)
      this._clientSocket.addListener('data', this._defaultSocketResponseListener)
    }
  }

  /**
   * Send message to global chat. Must join global chat first using joinGlobalChat(). Must verify email in order to be able to send more than one message.
   * @param content Text content of message
   * @param messageStyle Style of message (VIP-only)
   */
  async sendToGlobalChat(content: string, messageStyle = 0) {
    return await this._sendData({
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