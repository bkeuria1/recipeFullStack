const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser')
// const methodOverride = require('method-override')

const recipeRouter = require('./routes/recipe')



const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/recipes', recipeRouter)
app.use(cors())
app.listen(process.env.PORT || 3001)