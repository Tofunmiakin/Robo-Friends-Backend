const express = require ('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');

const signup = require('./controllers/signup');
const signin = require('./controllers/signin');

// ODE_TLS_REJECT_UNAUTHORIZED='0';
process.unhandledRejections = 'strict';

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*').from('users')
    .then(all => {
      res.status(200).json(all)
    })
  // res.status(200).json('e dey work')
})
// app.get('/', (req, res)=> { res.json(db.users) })

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/signup', (req, res) => {signup.handleSignup(req, res, db, bcrypt)})

var PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
  console.log(`app is running on port ${PORT}`);
})