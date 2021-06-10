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
    this.updateId = this.updateId.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateCreatedTime = this.updateCreatedTime.bind(this);
    this.updateUpdatedTime = this.updateUpdatedTime.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.updateDrsObjectType = this.updateDrsObjectType.bind(this);
    this.updateMimeType = this.updateMimeType.bind(this); 
    this.addAlias = this.addAlias.bind(this);
    this.updateAlias = this.updateAlias.bind(this);
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

  updateId(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.id = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  updateName(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.name = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  updateDescription(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.description = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  updateCreatedTime(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.created_time = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  updateUpdatedTime(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.updated_time = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  updateVersion(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.version = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  updateDrsObjectType(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.drs_object_type = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  updateMimeType(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.mime_type = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  addAlias(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.aliases.push(newValue);
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
  }

  //need to identify alias being updated
  updateAlias(newValue) {
    let activeDrsObject = (this.state.activeDrsObject);
    activeDrsObject.aliases[0] = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
    console.log(this.state.activeDrsObject);
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
                updateId={this.updateId}
                updateName={this.updateName}
                updateDescription={this.updateDescription}
                updateCreatedTime={this.updateCreatedTime}
                updateUpdatedTime={this.updateUpdatedTime}
                updateVersion={this.updateVersion}
                updateDrsObjectType={this.updateDrsObjectType}
                updateMimeType={this.updateMimeType}
                addAlias={this.addAlias}
                updateAlias={this.updateAlias}
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