require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const passport = require('passport')
const recipeRouter = require('./routes/recipe')
const indexRouter = require('./routes/index')

require('./passport')(passport)
let whitelist = ['http://localhost:3000','http://localhost:3000/new']
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true,
  optionSuccessStatus:200
}))
// app.use(cors({
//   credentials: true,
//    origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }, // <-- location of the react app were connecting to
  
// }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, 
  { useNewUrlParser: true,
   useUnifiedTopology: true,
   autoIndex:true
  
  })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookie())
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongooseConenction: mongoose.connection,
    mongoUrl: process.env.DATABASE_URL,
    collection: 'sessions'
   })
}));



//Configure Passport
app.use(logger('tiny'))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter)
app.use('/recipes', recipeRouter)

app.listen(process.env.PORT || 3001)