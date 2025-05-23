import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/return');
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1>GOD Kids Library</h1>
        <p className="tagline">Preserving knowledge with devotion</p>
        <nav className="main-nav">
          <button onClick={handleNavigate} className="btn-text">
            Open Book Return Form
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
