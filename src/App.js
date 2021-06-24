import './App.css';
import '@fontsource/roboto';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/pages/Home';
import Drs from './components/drs/Drs';

class App extends React.Component {
  render(){
    return (
      <div>
        <Router /* forceRefresh={true} */>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/drs'>
              <Drs />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
