import React from 'react'
import Recipe from './recipe';


const SavedRecipe = ({id,title,calories,ingredients,img,deleteRecipe})=>{
    
    const deleteItem = ()=>{
        deleteRecipe(id)
    }
    return(
        <div class = "card m-5">
        
        <Recipe
               title = {title}
               calories = {calories}
               ingredients = {ingredients}
               img = {img}
            />
                 
        <button onClick={deleteItem}  class = "btn btn-danger" >Delete Recipe</button>
       

          
        </div>
    );
}
export default SavedRecipe