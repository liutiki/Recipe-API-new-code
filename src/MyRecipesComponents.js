import check from './check.png';


function MyRecipesComponents ({label, image, calories, ingredients}){
    return(
        <div className="elements">
         
            <h2>{label}</h2>
            <img src={image} alt="avocado"/>

            <ul className="list">
          {ingredients.map((ingredient,index) =>(
                    <li key={index}><img src={check} width="30px" alt="picrure"/>{ingredient}</li>
                ))}
            </ul>
            <p className="calories">{calories.toFixed()} calories</p>
          
       
          
        </div>
    )
}

export default MyRecipesComponents;