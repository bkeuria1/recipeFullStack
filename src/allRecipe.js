import {React,useState} from 'react'
import axios from 'axios';
import Recipe from './recipe';
const AllRecipe = ({title,calories,ingredients,img,setRecipe})=>{
    const [show,setShow] = useState(true)


    const save = ()=>{
        const newRecipe = {
            name: title,
            calories:calories,
            ingredients: ingredients,
             img: img
        }
        

        
        try{
        axios.post("http://localhost:3001/recipes/",newRecipe)
        .then(setShow(false));
        
        console.log("This is the")
        }catch(err){
            console.log(err)
        }
    }
    return(
        
        <div class = "card m-5">
            {show &&
                <div>
           <Recipe
               title = {title}
               calories = {calories}
               ingredients = {ingredients}
               img = {img}
            />
            <button class = "btn btn-primary" onClick={save}   >Save Recipe</button>
            </div>
            }
          
        </div>
        
        
    );
}
export default AllRecipe