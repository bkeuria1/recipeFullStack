const mongoose = require('mongoose')
const Recipe = require('./recipe')

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        
        //required:true
    },
    calories:{
        type:String,
        //required:true
    },
    ingredients:{
        type:[Object],
        unique:true
        //required:true
    },
    img:{
        type:String
    }
})

module.exports = mongoose.model('Recipe',recipeSchema);