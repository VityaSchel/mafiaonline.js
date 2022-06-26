import User from './user.js'

export type MessageType = 'clear_text' | 'join' | 'left' | 'game_started' | 'mafia_in_chat' | 'mafia_choosing_victim' | 'civilian_in_chat' | 'civilian_voting' | 'civilian_vote' | 'clear_text' | '[unknown]' | 'player_killed' | 'civilian_vote' | 'no_one_killed' | 'civilians_won' | 'mafia_won' | 'dead_player_last_message'

/**
 * @class ChatMessage
 * @classdesc Message in chat
 * @memberof module:mafiaonline
 */
class ChatMessage {
  sender: User | void
  data: object
  subscriptionDate: number

  constructor(data, subscriptionDate) {
    this.data = data
    this.sender = data['uu'] && new User(data['uu'])
    this.subscriptionDate = subscriptionDate
  }

  /**
   * Check if message is historic (sent before joining)
   * @memberof module:mafiaonline.ChatMessage
   * @returns {boolean} True if message is historic
   */
  isHistory() {
    return this.data['c'] <= this.subscriptionDate
  }

  /**
   * Get sender of message, User class instance
   * @memberof module:mafiaonline.ChatMessage
   * @returns {User} Sender of message
   */
  getSender() {
    return this.sender
  }

  /**
   * Get text content of message
   * @memberof module:mafiaonline.ChatMessage
   * @returns {string} Clear text of message
   */
  getText() {
    return this.data['tx']
  }

  /**
   * Get timestamp of message send in unix timestamp format (seconds since epoch)
   * @memberof module:mafiaonline.ChatMessage
   * @returns {number} Time when message was sent
   */
  getSentTimestamp() {
    return this.data['c']
  }

  /**
   * Returns type of message, one of 'clear_text', 'join', 'left', 'game_started', 'mafia_in_chat', 'mafia_choosing_victim', 'civilian_in_chat', 'civilian_voting', 'civilian_vote', 'clear_text', '[unknown]', 'player_killed', 'civilian_vote', 'no_one_killed', 'civilians_won', 'mafia_won', 'dead_player_last_message'
   * @memberof module:mafiaonline.ChatMessage
   * @returns {string} Type of message in chat
   */
  getType(): MessageType {
    const types = [
      null,
      'clear_text',
      'join',
      'left',
      'game_started',
      'mafia_in_chat',
      'mafia_choosing_victim',
      'civilian_in_chat',
      'civilian_voting',
      'civilian_vote',
      'clear_text',
      '[unknown]',
      'player_killed',
      'civilian_vote',
      'no_one_killed',
      'civilians_won',
      'mafia_won',
      'dead_player_last_message',
    ]
    return <MessageType> types[this.data['t']]
  }
}

export default ChatMessage