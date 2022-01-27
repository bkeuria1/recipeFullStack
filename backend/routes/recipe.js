const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
// const { ensureAuth } = require('../middleware/auth')

router.post('/', async (req,res)=>{
    
    const name = req.body.name
    console.log("The request is "+req.body)
    const calories = req.body.calories;
    const ingredients = req.body.ingredients;
    const img = req.body.img
    const url = req.body.url
    //const user = req.user.id


    const newRecipe = new Recipe({
        
        name : name,
        calories: calories,
        ingredients: ingredients,
        img:img,
        url: url
        //user: user
    
    
    })
    console.log(newRecipe)
    try{
       const savedRecipe = await newRecipe.save()
       console.log("THE NEW SAVED RECIPE ID IS: "+ savedRecipe.id)
    
       console.log(res.json())
       
        
    }catch(err){
        console.log(err)
        res.statusCode = 400
        res.send("ERROR:" + err)
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
       
        recipes = await Recipe.find(searchOptions)
        

        res.json(recipes)
    }catch(err){
        console.log(err)
        res.statusCode = 400
        res.send()
        

    }

})



router.delete('/:id', async(req,res)=>{
    try{
        console.log(req.params.id)
        
        await Recipe.findByIdAndDelete(req.params.id)
        res.send()
    }catch(err){
        console.log(err)
        res.statusCode = 400
        res.send()
    }
})




module.exports = router