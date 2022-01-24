import React from 'react'
import FlashMessage from 'react-flash-message'

const Recipe = ({title,calories,ingredients,img})=>{


   
    return(
        
        <div class = "card-body">
        
            <h1 class="card-title">{title}</h1>
            <p class ="card-text">Calories: {calories}</p>
            <img class="rounded float-left" src={img} alt = '' ></img>
            <ol>
                {ingredients.map((ingredient)=>(
                    <ul>{ingredient.text}</ul>
                ))}
                
            </ol>  
        </div>
        
    );
}
export default Recipe