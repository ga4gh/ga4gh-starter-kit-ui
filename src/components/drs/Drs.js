import '@fontsource/roboto';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DrsIndex from './pages/DrsIndex';
import DrsShow from './pages/DrsShow';
//const axios = require('axios').default;

class Drs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drsObjectsList: [
        {
          "id" : "testDrsId",
          "name" : "testDrsName"
        }
      ], 
      error: null
    };
  }

  /* componentDidMount() {
    //'http://localhost:8080/ga4gh/drs/v1/objects/b8cd0667-2c33-4c9f-967b-161b905932c9'
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects');
    console.log(requestUrl);
    axios.get(requestUrl)
    .then(
      (response) => {
      console.log(response);
      this.setState({
        drsObjectsList: response
      });
      },
      (error) => {
        this.setState({
        error: error
      });
      }
    )
  } */

  render(){
    return (
      <div>
        <Router>
          <Switch>
              <Route exact path='/drs'>
              <DrsIndex drsObjectsList={this.state.drsObjectsList}/>
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
  
  export default Drs;