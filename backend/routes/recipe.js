const { type } = require('@testing-library/user-event/dist/type');
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    next();
  });
router.post('/',  async (req,res)=>{
    
    const name = req.body.name
    console.log("The request is "+req.body)
    const calories = req.body.calories;
    const ingredients = req.body.ingredients;
    const img = req.body.img


    const newRecipe = new Recipe({
        
       name,
        calories,
        ingredients,
        img
    
    
    })
    console.log(newRecipe)
    try{
       const savedRecipe = await newRecipe.save()
       console.log("THE NEW SAVED RECIPE ID IS: "+ savedRecipe.id)
       res.json()
        
    }catch(err){
        console.log(err)
        res.json()
    }

   

})

router.get("/", async (req,res)=>{
      
    let recipes
    let searchOptions = {}


    searchOptions.name = new RegExp(req.query.name, 'i')
    console.log(JSON.stringify(req.query) + "is the req.query")
    try{
        
        let recipes 
        console.log(typeof req.query)
        if(typeof req.query === 'undefined' ){
            recipes = await Recipe.find()
        }else{  
        recipes = await Recipe.find(searchOptions).limit(10)
        }

        res.json(recipes)
    }catch(err){
        console.log(err)

    }

})



router.delete('/:id', async(req,res)=>{
    try{
        console.log(req.params.id)
        
        await Recipe.findByIdAndDelete(req.params.id)
        res.send()
    }catch(err){
        console.log(err)
    }
})




module.exports = router