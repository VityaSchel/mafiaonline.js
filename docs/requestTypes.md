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
slc|Locale. Either "ru" or "en"

Example:

```json
{"ty":"usls","slc":"ru"}
```

Example response:

```json
{"ty":"slc","slc":"ru"}
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

### **gp** Get players of room

Arguments:

Key|Description
-|-
ro|Room ID

Example request:

```json
{"ty":"gp","ro":"ru_room_62b885b5181a0ca4d95ajv"}
```

Example response:

```json
{"ty":"pin","pls":[{"created":1656262974137,"o":"user_60f550c117abe437210dww","a":true,"u":"albina60","ph":"1","up":1656262954527,"s":1},{"created":1656262981430,"o":"user_62b89125181a0f6fac8vtq","a":true,"u":"Letiz","ph":"","up":1656262972110,"s":0},{"created":1656262994704,"o":"user_62a1110d181452a9d94fcy","a":true,"u":"tatewl","ph":"1","up":1655150844419,"s":0},{"created":1656262995953,"o":"user_6266d79b18061ba364bpzh","a":true,"u":"Nadin00","ph":"1","up":1656170324223,"s":1},{"created":1656263001697,"o":"user_626c23b8180766b8a3dhtd","a":true,"u":"Ви куля","ph":"1","up":1655062690125,"s":1},{"created":1656263003645,"o":"user_62b88b04181a0df09e2vmb","a":true,"u":"чдуье","ph":"","up":1656261488935,"s":0},{"created":1656263007815,"o":"user_62b61bc7181975c83bcjqm","a":true,"u":"скууумбрия","ph":"1","up":1656101887068,"s":0},{"created":1656263008325,"o":"user_62b754db1819c237a1cfaf","a":true,"u":"бензинка","ph":"1","up":1656182915620,"s":0},{"created":1656263008438,"o":"user_62b88976181a0d8f51eerl","a":true,"u":"кетча","ph":"","up":1656261265766,"s":0},{"created":1656263009398,"o":"user_61a62bc317d711af1f0asi","a":true,"u":"threw an ara","ph":"1","up":1656262500257,"s":1},{"created":1656263010374,"o":"user_62b877dc181a094365axcp","a":true,"u":"pisdec kakoi","ph":"1","up":1656260143214,"s":0}],"ro":"ru_room_62b8913d181a0f7578bgbb"} {"ty":"rm","ro":"ru_room_62b89095181a0f4c82fizf"}
```

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
pin|Room players information