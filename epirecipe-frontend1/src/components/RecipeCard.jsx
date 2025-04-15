import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import './RecipeCard.css';

function RecipeCard({ recipe, onClick }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon filled-star" />);
    }

    // Render half star
    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="star-icon filled-star" />);
    }

    // Render empty stars
    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<FontAwesomeIcon key={i + 'empty'} icon={faStar} className="star-icon empty-star" />);
    }

    return stars;
  };

  return (
    <div className="recipe-card" onClick={onClick}>
      <h2>{recipe.title}</h2>
      <p><strong>Categories:</strong> {Array.isArray(recipe.categories) ? recipe.categories.join(', ') : 'N/A'}</p>
      <p><strong>Rating:</strong> {renderStars(recipe.rating || 0)} {recipe.rating || 'No Rating'}</p>
      <p><strong>Ingredients:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : 'No Ingredients Listed'}</p>
    </div>
  );
}

export default RecipeCard;
