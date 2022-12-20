import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registered from './components/Registered';
import Title from './components/Title';
import Error500 from './pages/500';
import NewPlayerPage from './pages/NewPlayerPage';
import LoginToAdminPage from './pages/LoginToAdminPage';
import DisplayBasicInfo from "./pages/BasicInfo";
import DisplayEventInfo from "./components/Events/EventInfo";

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
           <Title data={data.main} />
            <Route path='/' exact>
              <DisplayBasicInfo data={data.main} />
              <DisplayEventInfo />
              <NewPlayerPage data={data.main} />
            </Route>
            <Route path='/registered'>
              <Registered />
            </Route>
            <Route path='/500'>
              <Error500/>
            </Route>
            <Route path='/admin'>
              <LoginToAdminPage/>
            </Route>
          </header>
        </Switch>
        </div>
      </Router>
      
    );
  }
}

export {App};