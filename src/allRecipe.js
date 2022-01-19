import {React,useState} from 'react'
import axios from 'axios';
import Recipe from './recipe';
import FlashMessage from 'react-flash-message'
const AllRecipe = ({title,calories,ingredients,img,setRecipe})=>{
    const [show,setShow] = useState(true)
    const [flash,setFlash] = useState(false)
    const [message,setMessage] = useState("")
    

    const save = ()=>{
        const newRecipe = {
            name: title,
            calories:calories,
            ingredients: ingredients,
             img: img
        }
        

        
        try{
        axios.post("http://localhost:3001/recipes/",newRecipe)
        .then((()=>{setShow(false)
           setMessage( `${newRecipe.name} has been succesfully saved`)
           console.log("This is the message " + message)
        }));
        
        
        }catch(err){
            console.log(err)
            setMessage("There was an error saving this recipe")
        }
        setFlash(true)
        
    }
    return(
        
        <div>
            {show &&
                <div class = "card m-5">
                <h1>{message}</h1>
           <Recipe
               title = {title}
               calories = {calories}
               ingredients = {ingredients}
               img = {img}
            />
           
            <button class = "btn btn-primary" onClick={save}   >Save Recipe</button>
           
            </div>
            }
            {setFlash &&
            <div class="alert alert-primary" role="alert" >
                Message
            </div>

        }

        


          
        </div>



        
        
    );
}
export default AllRecipe