import MafiaOnlineAPIConnection from './connection'
import MafiaOnlineAPIAccount from './account'

class MafiaOnlineAPIChat {
  id: number

  async subscribeToChat(callback) {
    await new Promise<void>(resolve =>
      setInterval(() =>
        this._socketReady &&
        this._authorized &&
        resolve()
        , 10)
    )

    let timeout, unsubscribe, chatListener, messageIDS = [], subscriptionDate = Date.now()
    const subscribeToPublicChat = () => {
      this._clientSocket.removeListener('data', this._defaultSocketResponseListener)
      this.log('Subscribed to public chat')

      const bufferChunks = []
      chatListener = this._processRequestResponse(bufferChunks, response => {
        console.log(response)
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
        const message = {
          isHistory: msg.c <= subscriptionDate,
          ...msg
        }
        callback(message)
      }

      this._clientSocket.addListener('data', chatListener)
      this._sendData({ "ty": "acc" })
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
   * Send message to global chat. Must join global chat first using joinGlobalChat()
   * @param content Text content of message
   * @param messageStyle Style of message (VIP-only)
   */
  async sendToGlobalChat(content: string, messageStyle: number = 0) {
    return await this._sendData({
      ty: "cmc",
      m: {
        tx: content,
        mstl: messageStyle,
      }
    })
  }
}

interface MafiaOnlineAPIChat extends MafiaOnlineAPIConnection { }

export default MafiaOnlineAPIChat