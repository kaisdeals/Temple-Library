import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';
import './styles/styles.css';
import './styles/BookReturnForm.css';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <AppRouter loggedIn={isLoggedIn} />

    </div> 
  );
}

export default App;
