import React from "react";

const Recipe = ({ recipe, deselectRecipe }) => {
  const { title, calories, description, photo, tags = [], chef } = recipe;

  return (
    <article className="recipe">
      <header className="recipe-header">
        <button className="close" onClick={deselectRecipe}>
          x
        </button>
        <h2>{title}</h2>
        {!!chef && <p className="subheading">By {chef}</p>}
      </header>
      {!!photo && <img src={photo} alt={title} width={400} />}
      <p>{description}</p>
      <footer className="recipe-footer">
        <p>Calories: {calories}kCal</p>
        {tags.length > 0 && (
          <div>
            {tags.map(tag => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <button onClick={deselectRecipe} className="back">
          Back to Recipes{" "}
        </button>
      </footer>
    </article>
  );
};

export default Recipe;
