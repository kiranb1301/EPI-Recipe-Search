import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import foodVideo from '../components/food.mp4'; // Adjust the import path as necessary

function Header({ setSearchQuery }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setSearchQuery(searchTerm);
            navigate(`/search/?query=${searchTerm}`);
        } else {
            alert('Please enter a search term');
        }
    };

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsSticky(scrollTop > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`header ${isSticky ? 'sticky' : ''}`}>
            {/* Video Background */}
            <video autoPlay loop muted className="header-video">
                <source src={foodVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            <div className="header-left" onClick={() => navigate('/')}>
                <img src="/logo.png" alt="AviRecipe Logo" className="logo" />
                <h1 className="logo-title">AviRecipe</h1>
            </div>
            <div className="header-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipes..."
                    aria-label="Search Recipes"
                    className="search-input"
                />
                <button onClick={handleSearch} aria-label="Search" className="search-button">Search</button>
            </div>
            <div className="header-right">
                <button onClick={() => navigate('/')} aria-label="Home" className="nav-button">Home</button>
                <button onClick={() => navigate('/about')} aria-label="About Me" className="nav-button">About Me</button>
            </div>
        </header>
    );
}

export default Header;
