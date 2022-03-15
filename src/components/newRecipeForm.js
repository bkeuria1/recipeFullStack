import {React,useState,useEffect} from 'react'
import axios from 'axios';
//const mongoose = require('mongoose')
const NewRecipeForm = ()=>{
    const [recipe, setRecipe] = useState('')
    const [ingredients,setIngredients] = useState('')
    const [calories,setCalories] = useState(0)
    const [restrictions, setRestrictions] = useState('')

    async function save(){
        const newRecipe = {
            name: recipe,
            calories:calories,
            ingredients: [ingredients],
            cautions: [restrictions],
        }
        
        console.log(newRecipe.url)
        try{
            console.log("Saved was clicked")
            const response = await axios.post("http://localhost:3001/recipes/",newRecipe, {withCredentials:true})
            console.log("HERE IS THE RESPONSE: "+response)
           
            //setShow(false)
           // console.log(show)
            //setMessage( `${newRecipe.name} has been succesfully saved`)
            //setType("alert alert-success")
           // console.log("This is the message " + message)
        
        }catch(err){
            const o = JSON.stringify(err)

            let status = JSON.parse(o).status
            if(status === 401){
               // setMessage("You need to be signed in")
            }else if(status === 400){
                //setMessage("You alreay saved this recipe")
            }
    
           
        }
    
        
        
    }

  

    return (

        <div>
            <form>
            <div class = "form-group">
                <label>Recipe Name</label>
                <input type="text" 
                class="form-control"
                defaultValue = {recipe}
                onChange = {(e)=>
                    
                    setRecipe(e.target.value)
                }
                ></input>
            </div>
            <div class = "form-group">
                <label>Ingredients</label>
                <input type="text" class="form-control"

                    defaultValue = {ingredients}
                    onChange = {(e)=>
                    setIngredients(e.target.value)
                    }
                ></input>
            </div>  
            <div class = "form-group">
                <label>Calories</label>
                <input type="number"
                 class="form-control"
                 defaultValue = {calories}
                 onChange = {(e)=>
                    
                setCalories(e.target.value)
                 }
                 ></input>
            </div>

            <div class = "form-group">
                <label>Dietary Restrictions?</label>
                <input type="text" class="form-control"
                 defaultValue = {restrictions}
                 onChange = {(e)=> 
                setRestrictions(e.target.value)
                 }
                ></input>
            </div>  
            </form>
            <button class = "btn btn-primary" onClick = {save}>Save</button>
        </div>        
    )

}
export default NewRecipeForm