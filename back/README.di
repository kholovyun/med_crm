# Мед сервис "Заботик" api

## _Инструкция как пользоваться api_

## Описание запросов

#Parrent

> Для получения данных Parrent-a:

POST parrents/alldata HTTP/1.1
headers: {Authorization: pyyD-jfly}

> Ответ от сервера приходит в виде объекта мы получаем:

{
"status": 200,
"result":  
{
    id: string,
    userId: string,
    doctorId: string,
    registerDate: Date,
    isActive: boolean,
    users: {
        id: string,
        role: ERoles,
        email: string,
        phone: string,
        name: string,
        surname: string,
        patronim?: string | null,
        isBlocked: boolean
    },
    doctors: {
        id: string,
        userId: string,
        photo: string,
        speciality: string,
        placeOfWork: string,
        experience: number,
        isActive: boolean,
        price: string,
        achievements: string,
        degree: string,
        users: {
            id: string,
            role: ERoles,
            email: string
            phone: string,
            name: string,
            surname: string,
            patronim?: string | null,
            isBlocked: boolean
        }
    },
    children: [
        {
            id: string,
            parentId: string,
            photo: string,
            name: string,
            surname: string,
            dateOfBirth: Date,
            sex: ESex,
            height: number,
            weight: number,
            patronim?: string | null,
            isActive: boolean,
        }
    ]
}
}

> Для удаления сообщения необходимо выполнить следующий DELETE запрос через:

DELETE /messages/:id HTTP/1.1
headers: {Authorization: pyyD-jfly} role должна быть moderator

## Инсталяции

Была использована версия NODE.JS v18.13.0 [Node.js](https://nodejs.org/).

Установкa сервера:

Установка зависимостей type script.

```sh
tsc --init
```

Инициализация.

```sh
npm init
```

Инициализация express.

```sh
npm i express
npm i @types/express -D
```

ts-node-dev.

```sh
npm i -D ts-node-dev
```

Установка cors

```sh
npm i cors --save-dev @types/cors
```

Установка типов

```sh
npm i @types/dotenv @types/validator -D
```

Установка bcrypt

```sh
npm install bcrypt @types/bcrypt -D
```

Установка jwt web token

```sh
npm install --save @types/jsonwebtoken
```

Также на компьютере должен установлен и настроен postgres

Get Started:
- Перед запуском фикстур обязательно создать базу данных прописать в env файл

- Для теста и пред заполнения базы были добавлены fixstures.ts

- Для вызова тестового заполнения базы данных необходимо вызвать команду: npm run seed

- После можно запускать сам сервер

- Для запуска сервера необходимо вызвать команду: npm run dev

## License

✨ Free ✨

**The api server was created by a student of the Attractor school**

**We wish you a pleasant use of the application**