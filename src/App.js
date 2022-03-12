import React,{useEffect,useState} from "react"
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NewRecipeForm from "./components/newRecipeForm";
import ShowRecipes from "./components/showRecipes";
import NavBar from "./components/navBar";
const App = ()=>{
return(
  <Router>
    <Routes>

      <Route exact path="/" element={<NavBar />}/>
      <Route  index element={<ShowRecipes />} />
      <Route  path='new' element={<NewRecipeForm />} />
      
      
    </Routes>
  </Router>
)

}


export default App