import '@fontsource/roboto';
import axios from 'axios';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DrsIndex from './pages/DrsIndex';
import DrsShow from './pages/DrsShow';

class Drs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drsObjectsList: null,
      error: null
    };
  }

  componentDidMount() {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects');
    let getDrsObjectsList = async () => {
      try {
        const response = await axios.get(requestUrl);
        console.log(response);
        this.setState({
          drsObjectsList: response.data
        });
      }
      catch(error){
        console.log(error)
      }
    }
    if(!this.state.drsObjectsList){
      getDrsObjectsList();
    }
  }

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