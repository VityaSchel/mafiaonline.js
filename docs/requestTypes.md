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
rmc|Send message to room chat
ac|Accept messages
cp|Create player
usls|Set server language

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