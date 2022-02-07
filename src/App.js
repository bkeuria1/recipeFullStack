import './App.css';
import React,{useEffect,useState} from "react"
import AllRecipe from './components/allRecipe';
import SavedRecipe from './components/savedRecipe';
import useDeepCompareEffect from './hooks/useDeepCompareEffect';
import axios from 'axios';
const App = ()=>{


const [recipes,setRecipes] = useState([])
const [search, setSearch] = useState('')
const [query,setQuery] = useState('')
const [label,setLabel] = useState('All Recipes')
const [saved, setSaved] = useState([])
const [isLoggedIn, setLoggedIn] = useState(false)
const [name, setName] = useState('')

useEffect (()=>{
  checkLogin()
}, [])




useDeepCompareEffect(()=>{
  console.log("Saved could be deleted")
  getRecipes()
  console.log(saved)
}, [query,label,saved,recipes])

const getRecipes = async ()=>{

  
  let response
  if(label === "All Recipes"){
    console.log(sessionStorage)
    try{
      if(query !== ""){
        response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=a22af218&app_key=40cbdd2bd7236baa3c94dd1ba0cdb35f`);
        const data = await response.json();
        console.log(data)
        setRecipes(data.hits)
      }
    }catch(err){
      console.log(err)
    }
    
  }else{
    
    //need to use seperate
    console.log("other api")
    console.log(query)
  
    const res =  await fetch(`http://localhost:3001/recipes?name=${query}`, {
    credentials: 'include'
  })
    const data = await res.json()
    setSaved(data)
    
    
  }

};

const checkLogin = async () =>{
  const res = await axios.get( 'http://localhost:3001/loggedIn', {withCredentials:true})
  console.log( "Here is the data" + res.data.name)

  if(res.data.result ){
    
    setLoggedIn(true)
    setName(res.data.name)

  }else{
    setLoggedIn(false)
  }
  
}

const updateSearch = (e)=>{
  setSearch(e.target.value)
}
const getSearch = (e)=>{
  e.preventDefault()

  setQuery(search)
}


async function deleteRecipe(id){
  try{
    axios.delete(`http://localhost:3001/recipes/${id}`, {withCredentials:true})
    
    .then(setSaved(...saved.filter( s => s.id !== id)))
  
    }catch(err){
        console.log(err)
    }
}

const updateLabel = (e)=>{
  setRecipes([])
  setSaved([])
  console.log("label updated")
  console.log("The recipes are: " + saved)
  console.log(e.target.value)
  setLabel(e.target.value)
  
}
return (
  <div className = "">
    <form onSubmit = {getSearch} className='input-group'>

      <input type = "text" class= 'search-bar' onChange={updateSearch} value = {search}/>

      
        <select name = "result" onChange = {updateLabel}>
          <option selected label  = "All Recipes"  value = "All Recipes"  />
          { isLoggedIn &&
            <option label = "Saved Recipes" value = "Saved Recipes"/>
          }
          


        </select>
      <button type = "submit" className = 'btn btn-primary'>Search</button>
    </form>

    <div class = "">
    { isLoggedIn ?(
      <div>
        <h1>Welcome {name}!</h1>
        <a href='http://localhost:3001/logout' class = "btn btn-danger" >Logout</a>
        
      </div>
    ):(
      <div>
          <a href='http://localhost:3001/auth/google' class = "btn btn-primary">Sign in</a> 
      </div>
    )

    }
    </div>

    
    
    
          

  { label === "Saved Recipes" &&
      <div class = "">
        { saved.length > 0  ?(

        <div class = "">
          {saved.map(r=>(
          
              <SavedRecipe 
              deleteRecipe = {deleteRecipe}
              id =  {r._id}
              title = {r.name} 
              calories = { r.calories} 
              img = { r.img} 
              ingredients = { r.ingredients}
              cautions = {r.cautions}
              />
            
        ))}
        </div>
        ):(<div>
          <h1> No Recipes Found</h1>
        </div>)}
        </div>
    }

  { label === "All Recipes" &&
      <div class = "">
        { recipes.length>0 ?(

        <div class = "card">
        {recipes.map(r=>(
            <AllRecipe 
            recipes = {recipes}
            setRecipes = {setRecipes}
            title = {r.recipe.label} 
            calories = { Math.round(r.recipe.calories)} 
            img = { r.recipe.image} 
            ingredients = { r.recipe.ingredients}
            url = {r.recipe.url}
            cautions = {r.recipe.cautions}
            />
            
        ))}
        </div>
        ):(<div>
          <h1>No Recipes Found</h1>
        </div>)}
        </div>
    }
      </div> //end main div
    )  //end return
  }//end class


export default App;
