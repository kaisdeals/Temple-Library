import React from 'react';

const AppHeader = () => {
  return (
    <header class="site-header">
    <div class="container header-inner">
      <h1>GOD Kids Library</h1>
      <p class="tagline">Preserving knowledge with devotion</p>
      <nav class="main-nav">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfqeVYPeesAq_VxlzdRIrErAj8tpzg7vCCyH6ZQJbQpyBlUyQ/viewform?usp=header"
           class="btn-text" target="_blank">
          Open Book Return Form
        </a>
      </nav>
    </div>
  </header>
    );
}

export default AppHeader;