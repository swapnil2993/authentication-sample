# Authentication-sample

This project is a simple authentication system having following features:
    - Create account.
    - Login
    - Email verification of newly created account.
    - Resend email for verification.
    
### Tech Stack
    
  - Nodejs (v11.0.0)
  - Reactjs(v16.6)
  - Express(v4.x)
  - MongoDB (v3.7)




### Installation

Install the dependencies and devDependencies and start the server.
Create .env file from .env.sample for all the configurations.

```sh
$ npm install
$ cd webclient
$ npm install
```

For production environments for heroku.
Need to add .env values to heroku config else replace npm start with npm run dev
```sh
$ npm install
$ npm start
$ npm run heroku-postbuild
```


### Development
For server side development: 
```sh
$ npm run dev
```

For client side development:
```sh
$ cd webclient
$ npm start
```

#### Build react code for production
For production release:
```sh
$ cd webclient
$ cd npm run build
```

### Todos

 - Better deployment options with scripts.
 - Better production configuration for node server.
 - Logout functionality.
 - Dockerize

### Demo 
[Link](https://authentication-sample.herokuapp.com)




