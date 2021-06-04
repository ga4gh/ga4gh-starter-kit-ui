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
    this.updateActiveDrsObject = this.updateActiveDrsObject.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      activeDrsObject: null,
      drsObjectsList: null,
      error: null
    };
  }

  componentDidMount() {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects');

    let getDrsObjectsList = async () => {
      await axios({
        url: requestUrl, 
        method: 'GET',
        cancelToken: drsCancelToken.token
      })
      .then(
        (response) => {
          this.setState ({
            drsObjectsList: response.data
          })
        },
        (error) => {
          if (axios.isCancel(error)) {
            console.log('Drs request has been cancelled');
          }
          else {
            this.handleError(error);
          }
        }
      )
    }
    if(!this.state.drsObjectsList) {
      getDrsObjectsList();
    }
  }

  componentWillUnmount() {
    drsCancelToken.cancel('Cleanup Drs');
  }

  updateActiveDrsObject(newActiveDrsObject) {
    this.setState({
      activeDrsObject: newActiveDrsObject
    });
  }

  handleError(error) {
    this.setState({
      error: error
    });
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
            <Typography variant="h4" gutterBottom>Error</Typography>
            <Typography gutterBottom>{this.state.error.response.data.message}</Typography>
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
            <Typography variant="h4" gutterBottom>Error</Typography>
            <Typography gutterBottom>{this.state.error.request}</Typography>
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
            <Typography variant="h4" gutterBottom>Error</Typography>
            <Typography gutterBottom>{this.state.error.message}</Typography>
          </div>
        );
      }
    }
    else {
      return (
        <div>
          <Switch>
            <Route exact path='/drs'>
              <DrsIndex drsObjectsList={this.state.drsObjectsList} handleError={this.handleError}/>
            </Route>
            <Route path='/drs/:objectId'>
              <DrsShow activeDrsObject={this.state.activeDrsObject} updateActiveDrsObject={this.updateActiveDrsObject} handleError={this.handleError}/>
            </Route>
          </Switch>
        </div>
      );
    }
  }
}
  
  export default Drs;