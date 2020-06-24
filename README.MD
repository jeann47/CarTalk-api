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
