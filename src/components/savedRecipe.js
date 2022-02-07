import React from 'react'
import Recipe from './recipe';
import Caution from './caution';


const SavedRecipe = ({id,title,calories,ingredients,img,deleteRecipe,cautions})=>{
    
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
                cautions = {cautions}
            />
                 
            <button onClick={deleteItem}  class = "btn btn-danger" >Delete Recipe</button>
       

          
        </div>
    );
}
export default SavedRecipe