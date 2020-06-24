## Setup

Rename **.env.example** to **.env** and add the app url and port.<p/>
Set a **APP_SECRET**, this will be used while hashing user passwords at the database.<p/>
Update [Twillio](https://www.twilio.com/docs/verify/api/verification) fields for phone sms validation.<p/>

Rename **ormconfig.example.json** to **ormconfig.json** and update the database configuration.<p/>
This application was intended to work with [postgres-12](https://www.postgresql.org) database.<p/>
The following database dependencies are needed.
- [uuid-ossp](https://www.postgresql.org/docs/9.4/uuid-ossp.html).
it can be installed by running this at your db.
```
  CREATE EXTENSION "uuid-ossp";
```

this application was made to work along with [CarTalk](https://github.com/jeann47/Cartalk-Mobile).<p/>

Run [Yarn](https://classic.yarnpkg.com/lang/en/) then

```
yarn dev:server
```

Build with
```
yarn build
```

> if something went wrong, delete yarn.lock and try again<p/>
> CORS may need update if released for production


##  Routes


|POST|GET|PUT|DELETE|
|-|-|-|-|
|/user <blockquote/> <p/>create user *the body request must be ```{name, phone and password}```*|/user <blockquote/> <p/>find a user *the body request must be ```{name} or {password}```*|/user <blockquote/><p>update user data *user must be authenticated and the body request must be ```{name}, {password} and(or) {phone}```*|/user/:password<blockquote/><p/>delete the user *user must be authenticated and this need the as param, ex: ```baseUrl/user/user_password```*|
|/sessions <blockquote/><p/> authenticates a user and sign in *the body request must be ```{phone, password}```*|/user/this <blockquote/><p/> finds a user by user id *user must be authenticated*|
|/phone/send <blockquote/><p/> send a verification code to the given number *the body request must be ```{phone}```, note: needs twilio*|/user/near <blockquote/><p/> find multiple users by id *the body request must be ```{[id_1, id_2,..., id_n]}```*|
|/phone/check <blockquote/><p/> validates the phone using the code received *the body request must be ```{phone, code}```*|


## SocketIo

On connect using [SocketIo Client](https://socket.io/docs/client-api/), the following events will be avaliable:

### /moved

will store your position and route in the server

receive  ```{coordinate, route}``` according to the interface
```ts
interface Coords {
    speed?: number;
    heading?: number;
    accuracy?: number;
    altitude?: number;
    longitude: number;
    latitude: number;
    longitudeDelta?: number;
    latitudeDelta?: number;
}

interface MovedProps {
    coordinate: Coords;
    route: string;
}
```

### /pos

will return one array of ids matching all users found in the provided range in meters

receive
```ts
{range: string}
```

 the response should follow
 ```ts
 interface Response {
     near: string[], //array of ids
     distance: {} as ObjectLiteral, //the distance oh each user
     routes: {} as ObjectLiteral //  the routes provided by each user found
 }

 interface ErrorResponse {
     error: string;
 }
```

### /getContact

will request the phone number of a specific user.

receive
```ts

interface Request {
    target: string, //uuid of a target
    for: string, //name of the user who is requesting
}
```

and will emmit an ```/allowContact``` to the target socket providing
```ts
interface Request {
    name: string, // name given with {for} prop
    user_id: string, // id referring to solocitant user
}
```


### /confirmNumber

used to allow a user to see your phone number

receive
```ts

interface Request {
    phone: string, // your phone
    for: string, //id of the user who is requesting
}
```

and will emmit an ```/contactAllowed``` to the solicitant user socket providing
```ts
interface Request {
    phone: string, // name given phone, it will be used to contact you
    user_id: string, // your id, will be used to identify wich user provided the phone number
}
```



### Notes

- [ ] socket.io performance can be improved.

### Assets used

- [TypeScript](https://www.typescriptlang.org).
- [Express](https://expressjs.com/pt-br/).
- [JWT Token](https://github.com/auth0/node-jsonwebtoken).
- [Socket.io](https://socket.io).
- [TS-node](https://github.com/whitecolor/ts-node-dev).
- [Twillio](https://www.twilio.com/docs/verify/api/verification).
- [BCrypt](https://github.com/dcodeIO/bcrypt.js).
- [TypeORM](https://github.com/dcodeIO/bcrypt.js).
- [Date-fns](https://date-fns.org).
- [DotEnv](https://github.com/motdotla/dotenv).

#### linting
[eslint](https://eslint.org) and [prettier](https://prettier.io)
