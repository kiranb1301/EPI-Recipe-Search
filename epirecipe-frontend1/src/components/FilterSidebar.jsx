import React, { useState } from 'react';
import '../styles/FilterSidebar.css';

function FilterSidebar({ onFilterChange, applyFilters }) {
  const [filter, setFilter] = useState({
    calories: '',
    protein: [0, 100],
    fat: [0, 100],
    sodium: [0, 100],
    rating: [0, 5],
    category: '' // Initialize category
  });

  const handleSliderChange = (name, value) => {
    const updatedFilter = {
      ...filter,
      [name]: value,
    };
    setFilter(updatedFilter);
    onFilterChange(updatedFilter);  // Send filters back to parent component (RecipeSearch)
  };

  const handleCategoryChange = (e) => {
    const updatedFilter = {
      ...filter,
      category: e.target.value,
    };
    setFilter(updatedFilter);
    onFilterChange(updatedFilter);
  };

  return (
    <div className="filter-sidebar">
      <h2>Filters</h2>

      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={filter.category}
          onChange={handleCategoryChange}
        />
      </div>

      <div>
        <label>Calories</label>
        <input
          type="number"
          min="0"
          value={filter.calories}
          onChange={(e) => handleSliderChange('calories', e.target.value)}
        />
      </div>

      <div>
        <label>Protein (g)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filter.protein[0]}
          onChange={(e) => handleSliderChange('protein', [parseInt(e.target.value), filter.protein[1]])}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={filter.protein[1]}
          onChange={(e) => handleSliderChange('protein', [filter.protein[0], parseInt(e.target.value)])}
        />
        <span>{filter.protein[0]}g - {filter.protein[1]}g</span>
      </div>

      <div>
        <label>Fat (g)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filter.fat[0]}
          onChange={(e) => handleSliderChange('fat', [parseInt(e.target.value), filter.fat[1]])}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={filter.fat[1]}
          onChange={(e) => handleSliderChange('fat', [filter.fat[0], parseInt(e.target.value)])}
        />
        <span>{filter.fat[0]}g - {filter.fat[1]}g</span>
      </div>

      <div>
        <label>Sodium (mg)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filter.sodium[0]}
          onChange={(e) => handleSliderChange('sodium', [parseInt(e.target.value), filter.sodium[1]])}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={filter.sodium[1]}
          onChange={(e) => handleSliderChange('sodium', [filter.sodium[0], parseInt(e.target.value)])}
        />
        <span>{filter.sodium[0]}mg - {filter.sodium[1]}mg</span>
      </div>

      <div>
        <label>Rating</label>
        <input
          type="range"
          min="0"
          max="5"
          value={filter.rating[0]}
          onChange={(e) => handleSliderChange('rating', [parseInt(e.target.value), filter.rating[1]])}
        />
        <input
          type="range"
          min="0"
          max="5"
          value={filter.rating[1]}
          onChange={(e) => handleSliderChange('rating', [filter.rating[0], parseInt(e.target.value)])}
        />
        <span>{filter.rating[0]} - {filter.rating[1]}</span>
      </div>

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}

export default FilterSidebar;
