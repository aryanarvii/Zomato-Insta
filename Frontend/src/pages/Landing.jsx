import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Amazing Food</h1>
          <p className="hero-subtitle">
            Explore delicious recipes, find new favorites, and connect with local food creators
          </p>
        </div>
        
        <div className="hero-actions">
          <Link to="/user/login" className="cta-button primary">
            Start Exploring
          </Link>
          <Link to="/register" className="cta-button secondary">
            Join as Food Partner
          </Link>
        </div>
      </div>

      <div className="landing-features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Discover Food</h3>
            <p>Browse through endless food reels and find your next favorite dish</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3>Food Partners</h3>
            <p>Connect with local chefs and food creators in your area</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Save Favorites</h3>
            <p>Bookmark recipes and dishes you love for easy access later</p>
          </div>
        </div>
      </div>

      <div className="landing-footer">
        <div className="auth-links">
          <Link to="/user/login" className="auth-link">
            User Login
          </Link>
          <Link to="/food-partner/login" className="auth-link">
            Partner Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
