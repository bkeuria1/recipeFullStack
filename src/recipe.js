import React from 'react'

const Recipe = ({title,calories,img,ingredients})=>{
    return(
        <div>
            <h1>{title}</h1>
            <p>{calories}</p>
            <img src={img} alt = '' ></img>
            <ol>
                {ingredients.map((ingredient)=>(
                    <ul>{ingredient.text}</ul>
                ))}
                <button>Click me</button>
            </ol>

          
        </div>
    );
}
export default Recipe