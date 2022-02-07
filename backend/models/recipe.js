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
        type:String
        
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
//make the combo of both the url and userID unique
recipeSchema.index({url:1, user:1},{unique:true})
module.exports = mongoose.model('Recipe',recipeSchema);

