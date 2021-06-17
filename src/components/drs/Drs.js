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
      activeDrsObject: null,
      drsObjectsList: null,
      error: null, 
      checksumTypes: {
        md5: {
          disabled: false
        },
        sha1: {
          disabled: false
        },
        sha256: {
          disabled: false
        },
      }
    };
    this.drsObjectFunctions = {
      updateDrsObjectType: (value) => this.updateDrsObjectType(value),
      updateScalarProperty: (property, newValue) => this.updateScalarProperty(property, newValue), 
      addListItem: (property, newObject) => this.addListItem(property, newObject),
      updateObjectProperty: (objectList, index, property, newValue) => this.updateObjectProperty(objectList, index, property, newValue), 
      removeListItem: (objects, index) => this.removeListItem(objects, index),
      updateAlias: (index, newValue) => this.updateAlias(index, newValue),
      removeAlias: (index) => this.removeAlias(index),
      updateChecksumType: (index, newValue) => this.updateChecksumType(index, newValue),
      removeChecksumItem: (index) => this.removeChecksumItem(index),
      newDrsObject: {
        id: '',
        description: '',
        created_time: new Date(),
        mime_type: '',
        name: '',
        size: '',
        updated_time: new Date(),
        version: '',
        aliases: [],
        checksums: [],
        drs_object_children: [],
        drs_object_parents: [],
        file_access_objects: [],
        aws_s3_access_objects: [],
        isBlob: true,
        isBundle: false
      },
      newAlias: '',
      newChecksum: {
        checksum: '',
        type: ''
      },
      newDrsObjectChild: {
        id: '', 
        name: ''
      },
      newDrsObjectParent: {
        id: '', 
        name: ''
      },
      newFileAccessObject: {
        path: ''
      },
      newAwsS3AccessObject: {
        region: '',
        bucket: '',
        key: ''
      }
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
    console.log(this.state.activeDrsObject);
  }

  handleError(error) {
    this.setState({
      error: error
    });
  }

  updateDrsObjectType(value) {
    let activeDrsObject = {...this.state.activeDrsObject};
    if(value === 'blob') {
      activeDrsObject.isBlob = true;
      activeDrsObject.isBundle = false;
    }
    else {
      activeDrsObject.isBundle = true;
      activeDrsObject.isBlob = false;
    }
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  updateScalarProperty(property, newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    activeDrsObject[property] = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  addListItem(property, newObject) {
    let activeDrsObject = {...this.state.activeDrsObject};
    activeDrsObject[property].push(newObject);
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  updateObjectProperty(objects, index, property, newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let objectList = activeDrsObject[objects];
    let object = {...objectList[index]};
    object[property] = newValue;
    objectList[index] = object;
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  removeListItem(objects, index) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let objectList = activeDrsObject[objects];
    objectList.splice(index, 1);
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  updateAlias(index, newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let aliases = activeDrsObject['aliases'];
    aliases[index] = newValue;
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  removeAlias(index) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let aliases = activeDrsObject['aliases'];
    aliases.splice(index, 1);
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }

  updateChecksumType(index, newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let objectList = activeDrsObject['checksums'];
    let object = {...objectList[index]};
    let previousType = object['type'];
    object['type'] = newValue;
    objectList[index] = object;
    let checksumTypes = {...this.state.checksumTypes};
    if(previousType) {
      checksumTypes[previousType].disabled = !checksumTypes[previousType].disabled;
    }
    checksumTypes[newValue].disabled = !checksumTypes[newValue].disabled;
    this.setState({
      activeDrsObject: activeDrsObject,
      checksumTypes: checksumTypes
    })
  }

  removeChecksumItem(index) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let objectList = activeDrsObject['checksums'];
    let checksumToRemove = objectList[index];
    let typeToUpdate = checksumToRemove.type;
    console.log(typeToUpdate);
    objectList.splice(index, 1);
    let checksumTypes = {...this.state.checksumTypes};
    if(typeToUpdate) {
      checksumTypes[typeToUpdate].disabled = false;
    }
    this.setState({
      activeDrsObject: activeDrsObject,
      checksumTypes: checksumTypes
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
                activeDrsObject={this.state.activeDrsObject}
                updateActiveDrsObject={this.updateActiveDrsObject}
                checksumTypes={this.state.checksumTypes}
                drsObjectFunctions={this.drsObjectFunctions}
              />
            </Route>
            <Route path='/drs/:objectId'>
              <DrsShow 
                activeDrsObject={this.state.activeDrsObject} 
                updateActiveDrsObject={this.updateActiveDrsObject} 
                handleError={this.handleError}
                checksumTypes={this.state.checksumTypes}
              />
            </Route>
          </Switch>
        </div>
      );
    }
  }
}
  
  export default Drs;