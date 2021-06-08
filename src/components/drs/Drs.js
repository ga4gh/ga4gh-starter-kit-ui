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
import CreateDrsForm from './pages/NewDrs';

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
    // this.updateCreatedTime = this.updateCreatedTime.bind(this);
    // this.updateUpdatedTime = this.updateUpdatedTime.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.updateDrsObjectType = this.updateDrsObjectType.bind(this);
    this.updateMimeType = this.updateMimeType.bind(this); 
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
        drs_object_type: ''
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
    this.setState({ 
      activeDrsObject: {
        id: newValue,
        description: this.state.activeDrsObject.description,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: this.state.activeDrsObject.mime_type,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: this.state.activeDrsObject.version,
        aliases: this.state.activeDrsObject.aliases,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.activeDrsObject.drs_object_type
      }
    })
    //console.log(this.state.activeDrsObject);
  }

  updateName(newValue) {
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: this.state.activeDrsObject.description,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: this.state.activeDrsObject.mime_type,
        name: newValue,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: this.state.activeDrsObject.version,
        aliases: this.state.activeDrsObject.aliases,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.activeDrsObject.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  }

  updateDescription(newValue) {
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: newValue,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: this.state.activeDrsObject.mime_type,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: this.state.activeDrsObject.version,
        aliases: this.state.activeDrsObject.aliases,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.activeDrsObject.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  }

  /* updateCreatedTime(newValue) {
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: this.state.activeDrsObject.description,
        created_time: newValue,
        mime_type: this.state.activeDrsObject.mime_type,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: this.state.activeDrsObject.version,
        aliases: this.state.activeDrsObject.aliases,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.activeDrsObject.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  }

  updateUpdatedTime(newValue) {
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: this.state.activeDrsObject.description,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: this.state.activeDrsObject.mime_type,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: newValue,
        version: this.state.activeDrsObject.version,
        aliases: this.state.activeDrsObject.aliases,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.activeDrsObject.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  } */

  updateVersion(newValue) {
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: this.state.activeDrsObject.description,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: this.state.activeDrsObject.mime_type,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: newValue,
        aliases: this.state.activeDrsObject.aliases,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.activeDrsObject.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  }

  updateDrsObjectType(newValue) {
    if(newValue === 'blob'){
      this.setState({
        activeDrsObject: {
          id: this.state.activeDrsObject.id,
          description: this.state.activeDrsObject.description,
          created_time: this.state.activeDrsObject.created_time,
          mime_type: '',
          name: this.state.activeDrsObject.name,
          size: '',
          updated_time: this.state.activeDrsObject.updated_time,
          version: this.state.activeDrsObject.version,
          aliases: this.state.activeDrsObject.aliases,
          checksums: [],
          drs_object_parents: this.state.activeDrsObject.drs_object_parents,
          file_access_objects: [],
          aws_s3_access_objects: [], 
          drs_object_type: newValue
        }
      })
    }
    else if(newValue === 'bundle'){
      this.setState({
        activeDrsObject: {
          id: this.state.activeDrsObject.id,
          description: this.state.activeDrsObject.description,
          created_time: this.state.activeDrsObject.created_time,
          name: this.state.activeDrsObject.name,
          updated_time: this.state.activeDrsObject.updated_time,
          version: this.state.activeDrsObject.version,
          aliases: this.state.activeDrsObject.aliases,
          drs_object_children: [],
          drs_object_parents: this.state.activeDrsObject.drs_object_parents, 
          drs_object_type: newValue
        }
      })
    }
    else{
      this.setState({
        activeDrsObject: {
          id: this.state.activeDrsObject.id,
          description: this.state.activeDrsObject.description,
          created_time: this.state.activeDrsObject.created_time,
          mime_type: this.state.activeDrsObject.mime_type,
          name: this.state.activeDrsObject.name,
          size: this.state.activeDrsObject.size,
          updated_time: this.state.activeDrsObject.updated_time,
          version: this.state.activeDrsObject.version,
          aliases: this.state.activeDrsObject.aliases,
          checksums: this.state.activeDrsObject.checksums,
          drs_object_children: this.state.activeDrsObject.drs_object_children,
          drs_object_parents: this.state.activeDrsObject.drs_object_parents,
          file_access_objects: this.state.activeDrsObject.file_access_objects,
          aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
          drs_object_type: newValue
        }
      })  
    }
  }

  updateMimeType(newValue) {
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: this.state.activeDrsObject.description,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: newValue,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: this.state.activeDrsObject.version,
        aliases: this.state.activeDrsObject.aliases,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.activeDrsObject.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  }

  /* addAlias(newValue) {
    let newAliasesList = this.state.activeDrsObject.aliases.push(newValue);
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: this.state.activeDrsObject.description,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: newValue,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: this.state.activeDrsObject.version,
        aliases: newAliasesList,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  } */

  //need to identify alias being updated
  /* updateAlias(index, newValue) {
    this.activeDrsObject.aliases[index] = newValue;
    this.setState({ 
      activeDrsObject: {
        id: this.state.activeDrsObject.id,
        description: this.state.activeDrsObject.description,
        created_time: this.state.activeDrsObject.created_time,
        mime_type: newValue,
        name: this.state.activeDrsObject.name,
        size: this.state.activeDrsObject.size,
        updated_time: this.state.activeDrsObject.updated_time,
        version: this.state.activeDrsObject.version,
        aliases: newAliasesList,
        checksums: this.state.activeDrsObject.checksums,
        drs_object_children: this.state.activeDrsObject.drs_object_children,
        drs_object_parents: this.state.activeDrsObject.drs_object_parents,
        file_access_objects: this.state.activeDrsObject.file_access_objects,
        aws_s3_access_objects: this.state.activeDrsObject.aws_s3_access_objects, 
        drs_object_type: this.state.drs_object_type
      }
    })
    console.log(this.state.activeDrsObject);
  } */

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
              <CreateDrsForm 
                newDrsObject={this.state.newDrsObject}
                activeDrsObject={this.state.activeDrsObject}
                updateActiveDrsObject={this.updateActiveDrsObject}
                updateId={this.updateId}
                updateName={this.updateName}
                updateDescription={this.updateDescription}
                // updateCreatedTime={this.updateCreatedTime}
                // updateUpdatedTime={this.updateUpdatedTime}
                updateVersion={this.updateVersion}
                updateDrsObjectType={this.updateDrsObjectType}
                updateMimeType={this.updateMimeType}
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