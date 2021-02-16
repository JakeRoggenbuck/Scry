import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Pages/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ActiveUsersDetail from './Components/Pages/ActiveUsers';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/active-users" component={ActiveUsersDetail}/>
          </Switch>
        </div>
      </BrowserRouter>                
  );
}

export default App;
