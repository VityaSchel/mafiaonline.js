# Mafia Online API

I made a decision to translate documentation to Russian language since 99% of game's players speak primaraly Russian. If you don't know Russian language, please use Google Translate.

# :exclamation: В разработке :exclamation:

Обертка API мобильной игры [Mafia Online](https://play.google.com/store/apps/details?id=com.tokarev.mafia) от dottap (Владимир Токарев) со списком полезных методов для интерактирования с API, написанная на NodeJS.

Эта библиотека взяла свое начало на основе труда [@Zakovskiy](https://github.com/Zakovskiy), спасибо ему большое за ревернс-инженеринг такой ужасающей вещи как Mafia Online API, кстати я пытался и сам [это сделать](https://github.com/VityaSchel/mafia-tools) в августе 2021.

TypeScript поддерживается!

## Фичи

- [x] TypeScript
- [x] JSDoc
- [x] Обработка бана
- [x] REST API: Регистрация, подтверждение почты
- [x] Обработка обрыва соединения и отключения
- [x] Тесты с Jest
- [x] Примеры
- [x] Вход в аккаунт с емейл/почтой и паролем или токеном и User ID
- [x] Полная поддержка глобального чата 
- [x] Мониторинг комнат, получение списка игроков в них
- [x] Вход/выход из комнат
- [ ] Полная поддержка чата внутри лобби комнат
- [x] Поддержка комнат с паролем
- [ ] Система событий в чатах комнат (голосование, смерть и др.)
- [ ] Поддержка действий всех ролей

## Установка

```
npm i mafiaonline.js
```

## Использование

```js
import MafiaOnlineAPI from 'mafiaonline.js'

const mafiaOnlineAPI = new MafiaOnlineAPI({ email: 'test@example.com', password: 'pythonsucks228' })
```

## Документация

API reference: [docs/api-reference.md](./docs/api-reference.md)

## Примеры

Список примеров и описание: [docs/examples.md](./docs/examples.md)

Примеры можно найти в папке [examples](./examples/)

**Если вы хотите увидеть, как сделать бота в глобальном чате, посмотрите [examples/examples.md#global-chat-bot](./examples/examples.md#global-chat-bot)**

## Предупреждения

- REST API подвережен rate-limiting, который никак не соединен с rate-limiting сокетов (простите за англицизмы). Вы должны считать, что оба сервера разные. 
- В REST API, секунды до разбана из-за частых запросов указаны в поле `data`. Методы REST API имеют тег `@see ## REST API` в JSDoc документации
- Баны распространяются на все аккаунты с тем же IP-адресом и deviceID
- IP-адреса сохраняются в список вашего аккаунта в течение всего времени его существования, начиная от регистрации и каждый раз, когда вы делаете любой запрос