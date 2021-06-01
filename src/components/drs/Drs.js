import '@fontsource/roboto';
import axios from 'axios';
import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import { Typography } from '@material-ui/core';
import DrsIndex from './pages/DrsIndex';
import DrsShow from './pages/DrsShow';

const cancelToken = axios.CancelToken;
const drsCancelToken = cancelToken.source();

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
      const response = await axios({
        url: requestUrl, 
        method: 'GET',
        cancelToken: drsCancelToken.token
      })
      return response; 
    }
    if(!this.state.drsObjectsList) {
      getDrsObjectsList()
      .then(
        (response) => {
          this.setState ({
            drsObjectsList: response.data
          })
          console.log(response.data);
        },
        (error) => {
          if (axios.isCancel(error)) {
            console.log('Drs request has been cancelled');
            console.log(error.message);
          }
          else {
            this.setState({
            error: error
          }
          )}
        }
      )
    }
  }

  componentWillUnmount() {
    drsCancelToken.cancel('Cleanup Drs');
  }

  render(){
    if(this.state.error) {
      if(this.state.error.response) {
        return (
          <div align="center">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
            <Typography gutterBottom>Error: {this.state.error.response.data.message}</Typography>
          </div>
        );
      }
      else if(this.state.error.request) {
        return (
          <div align="center">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
            <Typography gutterBottom>Error: {this.state.error.request}</Typography>
          </div>
        );
      }
      else {
        return (
          <div align="center">
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
            <Typography gutterBottom>Error: {this.state.error.message}</Typography>
          </div>
        );
      }
    }
    else{
      return (
        <div>
          <Switch>
            <Route path='/drs/:objectId'>
              <DrsShow />
            </Route>
            <Route exact path='/drs'>
              <DrsIndex drsObjectsList={this.state.drsObjectsList}/>
            </Route>
          </Switch>
        </div>
      );
    }
  }
}
  
  export default Drs;