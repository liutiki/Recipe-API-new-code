import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import video from './food.mp4';
import MyRecipesComponents from './MyRecipesComponents';


function App() {

  
  const MY_ID ="7db37a7d";
  const MY_KEY ="99a0d673db19e9470bfee79d4dae6b64";

  


const [mySearch,setMySearch]=useState("");
const [myRecipes, setMyRecipes]=useState([]);
const [wordSubmitted,setWordSubmitted]=useState ('avocado');


  useEffect(() =>{
    const getRecipe=async() =>{
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=99a0d673db19e9470bfee79d4dae6b64`);
      const data=await response.json();
      console.log(data.hits);
      setMyRecipes(data.hits);
    }
    getRecipe()
  }, [wordSubmitted])


const myRecipeSearch = (e) => {
  console.log(e.target.value);
setMySearch(e.target.value)
}

const finalSearch=(e)=> {
   e.preventDefault()
setWordSubmitted(mySearch)
}




  return (
    <div className="App">

    <div className="container">
  
    <video autoPlay muted loop>
  
     <source src={video} type="video/mp4" />
  
  </video>
  
    <h1>Find a Recipe</h1>
    
  
    </div>

    <div className='container'>
      <form onSubmit={finalSearch}>
        <input className='search' placeholder='Search...'onChange={myRecipeSearch} value={mySearch}></input>
            </form>
  </div>
  <div className="container">
    <button onClick={finalSearch}>
      <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
    </button>
  </div>


  {myRecipes.map ((item, index) => (
  <MyRecipesComponents key={index}label={item.recipe.label}
                       image={item.recipe.image} 
                       calories={item.recipe.calories}
                       ingredients ={item.recipe.ingredientLines}/> 
))}
  </div>
  );
}

export default App;
