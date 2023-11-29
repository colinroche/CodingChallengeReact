import './App.css';
import Router from './components/Router'
import Context from './components/Context'

function App() {
  const countryInfo = {
    name: "Ireland"
  }

  return (
    <div>
      <Context.Provider value={countryInfo}>
        <Router />
      </Context.Provider>
    </div>
  );
}

export default App;
