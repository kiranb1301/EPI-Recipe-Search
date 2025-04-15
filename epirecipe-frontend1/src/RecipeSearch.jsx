import React, { useState } from 'react';
import axios from 'axios';
import RecipeDetails from './RecipeDetails'; // Import RecipeDetails
import RecipeCard from './components/RecipeCard';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    calories: '',
    protein: '',
    fat: '',
    sodium: '',
    rating: ''
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold selected recipe
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Prevent search if input is empty
    setLoading(true); // Set loading state
    setError(null); // Reset error state
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/recipes/search/?q=${searchTerm}`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Error fetching recipes. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = async () => {
    const { calories, protein, fat, sodium, rating } = filters;
    const filterUrl = new URL(`http://127.0.0.1:8000/api/recipes/filter/?q=${searchTerm}`);

    if (calories) filterUrl.searchParams.append('calories', calories);
    if (protein) filterUrl.searchParams.append('protein', protein);
    if (fat) filterUrl.searchParams.append('fat', fat);
    if (sodium) filterUrl.searchParams.append('sodium', sodium);
    if (rating) filterUrl.searchParams.append('rating', rating);

    setLoading(true); // Set loading state
    setError(null); // Reset error state
    try {
      const response = await axios.get(filterUrl);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
      setError('Error fetching filtered recipes. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set selected recipe
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null); // Clear selected recipe
  };

  return (
    <div className="recipe-search-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="filters">
        <h2>Filters</h2>
        <input type="number" name="calories" placeholder="Max Calories" value={filters.calories} onChange={handleFilterChange} />
        <input type="number" name="protein" placeholder="Max Protein" value={filters.protein} onChange={handleFilterChange} />
        <input type="number" name="fat" placeholder="Max Fat" value={filters.fat} onChange={handleFilterChange} />
        <input type="number" name="sodium" placeholder="Max Sodium" value={filters.sodium} onChange={handleFilterChange} />
        <input type="number" name="rating" placeholder="Close Rating" value={filters.rating} onChange={handleFilterChange} />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div id="recipes" className="recipe-results">
        {loading && <p>Loading recipes...</p>} {/* Loading indicator */}
        {error && <p className="error-message">{error}</p>} {/* Error message */}
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onClick={() => handleRecipeClick(recipe)} 
            />
          ))
        ) : (
          !loading && <p>No recipes found.</p> // Show message only when not loading
        )}
      </div>

      {selectedRecipe && (
        <RecipeDetails recipe={selectedRecipe} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default RecipeSearch;
