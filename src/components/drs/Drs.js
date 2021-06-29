import '@fontsource/roboto';
import axios from 'axios';
import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import { Typography } from '@material-ui/core';
import { format } from 'date-fns';
import DrsIndex from './pages/DrsIndex';
import DrsShow from './pages/DrsShow';
import NewDrs from './pages/NewDrs';

let newDate = new Date();
newDate.setSeconds(0, 0);
let year = newDate.getUTCFullYear();
let month = newDate.getUTCMonth();
let date = newDate.getUTCDate();
let hours = newDate.getUTCHours();
let minutes = newDate.getUTCMinutes();
let seconds = newDate.getUTCSeconds();

class Drs extends React.Component {
  constructor(props) {
    super(props);
    this.getDrsObjectsList = this.getDrsObjectsList.bind(this);
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
      }, 
      path: this.props.location.pathname, 
      prevPath: null
    };
    this.drsObjectFunctions = {
      setActiveDrsObject: (newActiveDrsObject) => this.setActiveDrsObject(newActiveDrsObject),
      updateDrsObjectType: (value) => this.updateDrsObjectType(value),
      updateScalarProperty: (property, newValue) => this.updateScalarProperty(property, newValue), 
      addListItem: (property, newObject) => this.addListItem(property, newObject),
      updateObjectProperty: (objectList, index, property, newValue) => this.updateObjectProperty(objectList, index, property, newValue), 
      removeListItem: (objects, index) => this.removeListItem(objects, index),
      updateId: (newValue) => this.updateId(newValue),
      updateAlias: (index, newValue) => this.updateAlias(index, newValue),
      removeAlias: (index) => this.removeAlias(index),
      updateChecksumType: (index, newValue) => this.updateChecksumType(index, newValue),
      removeChecksumItem: (index) => this.removeChecksumItem(index),
      updateValidRelatedDrsObjects: (property) => this.updateValidRelatedDrsObjects(property)
    };
    this.drsObjectProperties = {
      newDrsObject: {
        id: '',
        description: '',
        created_time: format(new Date(year, month, date, hours, minutes, seconds), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        mime_type: '',
        name: '',
        size: '',
        updated_time: format(new Date(year, month, date, hours, minutes, seconds), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        version: '',
        aliases: [],
        checksums: [],
        drs_object_children: [],
        drs_object_parents: [],
        file_access_objects: [],
        aws_s3_access_objects: [],
        validId: false,
        validRelatedDrsObjects: true,
        isBlob: true,
        isBundle: false
      },
      newAlias: '',
      newChecksum: {
        checksum: '',
        type: ''
      },
      newRelatedDrsObject: {
        id: '', 
        name: '', 
        isValid: ''
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

  getDrsObjectsList = async () => {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects');
    await axios({
      url: requestUrl, 
      method: 'GET'
    })
    .then(
      (response) => {
        console.log('getDrsObjectsList');
        this.setState ({
          drsObjectsList: response.data
        })
      },
      (error) => {
        this.handleError(error);
      }
    )
  }

  componentDidMount() {
    if(!this.state.drsObjectsList) {
      this.getDrsObjectsList();
    }
  }

  componentDidUpdate() {
    if(this.state.path !== this.props.location.pathname) {
      this.setState({
        prevPath: this.state.path,
        path: this.props.location.pathname
      })
      if(this.props.location.pathname === '/drs' && this.state.path !== this.state.prevPath) {
        console.log('update index');
        this.getDrsObjectsList();
      }
      if(this.props.location.pathname === '/drs/new' && this.state.path !== this.state.prevPath) {
        console.log('update new drs page');
        this.setState({
          activeDrsObject: this.drsObjectProperties.newDrsObject
        })
      }
    }

  }

  updateActiveDrsObject(newActiveDrsObject) {
    if(newActiveDrsObject.drs_object_children && Object.keys(newActiveDrsObject.drs_object_children).length > 0) {
      newActiveDrsObject.isBundle = true;
      newActiveDrsObject.isBlob = false;
    }
    else {
      newActiveDrsObject.isBlob = true;
      newActiveDrsObject.isBundle = false;
    }
    this.setState({
      activeDrsObject: newActiveDrsObject
    });
  }

  setActiveDrsObject(newActiveDrsObject) {
    this.setState({
      activeDrsObject: newActiveDrsObject
    });
    console.log(this.state.activeDrsObject);
    console.log(this.drsObjectProperties.newDrsObject);
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

  updateId(newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    activeDrsObject['id'] = newValue;
    if(newValue) {
      activeDrsObject.validId = true;
    }
    else {
      activeDrsObject.validId = false;
    }
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

  updateValidRelatedDrsObjects(property) {
    console.log('update valid related drs object');
    console.log(property);
    let activeDrsObject = {...this.state.activeDrsObject};
    activeDrsObject.validRelatedDrsObjects = true;
    if(activeDrsObject[property]) {
      activeDrsObject[property].map((relatedDrs) => {
        if(relatedDrs.isValid === false) {
          console.log('set false');
          console.log(relatedDrs);
          activeDrsObject.validRelatedDrsObjects = false;
        }
      })  
    }
    this.setState({
      activeDrsObject: activeDrsObject
    }) 
    console.log(this.state.activeDrsObject.validRelatedDrsObjects);
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
                updateActiveDrsObject={this.updateActiveDrsObject}
                drsObjectFunctions={this.drsObjectFunctions}
                drsObjectProperties={this.drsObjectProperties}
              />
            </Route>
            <Route exact path='/drs/new'>
              <NewDrs
                activeDrsObject={this.state.activeDrsObject}
                updateActiveDrsObject={this.updateActiveDrsObject}
                checksumTypes={this.state.checksumTypes}
                drsObjectFunctions={this.drsObjectFunctions}
                drsObjectProperties={this.drsObjectProperties}
                getDrsObjectsList={this.getDrsObjectsList}
              />
            </Route>
            <Route path='/drs/:objectId'>
              <DrsShow 
                activeDrsObject={this.state.activeDrsObject} 
                updateActiveDrsObject={this.updateActiveDrsObject} 
                handleError={this.handleError}
                checksumTypes={this.state.checksumTypes}
                drsObjectFunctions={this.drsObjectFunctions}
              />
            </Route>
          </Switch>
        </div>
      );
    }
  }
}
  
export default Drs;