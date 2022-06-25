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

```
{"ty":"sin"}
```

### **acfl** Get friends list

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"acfl"}
```

### **acc** Join global chat (from menu) and subscribe for updates

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"acc"}
```

### **cmc** Send global message in chat (verified email only)

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"cmc"}
```

### **acd** Get information about authorized user

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"acd"}
```

### **ncmt** New cloud messaging token (unknown)

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"ncmt"}
```

### **uns** Set nickname

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"uns"}
```

### **acrl** Get list of rooms

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"acrl"}
```

### **rmc** Send message to room chat

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"rmc"}
```

### **ac** Accept messages

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"ac"}
```

### **cp** Create player

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"cp"}
```

### **usls** Set server language

Arguments:

Key|Description
-|-
todo|todo

Example:

```
{"ty":"usls"}
```

### **re** Join room

Arguments:

Key|Description
-|-
psw|Password to join the room
ro|Room ID

Example:

```
{"ty":"re"}
```

Possible errors:

Ty|Description
rpiw|Room password is wrong. May be issue with hashing.
ulne|User level not enough

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