import { useState, useEffect } from 'react'
import './App.css'
import video from './artichoke.mp4'
import Recipe from './Recipe'

function App() {
  const [searchString, setSearchString] = useState('avocado')
  const [recipes, setRecipies] = useState([])

  async function fetchRecipes(searchValue) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchValue)}`

    const response = await fetch(url)
    const responseData = await response.json()

    // if response is null we will use empty array
    const dataMeals = responseData.meals || []
    if (dataMeals.length === 0) {
      return
    }

    // initialize new array of mapped recipes
    const mappedRecipies = []

    dataMeals.forEach(dataMeal => {
      // create new meal object
      const recipe = {
        label: dataMeal.strMeal,
        cousine: dataMeal.strArea,
        image: dataMeal.strMealThumb,
      }

      // map and attach ingredients
      const ingredients = []
      Object.keys(dataMeal)
        .filter(key => key.startsWith('strIngredient'))
        .forEach((key, index) => {
          const ingredientName = dataMeal[key]

          const ingredientMeasure = dataMeal[`strMeasure${index + 1}`]
          if (ingredientName) {
            ingredients.push({ name: ingredientName, measure: ingredientMeasure })
          }
        })
      recipe.ingredients = ingredients

      // split and attach new instructions to meal
      const instructions = dataMeal.strInstructions.split('\r\n')

      // remove empty lines and attach instructions to recipe
      recipe.instructions = instructions.filter(line => line !== '')

      // add the mapped recipe to the result recipes
      mappedRecipies.push(recipe)
    })

    setRecipies(mappedRecipies)
  }

  function search(e) {
    e?.preventDefault()
    fetchRecipes(searchString)
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <div className="App">
      <div>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="position-fixed">
          <h1 className="header">Find a recipe</h1>

          <div className="form-container">
            <form onSubmit={search}>
              <input className="search" placeholder="Search..." onChange={e => setSearchString(e.target.value)} value={searchString} />

              <button type="submit" className="btn">
                <img src="https://img.icons8.com/fluency/48/000000/fry.png" width="34px" alt="icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="recipe">
        {recipes?.length === 0 ? 'No recipes found' : recipes.map(recipe => <Recipe key={recipe.label} recipe={recipe} />)}
      </div>
    </div>
  )
}

export default App
