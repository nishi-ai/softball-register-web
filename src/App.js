import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registered from './components/Registered';
import Error500 from './components/500';
import NewPlayerPage from './pages/NewPlayerPage';
import DisplayBasicInfo from "./components/BasicInfo";

const data = require('./BasicData.json')

//files for understanding components, state and props
class App extends Component {
  render() {
    // Route path doesn't need to align with the back-end route
    return (
      <Router>
        <div className="App">
        <Switch>
          <header className="App-header">
          <DisplayBasicInfo data={data.main} />
            <Route path='/' exact>
              <NewPlayerPage />
            </Route>
            <Route path='/registered'>
              <Registered />
            </Route>
            <Route path='/500'>
              <Error500/>
            </Route>
          </header>
        </Switch>
      </div>
      </Router>
      
    );
  }
}

export {App};
