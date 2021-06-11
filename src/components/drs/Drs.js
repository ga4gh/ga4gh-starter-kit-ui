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
import NewDrs from './pages/NewDrs';

const cancelToken = axios.CancelToken;
const drsCancelToken = cancelToken.source();

class Drs extends React.Component {
  constructor(props) {
    super(props);
    this.updateActiveDrsObject = this.updateActiveDrsObject.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      newDrsObject: {
        id: '',
        description: '',
        created_time: '',
        mime_type: '',
        name: '',
        size: '',
        updated_time: '',
        version: '',
        aliases: [],
        checksums: [],
        drs_object_children: [],
        drs_object_parents: [],
        file_access_objects: [],
        aws_s3_access_objects: [],
        drs_object_type: 'blob'
      },
      activeDrsObject: null,
      drsObjectsList: null,
      error: null
    };
    this.drsObjectFunctions = {
      updateScalarProperty: (property, newValue) => this.updateScalarProperty(property, newValue), 
      addListItem: (property) => this.addListItem(property),
      updateObjectProperty: (objectList, index, property, newValue) => this.updateObjectProperty(objectList, index, property, newValue)
    }
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

  updateScalarProperty(property, newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    activeDrsObject[property] = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  addListItem(property) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let newObject;
    if(property === 'aliases') {
      newObject = '';
    }
    else if(property === 'checksums') { 
      newObject = {
        checksum: '',
        type: ''
      }
    }
    else if(property === 'drs_object_children'){
      newObject = {
        id: ''
      }
    }
    else if(property === 'drs_object_parents'){
      newObject = {
        id: ''
      }
    }
    else if(property === 'file_access_objects'){
      newObject = {
        path: ''
      }
    }
    else if(property === 'aws_s3_access_objects'){
      newObject = {
        region: '',
        bucket: '',
        key: ''
      }
    }
    activeDrsObject[property].push(newObject);
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  updateObjectProperty(objects, index, property, newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let objectList = activeDrsObject[objects];
    let object = objectList[index];
    if(property === 'alias') {
      objectList[index] = newValue;
    }
    else {
      object[property] = newValue;
    }
    this.setState({
      activeDrsObject: activeDrsObject
    })
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
              <DrsIndex 
                drsObjectsList={this.state.drsObjectsList} 
                handleError={this.handleError}
              />
            </Route>
            <Route exact path='/drs/new'>
              <NewDrs
                newDrsObject={this.state.newDrsObject}
                activeDrsObject={this.state.activeDrsObject}
                updateActiveDrsObject={this.updateActiveDrsObject}
                drsObjectFunctions={this.drsObjectFunctions}
              />
            </Route>
            <Route path='/drs/:objectId'>
              <DrsShow 
                activeDrsObject={this.state.activeDrsObject} 
                updateActiveDrsObject={this.updateActiveDrsObject} 
                handleError={this.handleError}
              />
            </Route>
          </Switch>
        </div>
      );
    }
  }
}
  
  export default Drs;