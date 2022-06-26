# All known types of 'ty' field

Original was here: <https://github.com/VityaSchel/mafia-tools/blob/master/docs/requestTypes.md>

## In request

Value|Description
-|-
sin|Create new session and delete others
acfl|Get friends list
acc|Join global chat (from menu) and subscribe for updates
cmc|Send global message in chat (verified email only)
acd|Get information about authorized user
ncmt|New cloud messaging token (unknown)
uns|Set nickname
acrl|Get list of rooms
re|Join room
rmc|Send message to room chat
rp|Leave room
ac|Accept messages
cp|Create player
usls|Set server language

### **sin** Sign in. Create new session and delete others

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"sin"}
```

### **acfl** Get friends list

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"acfl"}
```

### **acc** Join global chat (from menu) and subscribe for updates

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"acc"}
```

### **cmc** Send global message in chat (verified email only)

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"cmc"}
```

### **acd** Get information about authorized user

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"acd"}
```

### **ncmt** New cloud messaging token (unknown)

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"ncmt"}
```

### **uns** Set nickname

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"uns"}
```

### **acrl** Get list of rooms

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"acrl"}
```

### **rmc** Send message to room chat

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"rmc"}
```

### **ac** Accept messages

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"ac"}
```

### **cp** Create player

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"cp"}
```

### **usls** Set server language

Arguments:

Key|Description
-|-
todo|todo

Example:

```json
{"ty":"usls"}
```

### **re** Join room

Arguments:

Key|Description
-|-
psw|Password to join the room
ro|Room ID

Example request:

```json
{"ty":"re","ro":"ru_room_62b885b5181a0ca4d95ajv","psw":""}
```

Example response:

```json
{"rr":{"o":"ru_room_62b885b5181a0ca4d95ajv","mnp":5,"mxp":8,"mnl":1,"venb":false,"s":0,"t":0,"d":0,"dc":true,"lv":true,"tr":false,"jr":false,"bd":false,"br":false,"sp":true,"tt":"⚘иди уже","pw":""},"ty":"re"}
```

Possible errors:

Ty|Description
rpiw|Room password is wrong. May be issue with hashing.
ulne|User level not enough

### **rp** Leave room

Arguments:

Key|Description
-|-
ro|Room ID

Example request:

```json
{"ty":"rp","ro":"ru_room_62b885b5181a0ca4d95ajv"}
```

No response expected

## In response

Value|Description
-|-
m|New message in chat
siner|Error while authorizing
env|Email is not verified
unws|Error while setting nickname, check "data" field in response
uns|Nickname was set
rs|List of rooms
add|Room appeared