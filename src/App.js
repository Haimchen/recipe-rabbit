import * as React from "react";
import "./App.css";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import transformRecipes from "./helpers/transformRecipes";
const { useState, useEffect } = React;

const Error = error => (
  <div> There was an error fetching recipes. :-( {error.message}</div>
);

const Loading = () => <div>...loading...</div>;

const mock = [
  {
    id: 134,
    title: "Borschtsch",
    description: "adwhhgdh",
    photo:
      "https://image.brigitte.de/11576686/large1x1-622-622/2509fe50b8169df68affbca9603f9ec8/Mq/pizza-margherita.jpg",
    tags: ["vegan"],
    chef: "Gault Millau"
  },
  {
    id: 174,
    title: "Spagetthi Carbonara mit Pilzen und Sauce",
    description: "adwhhgdh",
    photo:
      "https://image.brigitte.de/11576686/large1x1-622-622/2509fe50b8169df68affbca9603f9ec8/Mq/pizza-margherita.jpg"
  },
  {
    id: 138,
    title: "Pizza",
    description: "adwhhgdh",
    tags: ["vegan", "cheap", "easy"]
  }
];

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRecipe, selectRecipe] = useState(null);

  const deselectRecipe = () => selectRecipe(null);

  useEffect(() => {
    recipes.length === 0 &&
      fetch(
        "https://cdn.contentful.com/spaces/kk2bw5ojx476/environments/master/entries?content_type=recipe&include=3",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer 7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c",
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(json => setRecipes(transformRecipes(json)))
        .catch(e => console.error("error!", e) || setError(e));
  });

  const loading = !recipes.length;
  const hasError = !!error;
  const renderData = () => (
    <React.Fragment>{loading ? <Loading /> : renderRecipes()}</React.Fragment>
  );

  const renderRecipes = () => (
    <React.Fragment>
      {!selectedRecipe && (
        <RecipeList recipes={recipes} selectRecipe={selectRecipe} />
      )}
      {selectedRecipe && (
        <Recipe recipe={selectedRecipe} deselectRecipe={deselectRecipe} />
      )}
    </React.Fragment>
  );

  return (
    <div className="App">
      <header className="main-header">
        <h1>Recipe Rabbit</h1>
        <div>What do you want to eat tonight?</div>
      </header>
      {hasError ? <Error error={error} /> : renderData()}
    </div>
  );
}

export default App;
