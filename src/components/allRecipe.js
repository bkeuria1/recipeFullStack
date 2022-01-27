import {React,useState,useEffect} from 'react'
import axios from 'axios';
import Recipe from './recipe';
const AllRecipe = ({title,calories,ingredients,img,url})=>{
    const [show,setShow] = useState(true)
    const [flash,setFlash] = useState(false)
    const [type, setType] = useState("alert alert-primary" )
    const [message,setMessage] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
           setFlash(false);
         }, 3000);
     
        return () => clearTimeout(timeout);
       },[flash]);
    

    async function save(){
        const newRecipe = {
            name: title,
            calories:calories,
            ingredients: ingredients,
            img: img,
            url: url
        }
        try{
            console.log("Saved was clicked")
            await axios.post("http://localhost:3001/recipes/",newRecipe)
      
            setShow(false)
       
            //setShow(false)
            console.log(show)
            setMessage( `${newRecipe.name} has been succesfully saved`)
            setType("alert alert-success")
            console.log("This is the message " + message)
        
        }catch(err){
            console.log(err)
            setMessage("There was an error saving this report")

            setType("alert alert-danger")
        }
        setFlash(true)
        
    }
    return(
        
        <div>
            {show &&
                <div class = "card m-5">
                
           <Recipe
               title = {title}
               calories = {calories}
               ingredients = {ingredients}
               img = {img}
            />
           
            <button class = "btn btn-primary" onClick={save}   >Save Recipe</button>
           
            </div>
            }
            {flash &&  (
                <div class={type} role="alert" >
                    {message}
                </div>

            )}

        </div>



        
        
    );
}
export default AllRecipe