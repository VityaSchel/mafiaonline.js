# API Reference

<p>Mafia Online API</p>


- [API Reference](#api-reference)
    - [MafiaOnlineAPI.MafiaUser](#mafiaonlineapimafiauser)
    - [MafiaOnlineAPI.MafiaOnlineAPIAccount#getUser() ⇒ <code>Promise.&lt;MafiaUser&gt;</code>](#mafiaonlineapimafiaonlineapiaccountgetuser--promisemafiauser)
    - [MafiaOnlineAPI.MafiaOnlineAPIAccount#setNickname(nickname) ⇒ <code>Promise.&lt;boolean&gt;</code>](#mafiaonlineapimafiaonlineapiaccountsetnicknamenickname--promiseboolean)
    - [MafiaOnlineAPI.MafiaOnlineAPIAuth#signOut() ⇒ <code>Promise.&lt;object&gt;</code>](#mafiaonlineapimafiaonlineapiauthsignout--promiseobject)
    - [MafiaOnlineAPI.MafiaOnlineAPIAuth#verifyEmail() ⇒ <code>Promise.&lt;object&gt;</code>](#mafiaonlineapimafiaonlineapiauthverifyemail--promiseobject)
    - [MafiaOnlineAPI.MafiaOnlineAPIBase#close() ⇒ <code>Promise</code>](#mafiaonlineapimafiaonlineapibaseclose--promise)
    - [MafiaOnlineAPI.MafiaOnlineAPIChat#joinGlobalChat(callback) ⇒ <code>function</code>](#mafiaonlineapimafiaonlineapichatjoinglobalchatcallback--function)
    - [MafiaOnlineAPI.MafiaOnlineAPIChat#sendToGlobalChat(content, messageStyle)](#mafiaonlineapimafiaonlineapichatsendtoglobalchatcontent-messagestyle)
    - [MafiaOnlineAPI.MafiaUser#getID() ⇒ <code>number</code>](#mafiaonlineapimafiausergetid--number)
    - [MafiaOnlineAPI.MafiaUser#getName() ⇒ <code>string</code>](#mafiaonlineapimafiausergetname--string)
    - [MafiaOnlineAPI.MafiaUser#getExperience() ⇒ <code>number</code>](#mafiaonlineapimafiausergetexperience--number)
    - [MafiaOnlineAPI.MafiaUser#getLastOnlineDate() ⇒ <code>Date</code>](#mafiaonlineapimafiausergetlastonlinedate--date)
    - [MafiaOnlineAPI.MafiaUser#getLevel() ⇒ <code>number</code>](#mafiaonlineapimafiausergetlevel--number)
    - [MafiaOnlineAPI.MafiaUser#getReputation() ⇒ <code>number</code>](#mafiaonlineapimafiausergetreputation--number)
    - [MafiaOnlineAPI.MafiaUser#getPlayedGames() ⇒ <code>object</code>](#mafiaonlineapimafiausergetplayedgames--object)
    - [MafiaOnlineAPI.MafiaUser#getLocale() ⇒ <code>string</code>](#mafiaonlineapimafiausergetlocale--string)
    - [MafiaOnlineAPI.MafiaUser#isMale() ⇒ <code>boolean</code>](#mafiaonlineapimafiauserismale--boolean)
    - [MafiaOnlineAPI.MafiaUser#isFemale() ⇒ <code>boolean</code>](#mafiaonlineapimafiauserisfemale--boolean)
    - [MafiaOnlineAPI.MafiaUser#getSex() ⇒ <code>number</code>](#mafiaonlineapimafiausergetsex--number)
  - [Interfaces](#interfaces)
  - [REST API](#rest-api)

<a name="module_mafiaonline.MafiaUser"></a>

### MafiaOnlineAPI.MafiaUser
<p>User of Mafia Online</p>

**Kind**: static class of [<code>mafiaonline</code>](#module_mafiaonline)  
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

<a name="module_mafiaonline.MafiaOnlineAPIAuth+signOut"></a>

### MafiaOnlineAPI.MafiaOnlineAPIAuth#signOut() ⇒ <code>Promise.&lt;object&gt;</code>
<p>Sign out from account and delete session</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>Promise.&lt;object&gt;</code> - <p>Response from REST API</p>  
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
| callback | <code>function</code> | <p>Callback function, that gets called everytime a new message sent by someone in chat with message argument</p> |

<a name="module_mafiaonline.MafiaOnlineAPIChat+sendToGlobalChat"></a>

### MafiaOnlineAPI.MafiaOnlineAPIChat#sendToGlobalChat(content, messageStyle)
<p>Send message to global chat. Must join global chat first using joinGlobalChat(). Must verify email in order to be able to send more than one message.</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>string</code> |  | <p>Text content of message</p> |
| messageStyle | <code>number</code> | <code>0</code> | <p>Style of message (VIP-only)</p> |

<a name="module_mafiaonline.MafiaUser+getID"></a>

### MafiaOnlineAPI.MafiaUser#getID() ⇒ <code>number</code>
<p>Get in-game ID of user</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>number</code> - <p>User ID</p>  
<a name="module_mafiaonline.MafiaUser+getName"></a>

### MafiaOnlineAPI.MafiaUser#getName() ⇒ <code>string</code>
<p>Get user nickname</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>string</code> - <p>User nickname</p>  
<a name="module_mafiaonline.MafiaUser+getExperience"></a>

### MafiaOnlineAPI.MafiaUser#getExperience() ⇒ <code>number</code>
<p>Get user experience</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>number</code> - <p>User experience</p>  
<a name="module_mafiaonline.MafiaUser+getLastOnlineDate"></a>

### MafiaOnlineAPI.MafiaUser#getLastOnlineDate() ⇒ <code>Date</code>
<p>Get user last date of online</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>Date</code> - <p>Date of online</p>  
<a name="module_mafiaonline.MafiaUser+getLevel"></a>

### MafiaOnlineAPI.MafiaUser#getLevel() ⇒ <code>number</code>
<p>Get user level</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>number</code> - <p>User level</p>  
<a name="module_mafiaonline.MafiaUser+getReputation"></a>

### MafiaOnlineAPI.MafiaUser#getReputation() ⇒ <code>number</code>
<p>Get user reputation</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>number</code> - <p>User reputation</p>  
<a name="module_mafiaonline.MafiaUser+getPlayedGames"></a>

### MafiaOnlineAPI.MafiaUser#getPlayedGames() ⇒ <code>object</code>
<p>Get information about played games</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>object</code> - <p>Object with stats</p>  
<a name="module_mafiaonline.MafiaUser+getLocale"></a>

### MafiaOnlineAPI.MafiaUser#getLocale() ⇒ <code>string</code>
<p>Get language of user</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>string</code> - <p>User locale</p>  
<a name="module_mafiaonline.MafiaUser+isMale"></a>

### MafiaOnlineAPI.MafiaUser#isMale() ⇒ <code>boolean</code>
<p>Check if user sex is male</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>boolean</code> - <p>True if user is male, false otherwise</p>  
<a name="module_mafiaonline.MafiaUser+isFemale"></a>

### MafiaOnlineAPI.MafiaUser#isFemale() ⇒ <code>boolean</code>
<p>Check if user sex is female</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>boolean</code> - <p>True if user is female, false otherwise</p>  
<a name="module_mafiaonline.MafiaUser+getSex"></a>

### MafiaOnlineAPI.MafiaUser#getSex() ⇒ <code>number</code>
<p>Get user sex</p>

**Kind**: static method of [<code>mafiaonline</code>](#module_mafiaonline)  
**Returns**: <code>number</code> - <p>0 if user is male, 0 if user is female</p>  

## Interfaces

```typescript
interface ChatMessage {
  isHistory: boolean
  sender: User
  text: string
  sentTimestamp: number
  raw: object
}
```

## REST API

This method uses HTTP REST API.