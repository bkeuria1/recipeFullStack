const mongoose = require('mongoose')

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
    },
    cautions:{
        type: [Object]
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    }
})

module.exports = mongoose.model('Recipe',recipeSchema);

