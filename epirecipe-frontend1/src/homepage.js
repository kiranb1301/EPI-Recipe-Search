// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import '../styles/HomePage.css';

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                if (searchQuery) {
                    const response = await axios.get('http://localhost:5000/search/title/', {
                        params: { title: searchQuery }
                    });
                    setRecipes(response.data.results);
                } else {
                    const response = await axios.get('http://localhost:5000/search/recipes/');
                    setRecipes(response.data.results);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, [searchQuery]);

    return (
        <div className="home-page">
            <Header setSearchQuery={setSearchQuery} />
            <div className="content">
                <div className="recipe-grid">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ) : (
                        <p>No recipes found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
