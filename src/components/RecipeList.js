import React from "react";

const RecipeList = ({ recipes, selectRecipe }) => {
  return (
    <section className="recipe-cards">
      {recipes.map(recipe => {
        const { id, title, photo } = recipe;
        return (
          <div
            className="recipe-card"
            key={id}
            onClick={() => selectRecipe(recipe)}
          >
            <h2>{title}</h2>
            <img src={photo} alt={title} width={200} />
          </div>
        );
      })}
    </section>
  );
};

export default RecipeList;
