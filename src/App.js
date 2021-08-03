import './App.css';
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registered from './components/Registered';
import NewPlayerPage from './pages/NewPlayerPage';


//files for understanding components, state and props
class App extends Component {
  render() {
    // Route path doesn't need to align with the back-end route
    return (
      <div className="App">
        <Switch>
          <header className="App-header">
            <Route path='/' exact>
              <NewPlayerPage />
            </Route>
            <Route path='/registered'>
              <Registered />
            </Route>
          </header> 
        </Switch>
      </div>
    );
  }
}

export {App};
