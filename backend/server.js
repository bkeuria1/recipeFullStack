const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser')
// const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const passport = require('./passport.js')
const recipeRouter = require('./routes/recipe')
const indexRouter = require('./routes/index')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
app.use(session({
  secret: "Rusty is the worst and ugliest dog in the wolrd",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: process.env.DATABASE_URL })

  // cookie: {domain: 'localhost:3000'}

  // store: MongoStore.create({ 
  //   mongooseConenction: mongoose.connection,
  //   mongoUrl: process.env.DATABASE_URL,
  //   collection: 'sessions'
  //  })
}));

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter)
app.use('/recipes', recipeRouter)


app.listen(process.env.PORT || 3001)