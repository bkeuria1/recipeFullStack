import {React,useState,useEffect} from 'react'
import FlashMessage from 'react-flash-message'
import Caution from './caution.js'

const Recipe = ({title,calories,ingredients,img,cautions})=>{

    return(
        
        <div class = "card-body">
            { cautions.length>0 &&
                <Caution cautions = {cautions}></Caution>

            }
         
        
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