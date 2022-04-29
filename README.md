# Mafia Online API

# :exclamation: WORK IN PROGRESS :exclamation:

NodeJS module with a set of useful methods to interact with [Mafia Online](https://play.google.com/store/apps/details?id=com.tokarev.mafia) API from dotapp (Vladimir Tokarev).

This library is heavily based on work of [@Zakovskiy](https://github.com/Zakovskiy), props to him for reverse-engineering such a horrible thing as Mafia Online API, which I tried to [do myself](https://github.com/VityaSchel/mafia-tools) back in August, 2021.

TypeScript supported!

## Features

[x] TypeScript
[x] JSDoc
[x] Ban error handler
[x] REST API: Sign up, email verification
[x] Disconnection handler
[x] Tested with Jest
[x] Examples
[x] Sign in with email/nickname&password or token&userid
[x] Global chat subscription 
[x] Rooms monitoring

## Install

```
npm i mafiaonline.js
```

## Use

```js
import MafiaOnlineAPI from 'mafiaonline.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: 'test@example.com', password: 'pythonsucks228' })
```

## Documentation

See API reference at [docs/api-reference.md](./docs/api-reference.md)

## Examples

Examples can be found under [examples](./examples/) dir

## Caveats

- REST API is subject of rate limiting, which is not connected to TCP rate limiting. You should treat both servers are separate. In REST API, seconds left until rate limit unban is declared in "data" field. Methods of REST API are tagged with @see ## REST API in documentation.