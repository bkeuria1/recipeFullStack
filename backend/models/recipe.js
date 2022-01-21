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
       
    },
    img:{
        type:String
    
    },

    url:{
        type:String,
        unique:true
    }
})

module.exports = mongoose.model('Recipe',recipeSchema);

