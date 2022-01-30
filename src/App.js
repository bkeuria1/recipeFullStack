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

  

  // useEffect (()=> {
    
  //   console.log("query is "+query)
  //     getRecipes()
  // },[query,label,...saved]);

  useDeepCompareEffect(()=>{
    console.log("Saved could be deleted")
    getRecipes()
    console.log(saved)
  }, [query,label,saved,recipes])

  const getRecipes = async ()=>{
    //setRecipes([])
   
    
    let response
    if(label === "All Recipes"){
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

  const updateSearch = (e)=>{
    setSearch(e.target.value)
  }
  const getSearch = (e)=>{
    e.preventDefault()
  
    setQuery(search)
  }


  async function deleteRecipe(id){
    try{
      axios.delete(`http://localhost:3001/recipes/${id}`)
      
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
          <option label = "Saved Recipes" value = "Saved Recipes"/>
          


        </select>
      
        <button type = "submit" className = 'btn btn-primary'>Search</button>
      </form>

      <a href='http://localhost:3001/auth/google' class = "btn btn-primary">Sign in</a>

      <a href='http://localhost:3001/logout' class = "btn btn-danger">Logout</a>

           

    { label === "Saved Recipes" &&
        <div class = "">
          { saved.length > 0  ?(

          <div class = "">
          {saved.map(r=>(
          
              <SavedRecipe 
              deleteRecipe = {deleteRecipe}
              saved = {saved}
              setSaved = {setSaved}
              id =  {r._id}
              title = {r.name} 
              calories = { r.calories} 
              img = { r.img} 
              ingredients = { r.ingredients}
              />
              
          ))}
          </div>
          ):(<div>
            <h1> No Recipes Found</h1>
          </div>)}
          </div>
      }

    { label === "All Recipes" &&
        <div>
          { recipes.length>0 ?(

          <div class = "card">
          {recipes.map(r=>(
              <AllRecipe 
              recipes = {recipes}
              setRecipes = {setRecipes}
              title = {r.recipe.label} 
              calories = { r.recipe.calories} 
              img = { r.recipe.image} 
              ingredients = { r.recipe.ingredients}
              url = {r.recipe.url}
              />
              
          ))}
          </div>
          ):(<div>
            <h1>No Recipes Found</h1>
          </div>)}
          </div>
      }
        </div>
      )


    }

export default App;
