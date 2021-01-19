const express = require ('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');


// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'p4ssw0rd',
//     database : 'robofriends'
//   }
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database ={
  users : [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      joined: new Date()
    },

    {
      id: '124',
      name: 'Hue',
      email: 'hue@gmail.com',
      password: 'eggs',
      joined: new Date()
    },

    {
      id: '125',
      name: 'Bog',
      email: 'bog@gmail.com',
      password: 'plants',
      joined: new Date()
    }
  ]
}

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (
      req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password){
        res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/signup', (req, res) => {
  const {email, name, password} =req.body;
  database.users.push({
    id: '126',
    name: name,
    email: email,
    password: password,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.listen(5000, () => {
  console.log('app is running on port 5000');
})