import React from 'react';
import RecipeSearch from './RecipeSearch';
// Import custom Header when ready
// import Header from './Header';
import './App.css'; // Ensure styles for your header are in this file

const App = () => {
    return (
        <div className="app">
            {/* Temporary header until you integrate custom Header component */}
            <header className="header">
                <div className="header-left">
                    <img src="/logo.png" alt="AviRecipe Logo" className="logo" />
                    <h1 className="logo-title">AviRecipe</h1>
                </div>
                <nav className="nav">
                    <ul className="nav-links">
                        <li><a href="/" className="nav-link">Home</a></li>
                        <li><a href="/about" className="nav-link">About</a></li>
                        <li><a href="/contact" className="nav-link">Contact Us</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <RecipeSearch />
            </main>
        </div>
    );
};

export default App;
