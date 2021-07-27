import '@fontsource/roboto';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DrsIndex from './pages/DrsIndex';
import DrsObjectForm from './pages/DrsObjectForm';
import DrsApiCaller from './utils/DrsApiCaller';
import _ from 'lodash';
import FormViewType from '../../model/common/FormViewType';
import { dateToISOString } from '../../functions/common';

const DrsMain = props => {

  const emptyDrsObject = () => {
    let dateString = dateToISOString(new Date());
    let emptyDrsObject = {
      id: '',
      description: '',
      created_time: dateString,
      mime_type: '',
      name: '',
      size: '',
      updated_time: dateString,
      version: '',
      is_bundle: false,
      aliases: [],
      checksums: [],
      drs_object_children: [],
      drs_object_parents: [],
      file_access_objects: [],
      aws_s3_access_objects: []
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
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

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

  const retrieveDrsObjectAndMerge = async (id) => {
    let requestConfig = {
      url: `http://localhost:8080/admin/ga4gh/drs/v1/objects/${id}`,
      method: 'GET',
      cancelToken: axios.CancelToken.source().token
    }
    DrsApiCaller(
      requestConfig,
      responseDrsObject => {
        let blankDrsObject = emptyDrsObject();
        Object.keys(blankDrsObject).forEach(key => {
          if (!responseDrsObject.hasOwnProperty(key)) {
            responseDrsObject[key] = blankDrsObject[key];
          }
        })
        setActiveDrsObject(responseDrsObject);
      },
      console.log
    );
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
    reset: () => setActiveDrsObject(emptyDrsObject()),
    retrieveDrsObjectsList: retrieveDrsObjectsList,
    retrieve: retrieveDrsObjectAndMerge,
    setId: id => updateScalarProperty('id', id),
    setDescription: description => updateScalarProperty('description', description),
    setCreatedTime: createdTime => updateScalarProperty('created_time', createdTime),
    setUpdatedTime: updatedTime => updateScalarProperty('updated_time', updatedTime),
    setMimeType: mimeType => updateScalarProperty('mime_type', mimeType),
    setName: name => updateScalarProperty('name', name),
    setSize: size => updateScalarProperty('size', size),
    setIsBundle: isBundle => updateScalarProperty('is_bundle', isBundle),
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
    setChildName: (index, name) => updateListObjectProperty('drs_object_children', index, 'name', name),
    setChildValid: index => updateListObjectProperty('drs_object_children', index, 'isValid', true),
    setChildInvalid: index => updateListObjectProperty('drs_object_children', index, 'isValid', false),
    unsetChildValidity: index => {
      updateListObjectProperty('drs_object_children', index, 'isValid', undefined);
      updateListObjectProperty('drs_object_children', index, 'name', '');
    },
    removeChild: index => removeListItem('drs_object_children', index),
    // parents
    addParent: () => addObjectToList('drs_object_parents', newDrsObjectProperty.relative),
    setParentId: (index, id) => updateListObjectProperty('drs_object_parents', index, 'id', id),
    setParentName: (index, name) => updateListObjectProperty('drs_object_parents', index, 'name', name),
    setParentValid: index => updateListObjectProperty('drs_object_parents', index, 'isValid', true),
    setParentInvalid: index => updateListObjectProperty('drs_object_parents', index, 'isValid', false),
    unsetParentValidity: index => {
      updateListObjectProperty('drs_object_parents', index, 'isValid', undefined);
      updateListObjectProperty('drs_object_parents', index, 'name', '');
    },
    removeParent: index => removeListItem('drs_object_parents', index),
    // file access objects
    addFileAccessObject: () => addObjectToList('file_access_objects', newDrsObjectProperty.fileAccessObject),
    setFileAccessObjectPath: (index, path) => updateListObjectProperty('file_access_objects', index, 'path', path),
    removeFileAccessObject: index => removeListItem('file_access_objects', index),
    // aws s3 access objects
    addAwsS3AccessObject: () => addObjectToList('aws_s3_access_objects', newDrsObjectProperty.awsS3AccessObject),
    setAwsS3AccessObjectRegion: (index, region) => updateListObjectProperty('aws_s3_access_objects', index, 'region', region),
    setAwsS3AccessObjectBucket: (index, bucket) => updateListObjectProperty('aws_s3_access_objects', index, 'bucket', bucket),
    setAwsS3AccessObjectKey: (index, key) => updateListObjectProperty('aws_s3_access_objects', index, 'key', key),
    removeAwsS3AccessObject: index => removeListItem('aws_s3_access_objects', index),
  }

  /* ##################################################
   * PROP SETS FOR FORM SUBCOMPONENTS
   * ################################################## */

  const formProps = {...activeDrsObject, ...activeDrsObjectFunctions};

  const groupedFormProps = {
    id: _.pick(formProps, ['id', 'setId']),
    name: _.pick(formProps, ['name', 'setName']),
    description: _.pick(formProps, ['description', 'setDescription']),
    createdTime: _.pick(formProps, ['created_time', 'setCreatedTime']),
    updatedTime: _.pick(formProps, ['updated_time', 'setUpdatedTime']),
    version: _.pick(formProps, ['version', 'setVersion']),
    isBundle: _.pick(formProps, ['is_bundle', 'setIsBundle']),
    mimeType: _.pick(formProps, ['mime_type', 'setMimeType']),
    size: _.pick(formProps, ['size', 'setSize']),
    aliases: _.pick(formProps, ['aliases', 'addAlias', 'setAlias', 'removeAlias']),
    checksums: {..._.pick(formProps, ['checksums', 'addChecksum', 'setChecksumType', 'setChecksumChecksum', 'removeChecksum']), displayChecksumTypes: displayChecksumTypes},
    children: _.pick(formProps, ['id', 'drs_object_children', 'addChild', 'setChildId', 'setChildName', 'setChildValid', 'setChildInvalid', 'unsetChildValidity', 'removeChild']),
    parents: _.pick(formProps, ['id', 'drs_object_parents', 'addParent', 'setParentId', 'setParentName', 'setParentValid', 'setParentInvalid', 'unsetParentValidity', 'removeParent']),
    fileAccessObjects: _.pick(formProps, ['file_access_objects', 'addFileAccessObject', 'setFileAccessObjectPath', 'removeFileAccessObject']),
    awsS3AccessObjects: _.pick(formProps, ['aws_s3_access_objects', 'addAwsS3AccessObject', 'setAwsS3AccessObjectRegion', 'setAwsS3AccessObjectBucket', 'setAwsS3AccessObjectKey', 'removeAwsS3AccessObject']),
    submit: {activeDrsObject: activeDrsObject, setSuccessMessage: setSuccessMessage, ..._.pick(formProps, ['retrieveDrsObjectsList'])}, 
    delete: {setSuccessMessage: setSuccessMessage, ..._.pick(formProps, ['id', 'retrieveDrsObjectsList'])}
  }

  /* ##################################################
   * EFFECTS
   * ################################################## */

  const loadActiveDrsObjectBasedOnPath = location => {
    let re = new RegExp('/drs/([^/]+)/?([^/]*)');
    let match = location.pathname.match(re);
    if (match) {
      if(match[1] === 'new') activeDrsObjectFunctions.reset();
      else if(match[2]==='edit') {
        activeDrsObjectFunctions.reset();
        activeDrsObjectFunctions.retrieve(match[1]);
      }
      else activeDrsObjectFunctions.retrieve(match[1]);
    }
  }

  // add the history listener, modifies the activeDrsObject based on the current
  // URL path
  let history = useHistory();
  useEffect(() => {
    history.listen((location, action) => {
      loadActiveDrsObjectBasedOnPath(location);
    })
  }, [])

  // initialize the drsObjectList upon first load
  useEffect(() => {
    retrieveDrsObjectsList();
  }, []);
  
  // if the first page entered is the DrsObject page, then load it to the
  // activeDrsObject
  useEffect(() => {
    loadActiveDrsObjectBasedOnPath(history.location);
  }, []);

  // update the allowed checksum types list every time any checksum type
  // changes
  useEffect(() => {
    let transientActiveDrsObject = {...activeDrsObject};
    let transientDisplayChecksumTypes = emptyDisplayChecksumTypes();
    let checksumTypesEncountered = [];
    let unsetChecksumTypeEncountered = false;
    
    transientActiveDrsObject.checksums.forEach((checksum, index) => {
      if (checksum.type !== '') {
        if (checksumTypesEncountered.includes(checksum.type)) {
          unsetChecksumTypeEncountered = true;
          checksum.type = '';
        } else {
          transientDisplayChecksumTypes[checksum.type] = index;
          checksumTypesEncountered.push(checksum.type);
        }
      }
    })
    setDisplayChecksumTypes(transientDisplayChecksumTypes);
    console.log(transientDisplayChecksumTypes);

    if (unsetChecksumTypeEncountered) {
      setActiveDrsObject(transientActiveDrsObject);
    }
    console.log(transientActiveDrsObject);
  }, [activeDrsObject]);

  /* ##################################################
   * RENDER
   * ################################################## */

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        open={successMessage}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" variant="filled">
          {successMessage ? successMessage : null }
        </Alert>
    </Snackbar>

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
            groupedFormProps={groupedFormProps}
            formViewType={FormViewType.NEW}
          />
        </Route>
        <Route exact path='/drs/:objectId'>
          <DrsObjectForm
            title={`View DrsObject: ${activeDrsObject.id}`}
            groupedFormProps={groupedFormProps}
            formViewType={FormViewType.SHOW}
          />
        </Route>
        <Route exact path='/drs/:objectId/edit'>
          <DrsObjectForm
            title={`Edit DrsObject: ${activeDrsObject.id}`}
            groupedFormProps={groupedFormProps}
            formViewType={FormViewType.EDIT}
          />
        </Route>
      </Switch>
    </div>
  )
}
  
export default DrsMain;