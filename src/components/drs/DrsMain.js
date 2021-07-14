import '@fontsource/roboto';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Typography } from '@material-ui/core';
import { format } from 'date-fns';
import DrsIndex from './pages/DrsIndex';
import DrsShow from './pages/DrsShow';
import DrsObjectForm from './pages/DrsObjectForm';
import DrsApiCaller from './utils/DrsApiCaller';

const DrsMain = props => {

  const emptyDrsObject = () => {
    let date = new Date();
    date.setSeconds(0, 0);
    let emptyDrsObject = {
      id: '',
      description: '',
      created_time: format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      mime_type: '',
      name: '',
      size: '',
      updated_time: format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      version: '',
      is_bundle: false,
      aliases: [],
      checksums: [],
      drs_object_children: [],
      drs_object_parents: [],
      file_access_objects: [],
      aws_s3_access_objects: [],

      validId: false,
      validRelatedDrsObjects: true
    }
    return emptyDrsObject;
  }

  const emptyDisplayChecksumTypes = () => {
    return {
      md5: true,
      sha1: true,
      sha256: true
    }
  }

  /* ##################################################
   * STATE VARIABLES
   * ################################################## */

  const [drsObjectsList, setDrsObjectsList] = useState([]);
  const [activeDrsObject, setActiveDrsObject] = useState(emptyDrsObject());
  const [displayChecksumTypes, setDisplayChecksumTypes] = useState(emptyDisplayChecksumTypes());
  const [error, setError] = useState(null);
  // const [path, setPath] = useState(this.props.location.pathname);
  const [prevPath, setPrevPath] = useState(null);
  const [submitNewDrsRedirect, setSubmitNewDrsRedirect] = useState(false);

  /* ##################################################
   * API CALLS
   * ################################################## */

  const retrieveDrsObjectsList = async () => {
    let requestConfig = {
      url: 'http://localhost:8080/admin/ga4gh/drs/v1/objects',
      method: 'GET',
      cancelToken: axios.CancelToken.source().token
    }
    DrsApiCaller(requestConfig, setDrsObjectsList, console.log);
  }

  const retrieveDrsObject = async (id, successCallback) => {
    let requestConfig = {
      url: `http://localhost:8080/admin/ga4gh/drs/v1/objects/${id}`,
      method: 'GET',
      cancelToken: axios.CancelToken.source().token
    }
    DrsApiCaller(requestConfig, setActiveDrsObject, console.log);
  }

  const apiFunctions = {
    retrieveDrsObject: retrieveDrsObject
  }

  /* ##################################################
   * GENERIC TEMPLATE FUNCTIONS
   * ################################################## */

  const updateScalarProperty = (property, newValue) => {
    let updatedActiveDrsObject = {...activeDrsObject};
    updatedActiveDrsObject[property] = newValue;
    setActiveDrsObject(updatedActiveDrsObject);
  }

  const updateListString = (property, index, newValue) => {
    let updatedActiveDrsObject = {...activeDrsObject};
    updatedActiveDrsObject[property][index] = newValue;
    setActiveDrsObject(updatedActiveDrsObject);
  }

  const addObjectToList = (property, newObjectFunction) => {
    let updatedActiveDrsObject = {...activeDrsObject};
    updatedActiveDrsObject[property].push(newObjectFunction());
    setActiveDrsObject(updatedActiveDrsObject);
  }

  const removeListItem = (property, index) => {
    let updatedActiveDrsObject = {...activeDrsObject};
    updatedActiveDrsObject[property].splice(index, 1);
    setActiveDrsObject(updatedActiveDrsObject);
  }

  const updateListObjectProperty = (drsObjectProperty, index, subObjectProperty, newValue) => {
    let updatedActiveDrsObject = {...activeDrsObject};
    updatedActiveDrsObject[drsObjectProperty][index][subObjectProperty] = newValue;
    setActiveDrsObject(updatedActiveDrsObject);
  }

  const newDrsObjectProperty = {
    alias: () => '',
    checksum: () => ({checksum: '', type: ''}),
    relative: () => ({id: '', name: '', isValid: undefined}),
    fileAccessObject: () => ({path: ''}),
    awsS3AccessObject: () => ({region: '', bucket: '', key: ''})
  }

  /* ##################################################
   * SPECIFIC UPDATE FUNCTIONS PASSED TO DRS OBJECT FORM
   * ################################################## */

  const activeDrsObjectFunctions = {
    reset: () => setActiveDrsObject(emptyDrsObject),
    retrieve: retrieveDrsObject,

    setId: id => updateScalarProperty('id', id),
    setDescription: description => updateScalarProperty('description', description),
    setCreatedTime: createdTime => updateScalarProperty('created_time', createdTime),
    setUpdatedTime: updatedTime => updateScalarProperty('updated_time', updatedTime),
    setMimeType: mimeType => updateScalarProperty('mime_type', mimeType),
    setName: name => updateScalarProperty('name', name),
    setSize: size => updateScalarProperty('size', size),
    setVersion: version => updateScalarProperty('version', version),
    // aliases
    addAlias: () => addObjectToList('aliases', newDrsObjectProperty.alias),
    setAlias: (index, alias) => updateListString('aliases', index, alias),
    removeAlias: index => removeListItem('aliases', index),
    // checksums
    addChecksum: () => addObjectToList('checksums', newDrsObjectProperty.checksum),
    setChecksumType: (index, type) => updateListObjectProperty('checksums', index, 'type', type),
    setChecksumChecksum: (index, checksum) => updateListObjectProperty('checksums', index, 'checksum', checksum),
    removeChecksum: index => removeListItem('checksums', index),
    // children
    addChild: () => addObjectToList('drs_object_children', newDrsObjectProperty.relative),
    setChildId: (index, id) => updateListObjectProperty('drs_object_children', index, 'id', id),
    unsetChildValidity: index => updateListObjectProperty('drs_object_children', index, 'isValid', undefined),
    removeChild: index => removeListItem('drs_object_children', index),
    // parents
    addParent: () => addObjectToList('drs_object_parents', newDrsObjectProperty.relative),

    // file access objects
    addFileAccessObject: () => addObjectToList('file_access_objects', newDrsObjectProperty.fileAccessObject),
    setFileAccessObjectPath: (index, path) => updateListObjectProperty('file_access_objects', index, 'path', path),
    removeFileAccessObject: index => removeListItem('file_access_objects', index),
    // aws s3 access objects
    addAwsS3AccessObject: () => addObjectToList('aws_s3_access_objects', newDrsObjectProperty.awsS3AccessObject),
    setAwsS3AccessObjectRegion: (index, region) => updateListObjectProperty('aws_s3_access_objects', index, 'region', region),
    setAwsS3AccessObjectBucket: (index, bucket) => updateListObjectProperty('aws_s3_access_objects', index, 'bucket', bucket),
    setAwsS3AccessObjectKey: (index, key) => updateListObjectProperty('aws_s3_access_objects', index, 'key', key),

    setIsBundle: isBundle => updateScalarProperty('is_bundle', isBundle)
  }

  /* ##################################################
   * ROUTE CHANGE LISTENER
   * ################################################## */

  // add the history listener, modifies the activeDrsObject based on the current
  // URL path

  let history = useHistory();

  useEffect(() => {
    retrieveDrsObjectsList();
    history.listen((location, action) => {
      let re = new RegExp('/drs/(.+)');
      let match = location.pathname.match(re);
      if (match) {
        match[1] === 'new' ? activeDrsObjectFunctions.reset() : activeDrsObjectFunctions.retrieve(match[1]);
      }
    })
  }, [])

  useEffect(() => {
    let updatedDisplayChecksumTypes = emptyDisplayChecksumTypes();
    activeDrsObject.checksums.forEach((checksum, index) => {
      updatedDisplayChecksumTypes[checksum.type] = index;
    })
    setDisplayChecksumTypes(updatedDisplayChecksumTypes);
  }, [activeDrsObject]);

  /*
  constructor(props) {
    super(props);
    this.getDrsObjectsList = this.getDrsObjectsList.bind(this);
    this.handleError = this.handleError.bind(this);
    this.updateSubmitNewDrsRedirect = this.updateSubmitNewDrsRedirect.bind(this);
  }
  */

  /*
  getDrsObjectsList = async () => {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects');
    await axios({
      url: requestUrl, 
      method: 'GET'
    })
    .then(
      (response) => {
        this.setState ({
          drsObjectsList: response.data
        })
      },
      (error) => {
        this.handleError(error);
      }
    )
  }
  */

  /*
  
  */

  /*
  componentDidUpdate() {
    if(this.state.path !== this.props.location.pathname) {
      this.setState({
        prevPath: this.state.path,
        path: this.props.location.pathname
      })
      /* On navigation to the Index Page, update the Drs Objects list, reset the activeDrsObject, and reset the the state of submitNewDrsRedirect. */
      /*
      if(this.props.location.pathname === '/drs' && this.state.path !== this.state.prevPath) {
        this.getDrsObjectsList();
        this.setState({
          submitNewDrsRedirect: false
        })
      }
    }
  }
  */

  /*
  handleError(error) {
    this.setState({
      error: error
    });
  }
  */

  /*
  updateDrsObjectType(value) {
    let activeDrsObject = {...this.state.activeDrsObject};
    if(value === 'blob') {
      activeDrsObject.is_bundle = false;
    }
    else {
      activeDrsObject.is_bundle = true;
    }
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }
  */

  /*
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
  */

  /*
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
  */

  /*
  updateChecksumType(index, newValue) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let objectList = activeDrsObject['checksums'];
    let object = {...objectList[index]};
    let previousType = object['type'];
    object['type'] = newValue;
    objectList[index] = object;
    let checksumTypes = {...activeDrsObject.checksumTypes};
    if(previousType) {
      checksumTypes[previousType].disabled = !checksumTypes[previousType].disabled;
    }
    checksumTypes[newValue].disabled = !checksumTypes[newValue].disabled;
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }
  */

  /*
  removeChecksumItem(index) {
    let activeDrsObject = {...this.state.activeDrsObject};
    let objectList = activeDrsObject['checksums'];
    let checksumToRemove = objectList[index];
    let typeToUpdate = checksumToRemove.type;
    objectList.splice(index, 1);
    let checksumTypes = {...activeDrsObject.checksumTypes};
    if(typeToUpdate) {
      checksumTypes[typeToUpdate].disabled = false;
    }
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }
  */

  /* Check all Parent DRS Objects or all Child DRS Objects to determine if any are invalid. If all objects are valid, 
  this.state.activeDrsObject.validRelatedDrsObjects is true, otherwise, if any objects are invalid, it is false. */
  /*
  updateValidRelatedDrsObjects(property) {
    let activeDrsObject = {...this.state.activeDrsObject};
    activeDrsObject.validRelatedDrsObjects = true;
    if(activeDrsObject[property]) {
      activeDrsObject[property].map((relatedDrs) => {
        if(relatedDrs.isValid === false) {
          activeDrsObject.validRelatedDrsObjects = false;
        }
      })  
    }
    this.setState({
      activeDrsObject: activeDrsObject
    })
  }
  */

  /* When this.state.submitNewDrsRedirect is true, the page will be redirected from '/drs/new' to '/drs'. */
  /*
  updateSubmitNewDrsRedirect(newValue) {
    this.setState({
      submitNewDrsRedirect: newValue
    })
  }
  */

  /* ##################################################
   * RENDER
   * ################################################## */

  return (
    <div>
      <Switch>
        <Route exact path='/drs'>
          <DrsIndex 
            drsObjectsList={drsObjectsList} 
            setError={setError}
          />
        </Route>
        <Route exact path='/drs/new'>
          <DrsObjectForm
            title={"Create New DrsObject"}
            activeDrsObject={activeDrsObject}
            activeDrsObjectFunctions={activeDrsObjectFunctions}
            displayChecksumTypes={displayChecksumTypes}
            apiFunctions={apiFunctions}
            readOnlyId={false}
            readOnlyForm={false}
          />
        </Route>
        <Route exact path='/drs/:objectId'>
          <DrsObjectForm
            title={"View DrsObject"}
            activeDrsObject={activeDrsObject}
            activeDrsObjectFunctions={activeDrsObjectFunctions}
            apiFunctions={apiFunctions}
            displayChecksumTypes={displayChecksumTypes}
            readOnlyId={true}
            readOnlyForm={true}
          />
        </Route>
      </Switch>
    </div>
  )
  
  /*
  return (
    {/*
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
                drsObjectFunctions={this.drsObjectFunctions}
                drsObjectProperties={this.drsObjectProperties}
              />
            </Route>
            <Route exact path='/drs/new'>
              {this.state.submitNewDrsRedirect ? <Redirect from='/drs/new' to='/drs' /> :
                <DrsObjectForm
                  title={"Create New DrsObject"}
                  activeDrsObject={this.state.activeDrsObject}
                  drsObjectFunctions={this.drsObjectFunctions}
                  drsObjectProperties={this.drsObjectProperties}
                  updateSubmitNewDrsRedirect={this.updateSubmitNewDrsRedirect}
                />
              }
            </Route>
            <Route path='/drs/:objectId'>
              <DrsShow 
                activeDrsObject={this.state.activeDrsObject} 
                handleError={this.handleError}
                drsObjectFunctions={this.drsObjectFunctions}
              />
            </Route>
          </Switch>
        </div>
      {/*});
    }}
  )
  */
}
  
export default DrsMain;