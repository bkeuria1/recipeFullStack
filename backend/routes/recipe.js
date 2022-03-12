const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const passport = require('passport')

const {ensureAuth}  = require('../middleware/auth')
require('../passport')(passport)

router.post('/', ensureAuth, async (req,res)=>{
    console.log("The current user is: "+ req.user)
    const name = req.body.name
    const calories = req.body.calories;
    const ingredients = req.body.ingredients;
    const img = req.body.img
    const url = req.body.url
    const cautions = req.body.cautions

    //const user = req.user.id

    const newRecipe = new Recipe({
        name : name,
        calories: calories,
        ingredients: ingredients,
        img:img,
        url: url,
        user: req.user,
        cautions: cautions

    
    })
    console.log(newRecipe)
    try{
       const savedRecipe = await newRecipe.save()
       console.log("THE NEW SAVED RECIPE ID IS: "+ savedRecipe.id)
       return res.json()    
    }catch(err){
        console.log("WE GOT AN ERROR")
        console.log(err)
        res.statusCode = 400
        res.send("ERROR:" + err)
    }
})

router.get("/",ensureAuth,async (req,res)=>{
      
    let recipes
    let searchOptions = {}


    searchOptions.name = new RegExp(req.query.name, 'i')
    searchOptions.googleId = req.user.googleId
    console.log(JSON.stringify(req.query) + "is the req.query")
    console.log(JSON.stringify(searchOptions))
    try{
        let recipes 
        console.log(typeof req.query)
        recipes = await Recipe.find({name:  new RegExp(req.query.name, 'i'), user: req.user})
        res.json(recipes)
    }catch(err){
        console.log(err)
        res.statusCode = 400
        res.send()
    }
})

router.delete('/:id', ensureAuth, async(req,res)=>{
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