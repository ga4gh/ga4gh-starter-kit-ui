import React from 'react';
//import '@fontsource/roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './lib/components/pages/Home';
import DrsMain from './lib/components/drs/DrsMain';

class App extends React.Component {
  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/drs' component={DrsMain} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
