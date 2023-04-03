const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

const sessionStore = new MongoStore({
  url: 'mongodb://localhost:27017/mydatabase',
  collection: 'sessions'
});

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});






