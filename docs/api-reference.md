# API Reference

<p>Mafia Online API</p>


* [mafiaonline](#module_mafiaonline)
    * [.MafiaUser](#module_mafiaonline.MafiaUser)
    * [.MafiaOnlineAPIAccount#getUser()](#module_mafiaonline.MafiaOnlineAPIAccount+getUser) ⇒ <code>Promise.&lt;MafiaUser&gt;</code>
    * [.MafiaOnlineAPIAccount#setNickname(nickname)](#module_mafiaonline.MafiaOnlineAPIAccount+setNickname) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.MafiaOnlineAPIAuth#signOut()](#module_mafiaonline.MafiaOnlineAPIAuth+signOut) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.MafiaOnlineAPIAuth#verifyEmail()](#module_mafiaonline.MafiaOnlineAPIAuth+verifyEmail) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.MafiaOnlineAPIBase#close()](#module_mafiaonline.MafiaOnlineAPIBase+close) ⇒ <code>Promise</code>
    * [.MafiaOnlineAPIChat#joinGlobalChat(callback)](#module_mafiaonline.MafiaOnlineAPIChat+joinGlobalChat) ⇒ <code>function</code>
    * [.MafiaOnlineAPIChat#sendToGlobalChat(content, messageStyle)](#module_mafiaonline.MafiaOnlineAPIChat+sendToGlobalChat)

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

