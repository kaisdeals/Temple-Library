import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/checkout');
  };
  return (
    <section class="hero">
    <div class="container">
          <img src="https://via.placeholder.com/600x300.png?text=Temple+Library" 
           alt="Temple Library" 
           class="hero-image" />

      <h2>Welcome to Our Temple Library</h2>
      <p>Explore a world of sacred stories, playful learning, and timeless wisdom.</p>
      <nav className="main-nav">
          <button onClick={handleNavigate} className="btn-text">
            Open Book Checkout Form
          </button>
        </nav>
    </div>
  </section>
    );
}

export default Hero;