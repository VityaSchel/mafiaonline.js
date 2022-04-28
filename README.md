# Mafia Online API

# :exclamation: WORK IN PROGRESS :exclamation:

NodeJS module with a set of useful methods to interact with [Mafia Online](https://play.google.com/store/apps/details?id=com.tokarev.mafia) API from dotapp (Vladimir Tokarev).

This library is heavily based on work of [@Zakovskiy](https://github.com/Zakovskiy), props to him for reverse-engineering such a horrible thing as Mafia Online API, which I tried to [do myself](https://github.com/VityaSchel/mafia-tools) back in August, 2021.

TypeScript supported!

## Install

```
npm i mafiaonline.js
```

## Use

```js
import MafiaOnlineAPI from 'mafiaonline.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: 'test@example.com', password: 'pythonsucks228' })
```