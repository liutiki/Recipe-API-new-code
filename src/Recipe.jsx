import check from './check.png'

function Recipe(props) {
  const { label, image, ingredients, instructions } = props.recipe

  return (
    <div className="elements">
      <h2>{label}</h2>
      <img src={image} alt="avocado" />

      <h2>Ingredients:</h2>
      <ul className="list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <img src={check} width="30px" alt="picture" />
            {ingredient.name} : {ingredient.measure}
          </li>
        ))}
      </ul>

      <h2>Instructions:</h2>
      <ul className="list">
        {instructions.map((instructionLine, index) => (
          <li key={index}>{instructionLine}</li>
        ))}
      </ul>
    </div>
  )
}

export default Recipe
