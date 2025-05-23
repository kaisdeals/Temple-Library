import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';
import './styles/styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <AppRouter loggedIn={loggedIn} />

    </div> 
  );
}

export default App;
