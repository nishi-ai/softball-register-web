import './App.css';
import React, {Component} from 'react';
import { Container as GridContainer, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registered from './components/Registered';
import Error500 from './pages/500';
import NewPlayerPage from './pages/NewPlayerPage';
import LoginToAdminPage from './pages/LoginToAdminPage';
import DisplayBasicInfo from "./pages/BasicInfo";
import DisplayEventInfo from "./components/Events/EventInfo";

const data = require('./BasicData.json')
const title = data.main.teamName;

//files for understanding components, state and props
class App extends Component {
  render() {
    // Route path doesn't need to align with the back-end route
    return (
      <Router>
        <div className="App">
        <Switch>
          <header className="App-header">
            <Route path='/' exact>
            <GridContainer>
              <h1 className="m-5">{title}</h1>
                <Row className="justify-content-md-center">
                  <Col sm><DisplayEventInfo /></Col>
                  <Col sm><DisplayBasicInfo data={data.main} /></Col>
                </Row> 
            </GridContainer>
              <NewPlayerPage />
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