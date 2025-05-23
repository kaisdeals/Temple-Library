import React from 'react';

const Hero = () => {
  return (
    <section class="hero">
    <div class="container">
          <img src="https://via.placeholder.com/600x300.png?text=Temple+Library" 
           alt="Temple Library" 
           class="hero-image" />

      <h2>Welcome to Our Temple Library</h2>
      <p>Explore a world of sacred stories, playful learning, and timeless wisdom.</p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSf1m-0k7-5E60aSM4K_KUQKq8cYDWR_61zlZf6h2DEYUSsxUw/viewform?usp=header"
         target="_blank"
         class="btn hero-btn">
        Access the Checkout Form
      </a>
    </div>
  </section>
    );
}

export default Hero;