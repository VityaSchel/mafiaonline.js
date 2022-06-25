# API Reference

<p>Mafia Online API</p>


* [mafiaonline](#module_mafiaonline)
    * [.ChatMessage](#module_mafiaonline.ChatMessage)
        * [.ChatMessage#isHistory()](#module_mafiaonline.ChatMessage.ChatMessage+isHistory) ⇒ <code>boolean</code>
        * [.ChatMessage#getSender()](#module_mafiaonline.ChatMessage.ChatMessage+getSender) ⇒ <code>User</code>
        * [.ChatMessage#getText()](#module_mafiaonline.ChatMessage.ChatMessage+getText) ⇒ <code>string</code>
        * [.ChatMessage#getSentTimestamp()](#module_mafiaonline.ChatMessage.ChatMessage+getSentTimestamp) ⇒ <code>number</code>
        * [.ChatMessage#getType()](#module_mafiaonline.ChatMessage.ChatMessage+getType) ⇒ <code>string</code>
    * [.MafiaRoom](#module_mafiaonline.MafiaRoom)
        * [.MafiaRoom#getID()](#module_mafiaonline.MafiaRoom.MafiaRoom+getID) ⇒ <code>number</code>
        * [.MafiaRoom#getName()](#module_mafiaonline.MafiaRoom.MafiaRoom+getName) ⇒ <code>string</code>
        * [.MafiaRoom#getMinimumLevel()](#module_mafiaonline.MafiaRoom.MafiaRoom+getMinimumLevel) ⇒ <code>number</code>
        * [.MafiaRoom#isPasswordProtected()](#module_mafiaonline.MafiaRoom.MafiaRoom+isPasswordProtected) ⇒ <code>boolean</code>
        * [.MafiaRoom#join()](#module_mafiaonline.MafiaRoom.MafiaRoom+join)
        * [.MafiaRoom#leave()](#module_mafiaonline.MafiaRoom.MafiaRoom+leave)
    * [.MafiaUser](#module_mafiaonline.MafiaUser)
        * [.MafiaUser#getID()](#module_mafiaonline.MafiaUser.MafiaUser+getID) ⇒ <code>number</code>
        * [.MafiaUser#getName()](#module_mafiaonline.MafiaUser.MafiaUser+getName) ⇒ <code>string</code>
        * [.MafiaUser#getExperience()](#module_mafiaonline.MafiaUser.MafiaUser+getExperience) ⇒ <code>number</code>
        * [.MafiaUser#getLastOnlineDate()](#module_mafiaonline.MafiaUser.MafiaUser+getLastOnlineDate) ⇒ <code>Date</code>
        * [.MafiaUser#getLevel()](#module_mafiaonline.MafiaUser.MafiaUser+getLevel) ⇒ <code>number</code>
        * [.MafiaUser#getReputation()](#module_mafiaonline.MafiaUser.MafiaUser+getReputation) ⇒ <code>number</code>
        * [.MafiaUser#getPlayedGames()](#module_mafiaonline.MafiaUser.MafiaUser+getPlayedGames) ⇒ <code>object</code>
        * [.MafiaUser#getLocale()](#module_mafiaonline.MafiaUser.MafiaUser+getLocale) ⇒ <code>string</code>
        * [.MafiaUser#isMale()](#module_mafiaonline.MafiaUser.MafiaUser+isMale) ⇒ <code>boolean</code>
        * [.MafiaUser#isFemale()](#module_mafiaonline.MafiaUser.MafiaUser+isFemale) ⇒ <code>boolean</code>
        * [.MafiaUser#getSex()](#module_mafiaonline.MafiaUser.MafiaUser+getSex) ⇒ <code>number</code>
    * [.MafiaOnlineAPIAccount#getUser()](#module_mafiaonline.MafiaOnlineAPIAccount+getUser) ⇒ <code>Promise.&lt;MafiaUser&gt;</code>
    * [.MafiaOnlineAPIAccount#setNickname(nickname)](#module_mafiaonline.MafiaOnlineAPIAccount+setNickname) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.MafiaOnlineAPIAccount#setLocale(locale)](#module_mafiaonline.MafiaOnlineAPIAccount+setLocale) ⇒ <code>object</code>
    * [.MafiaOnlineAPIAuth#signOut()](#module_mafiaonline.MafiaOnlineAPIAuth+signOut) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.MafiaOnlineAPIAuth#verifyEmail()](#module_mafiaonline.MafiaOnlineAPIAuth+verifyEmail) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.MafiaOnlineAPIBase#close()](#module_mafiaonline.MafiaOnlineAPIBase+close) ⇒ <code>Promise</code>
    * [.MafiaOnlineAPIChat#joinGlobalChat(callback)](#module_mafiaonline.MafiaOnlineAPIChat+joinGlobalChat) ⇒ <code>function</code>
    * [.MafiaOnlineAPIChat#sendToGlobalChat(content, messageStyle)](#module_mafiaonline.MafiaOnlineAPIChat+sendToGlobalChat)

<a name="module_mafiaonline.ChatMessage"></a>

### MafiaOnlineAPI.ChatMessage
<p>Message in chat</p>

**Kind**: static class of [<code>mafiaonline</code>](#module_mafiaonline)  

* [.ChatMessage](#module_mafiaonline.ChatMessage)
    * [.ChatMessage#isHistory()](#module_mafiaonline.ChatMessage.ChatMessage+isHistory) ⇒ <code>boolean</code>
    * [.ChatMessage#getSender()](#module_mafiaonline.ChatMessage.ChatMessage+getSender) ⇒ <code>User</code>
    * [.ChatMessage#getText()](#module_mafiaonline.ChatMessage.ChatMessage+getText) ⇒ <code>string</code>
    * [.ChatMessage#getSentTimestamp()](#module_mafiaonline.ChatMessage.ChatMessage+getSentTimestamp) ⇒ <code>number</code>
    * [.ChatMessage#getType()](#module_mafiaonline.ChatMessage.ChatMessage+getType) ⇒ <code>string</code>

<a name="module_mafiaonline.ChatMessage.ChatMessage+isHistory"></a>

#### ChatMessage.ChatMessage#isHistory() ⇒ <code>boolean</code>
<p>Check if message is historic (sent before joining)</p>

**Kind**: static method of [<code>ChatMessage</code>](#module_mafiaonline.ChatMessage)  
**Returns**: <code>boolean</code> - <p>True if message is historic</p>  
<a name="module_mafiaonline.ChatMessage.ChatMessage+getSender"></a>

#### ChatMessage.ChatMessage#getSender() ⇒ <code>User</code>
<p>Get sender of message, User class instance</p>

**Kind**: static method of [<code>ChatMessage</code>](#module_mafiaonline.ChatMessage)  
**Returns**: <code>User</code> - <p>Sender of message</p>  
<a name="module_mafiaonline.ChatMessage.ChatMessage+getText"></a>

#### ChatMessage.ChatMessage#getText() ⇒ <code>string</code>
<p>Get text content of message</p>

**Kind**: static method of [<code>ChatMessage</code>](#module_mafiaonline.ChatMessage)  
**Returns**: <code>string</code> - <p>Clear text of message</p>  
<a name="module_mafiaonline.ChatMessage.ChatMessage+getSentTimestamp"></a>

#### ChatMessage.ChatMessage#getSentTimestamp() ⇒ <code>number</code>
<p>Get timestamp of message send in unix timestamp format (seconds since epoch)</p>

**Kind**: static method of [<code>ChatMessage</code>](#module_mafiaonline.ChatMessage)  
**Returns**: <code>number</code> - <p>Time when message was sent</p>  
<a name="module_mafiaonline.ChatMessage.ChatMessage+getType"></a>

#### ChatMessage.ChatMessage#getType() ⇒ <code>string</code>
<p>Returns type of message, one of 'clear_text', 'join', 'left', 'game_started', 'mafia_in_chat', 'mafia_choosing_victim', 'civilian_in_chat', 'civilian_voting', 'civilian_vote', 'clear_text', '[unknown]', 'player_killed', 'civilian_vote', 'no_one_killed', 'civilians_won', 'mafia_won', 'dead_player_last_message'</p>

**Kind**: static method of [<code>ChatMessage</code>](#module_mafiaonline.ChatMessage)  
**Returns**: <code>string</code> - <p>Type of message in chat</p>  
<a name="module_mafiaonline.MafiaRoom"></a>

### MafiaOnlineAPI.MafiaRoom
<p>Room of Mafia Online</p>

**Kind**: static class of [<code>mafiaonline</code>](#module_mafiaonline)  

* [.MafiaRoom](#module_mafiaonline.MafiaRoom)
    * [.MafiaRoom#getID()](#module_mafiaonline.MafiaRoom.MafiaRoom+getID) ⇒ <code>number</code>
    * [.MafiaRoom#getName()](#module_mafiaonline.MafiaRoom.MafiaRoom+getName) ⇒ <code>string</code>
    * [.MafiaRoom#getMinimumLevel()](#module_mafiaonline.MafiaRoom.MafiaRoom+getMinimumLevel) ⇒ <code>number</code>
    * [.MafiaRoom#isPasswordProtected()](#module_mafiaonline.MafiaRoom.MafiaRoom+isPasswordProtected) ⇒ <code>boolean</code>
    * [.MafiaRoom#join()](#module_mafiaonline.MafiaRoom.MafiaRoom+join)
    * [.MafiaRoom#leave()](#module_mafiaonline.MafiaRoom.MafiaRoom+leave)

<a name="module_mafiaonline.MafiaRoom.MafiaRoom+getID"></a>

#### MafiaRoom.MafiaRoom#getID() ⇒ <code>number</code>
<p>Get ID of room</p>

**Kind**: static method of [<code>MafiaRoom</code>](#module_mafiaonline.MafiaRoom)  
**Returns**: <code>number</code> - <p>ID of room</p>  
<a name="module_mafiaonline.MafiaRoom.MafiaRoom+getName"></a>

#### MafiaRoom.MafiaRoom#getName() ⇒ <code>string</code>
<p>Get room name</p>

**Kind**: static method of [<code>MafiaRoom</code>](#module_mafiaonline.MafiaRoom)  
**Returns**: <code>string</code> - <p>Name of room</p>  
<a name="module_mafiaonline.MafiaRoom.MafiaRoom+getMinimumLevel"></a>

#### MafiaRoom.MafiaRoom#getMinimumLevel() ⇒ <code>number</code>
<p>Get minimum level required to join the room</p>

**Kind**: static method of [<code>MafiaRoom</code>](#module_mafiaonline.MafiaRoom)  
**Returns**: <code>number</code> - <p>Minimum level for room</p>  
<a name="module_mafiaonline.MafiaRoom.MafiaRoom+isPasswordProtected"></a>

#### MafiaRoom.MafiaRoom#isPasswordProtected() ⇒ <code>boolean</code>
<p>Returns true is room is password protected</p>

**Kind**: static method of [<code>MafiaRoom</code>](#module_mafiaonline.MafiaRoom)  
<a name="module_mafiaonline.MafiaRoom.MafiaRoom+join"></a>

#### MafiaRoom.MafiaRoom#join()
<p>Enters the room</p>

**Kind**: static method of [<code>MafiaRoom</code>](#module_mafiaonline.MafiaRoom)  
<a name="module_mafiaonline.MafiaRoom.MafiaRoom+leave"></a>

#### MafiaRoom.MafiaRoom#leave()
<p>Leaves the room</p>

**Kind**: static method of [<code>MafiaRoom</code>](#module_mafiaonline.MafiaRoom)  
<a name="module_mafiaonline.MafiaUser"></a>

### MafiaOnlineAPI.MafiaUser
<p>User of Mafia Online</p>

**Kind**: static class of [<code>mafiaonline</code>](#module_mafiaonline)  

* [.MafiaUser](#module_mafiaonline.MafiaUser)
    * [.MafiaUser#getID()](#module_mafiaonline.MafiaUser.MafiaUser+getID) ⇒ <code>number</code>
    * [.MafiaUser#getName()](#module_mafiaonline.MafiaUser.MafiaUser+getName) ⇒ <code>string</code>
    * [.MafiaUser#getExperience()](#module_mafiaonline.MafiaUser.MafiaUser+getExperience) ⇒ <code>number</code>
    * [.MafiaUser#getLastOnlineDate()](#module_mafiaonline.MafiaUser.MafiaUser+getLastOnlineDate) ⇒ <code>Date</code>
    * [.MafiaUser#getLevel()](#module_mafiaonline.MafiaUser.MafiaUser+getLevel) ⇒ <code>number</code>
    * [.MafiaUser#getReputation()](#module_mafiaonline.MafiaUser.MafiaUser+getReputation) ⇒ <code>number</code>
    * [.MafiaUser#getPlayedGames()](#module_mafiaonline.MafiaUser.MafiaUser+getPlayedGames) ⇒ <code>object</code>
    * [.MafiaUser#getLocale()](#module_mafiaonline.MafiaUser.MafiaUser+getLocale) ⇒ <code>string</code>
    * [.MafiaUser#isMale()](#module_mafiaonline.MafiaUser.MafiaUser+isMale) ⇒ <code>boolean</code>
    * [.MafiaUser#isFemale()](#module_mafiaonline.MafiaUser.MafiaUser+isFemale) ⇒ <code>boolean</code>
    * [.MafiaUser#getSex()](#module_mafiaonline.MafiaUser.MafiaUser+getSex) ⇒ <code>number</code>

<a name="module_mafiaonline.MafiaUser.MafiaUser+getID"></a>

#### MafiaUser.MafiaUser#getID() ⇒ <code>number</code>
<p>Get in-game ID of user</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>number</code> - <p>User ID</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getName"></a>

#### MafiaUser.MafiaUser#getName() ⇒ <code>string</code>
<p>Get user nickname</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>string</code> - <p>User nickname</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getExperience"></a>

#### MafiaUser.MafiaUser#getExperience() ⇒ <code>number</code>
<p>Get user experience</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>number</code> - <p>User experience</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getLastOnlineDate"></a>

#### MafiaUser.MafiaUser#getLastOnlineDate() ⇒ <code>Date</code>
<p>Get user last date of online</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>Date</code> - <p>Date of online</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getLevel"></a>

#### MafiaUser.MafiaUser#getLevel() ⇒ <code>number</code>
<p>Get user level</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>number</code> - <p>User level</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getReputation"></a>

#### MafiaUser.MafiaUser#getReputation() ⇒ <code>number</code>
<p>Get user reputation</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>number</code> - <p>User reputation</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getPlayedGames"></a>

#### MafiaUser.MafiaUser#getPlayedGames() ⇒ <code>object</code>
<p>Get information about played games</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>object</code> - <p>Object with stats</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getLocale"></a>

#### MafiaUser.MafiaUser#getLocale() ⇒ <code>string</code>
<p>Get language of user</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>string</code> - <p>User locale</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+isMale"></a>

#### MafiaUser.MafiaUser#isMale() ⇒ <code>boolean</code>
<p>Check if user sex is male</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>boolean</code> - <p>True if user is male, false otherwise</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+isFemale"></a>

#### MafiaUser.MafiaUser#isFemale() ⇒ <code>boolean</code>
<p>Check if user sex is female</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>boolean</code> - <p>True if user is female, false otherwise</p>  
<a name="module_mafiaonline.MafiaUser.MafiaUser+getSex"></a>

#### MafiaUser.MafiaUser#getSex() ⇒ <code>number</code>
<p>Get user sex</p>

**Kind**: static method of [<code>MafiaUser</code>](#module_mafiaonline.MafiaUser)  
**Returns**: <code>number</code> - <p>0 if user is male, 0 if user is female</p>  
<a name="module_mafiaonline.MafiaOnlineAPIAccount+getUser"></a>

### MafiaOnlineAPI.MafiaOnlineAPIAccount#getUser() ⇒ <code>Promise.&lt;MafiaUser&gt;</code>
<p>Get authorized User</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>Promise.&lt;MafiaUser&gt;</code> - <p>Instance of User class</p>  
<a name="module_mafiaonline.MafiaOnlineAPIAccount+setNickname"></a>

### MafiaOnlineAPI.MafiaOnlineAPIAccount#setNickname(nickname) ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Set nickname of authorized user</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>True if nickname set successfully</p>  

| Param | Type | Description |
| --- | --- | --- |
| nickname | <code>string</code> | <p>New nickname of user</p> |

<a name="module_mafiaonline.MafiaOnlineAPIAccount+setLocale"></a>

### MafiaOnlineAPI.MafiaOnlineAPIAccount#setLocale(locale) ⇒ <code>object</code>
<p>Set server language. Mustn't change frequently (once in 6 hours)</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>object</code> - <p>Response from server, like this: {&quot;ty&quot;:&quot;slc&quot;,&quot;slc&quot;:&quot;ru&quot;}</p>  

| Param | Type | Description |
| --- | --- | --- |
| locale | <code>string</code> | <p>One of 'ru', 'en'</p> |

<a name="module_mafiaonline.MafiaOnlineAPIAuth+signOut"></a>

### MafiaOnlineAPI.MafiaOnlineAPIAuth#signOut() ⇒ <code>Promise.&lt;object&gt;</code>
<p>Sign out from account and delete session</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>Promise.&lt;object&gt;</code> - <p>Response from REST API</p>  
**See**: [REST API](##)  
<a name="module_mafiaonline.MafiaOnlineAPIAuth+verifyEmail"></a>

### MafiaOnlineAPI.MafiaOnlineAPIAuth#verifyEmail() ⇒ <code>Promise.&lt;object&gt;</code>
<p>Send verification email</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>Promise.&lt;object&gt;</code> - <p>Response from REST API</p>  
**See**: [REST API](##)  
<a name="module_mafiaonline.MafiaOnlineAPIBase+close"></a>

### MafiaOnlineAPI.MafiaOnlineAPIBase#close() ⇒ <code>Promise</code>
<p>Closes current socket and cleans up all stuff. Does not delete session, use signOut() before close()!</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
<a name="module_mafiaonline.MafiaOnlineAPIChat+joinGlobalChat"></a>

### MafiaOnlineAPI.MafiaOnlineAPIChat#joinGlobalChat(callback) ⇒ <code>function</code>
<p>Subscribe to global public chat</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>function</code> - <p>Unsubscribe function</p>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | <p>Callback function, that gets called everytime a new message sent by someone in chat with message argument. It is strongly recommended that you check msg.isHistory() before interacting with it, because when you join chat, server sends you a lot of history messages (that were sent before you joined).</p> |

<a name="module_mafiaonline.MafiaOnlineAPIChat+sendToGlobalChat"></a>

### MafiaOnlineAPI.MafiaOnlineAPIChat#sendToGlobalChat(content, messageStyle)
<p>Send message to global chat. Must join global chat first using joinGlobalChat(). Must verify email in order to be able to send more than one message.</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>string</code> |  | <p>Text content of message</p> |
| messageStyle | <code>number</code> | <code>0</code> | <p>Style of message (VIP-only)</p> |


## REST API

This method uses HTTP REST API.