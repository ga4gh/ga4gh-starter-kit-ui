import './App.css';
import '@fontsource/roboto';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/pages/Home'
import DrsIndex from './components/pages/drs/DrsIndex';
import DrsShow from './components/pages/drs/DrsShow';

class App extends React.Component {
  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/drs'>
              <DrsIndex />
            </Route>
            <Route exact path='/drs/:objectId'>
              <DrsShow />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
