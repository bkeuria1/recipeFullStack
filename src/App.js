import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from "react"
import Recipe from './recipe';

const App = ()=>{
  const APP_ID = 'a22af218'
  const APP_KEY = '40cbdd2bd7236baa3c94dd1ba0cdb35f'

  const request = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=a22af218&app_key=40cbdd2bd7236baa3c94dd1ba0cdb35f'

  const [recipes,setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query,setQuery] = useState('')
  useEffect (()=> {
    getRecipes()
  },[query]);
  
  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=a22af218&app_key=40cbdd2bd7236baa3c94dd1ba0cdb35f`);
    const data = await response.json();
    console.log(data)
    setRecipes(data.hits)
    
    

  };

  const updateSearch = (e)=>{
    setSearch(e.target.value)
  }
  const getSearch = (e)=>{
    e.preventDefault()
    setQuery(search)
  }
  return (
    <div className = "App">
      <form onSubmit = {getSearch} className='search-form'>

        <input type = "text" className = 'search-bar' onChange={updateSearch} value = {search}/>
        <button type = "submit" className = 'search-button'>Search</button>
      </form>
      <div class = "recipes">
      {recipes.map(recipe=>(
          <Recipe title = 
          {recipe.recipe.label} 
          calories = {recipe.recipe.calories} 
          img = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
          />
          
      ))}
      </div>

    </div>
  )


}

export default App;
