import React from 'react'
import Recipe from './recipe';
import getRecipes from '../App';
import axios from 'axios';

const SavedRecipe = ({id,title,calories,ingredients,img,deleteRecipe})=>{
    

//    async function deleteRecipe(){
//       try{
//         axios.delete(`http://localhost:3001/recipes/${id}`)
        
//         .then(setSaved(saved.filter( s => s.id !== id)))
//         this.forceUpdate()
//         }catch(err){
//             console.log(err)
//         }
//     }
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