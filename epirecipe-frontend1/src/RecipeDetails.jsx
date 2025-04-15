import React from 'react';
import './RecipeDetails.css'; // Ensure styles are imported

const RecipeDetails = ({ recipe, onClose }) => {
    return (
        <div className="recipe-modal" role="dialog" aria-labelledby="recipe-title" aria-modal="true">
            <div className="recipe-details">
                <button className="close-button" onClick={onClose} aria-label="Close details">✖️</button>
                <h2 id="recipe-title">{recipe.title}</h2>
                <div className="recipe-info">
                    <p><strong>Calories:</strong> {recipe.calories || 'N/A'}</p>
                    <p><strong>Protein:</strong> {recipe.protein || 'N/A'}g</p>
                    <p><strong>Fat:</strong> {recipe.fat || 'N/A'}g</p>
                    <p><strong>Sodium:</strong> {recipe.sodium || 'N/A'}mg</p>
                    <p><strong>Rating:</strong> {recipe.rating || 'N/A'} / 5</p>
                    <p><strong>Description:</strong> {recipe.desc || 'N/A'}</p>
                    <p><strong>Directions:</strong> {recipe.directions || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
