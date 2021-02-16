import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Pages/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard}/>
          </Switch>
        </div>
      </BrowserRouter>                
  );
}

export default App;
