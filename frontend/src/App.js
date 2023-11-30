import './App.css';
import Router from './components/Router'
import Context from './components/Context'

function App() {
  return (
    <div>
      <Context.Provider>
        <Router />
      </Context.Provider>
    </div>
  );
}

export default App;
