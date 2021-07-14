import '@fontsource/roboto';
import React, { useState, useEffect } from 'react';
import { 
    Container,
    Typography, 
    FormControl,
    TextField, 
    Grid, 
    FormGroup, 
    Button, 
    Divider, 
    Box, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    IconButton, 
    MenuItem, 
    Tooltip,
    InputAdornment
} from '@material-ui/core';
import {
    Link
} from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { 
    DateTimePicker,
    MuiPickersUtilsProvider 
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import DrsApiCaller from '../utils/DrsApiCaller';
import Id from '../form/Id';
import Name from '../form/Name';
import Description from '../form/Description';
import CreatedTime from '../form/CreatedTime';
import UpdatedTime from '../form/UpdatedTime';
import Version from '../form/Version';
import BundleBlobRadio from '../form/BundleBlobRadio';
import MimeType from '../form/MimeType';
import Size from '../form/Size';
import Aliases from '../form/Aliases';
import Checksums from '../form/Checksums';
import DrsObjectChildren from '../form/DrsObjectChildren';
import DrsObjectParents from '../form/DrsObjectParents';
import {
    useParams,
    useHistory
  } from "react-router-dom";
import { HistoryTwoTone } from '@material-ui/icons';

const SpaceDivider = () => {
    return (
        <Box py={4}>
            <Divider />
        </Box>
    );
}

/* AddPropertyButton displays a "+" icon and can be used to add additional fields for list-type items. It is passed a handler function 
as a prop, which should append another instance of the item to the list of items being updated. */
const AddPropertyButton = (props) => {
    if(!props.readOnlyForm) {
        return (
            <Grid container>
                <Grid item>
                    <Tooltip title={`Add another ${props.objectName}.`}>
                        <IconButton color='primary' onClick={props.handleClick} disabled={props.disabled}>
                            <AddCircleIcon/>
                        </IconButton>   
                    </Tooltip>    
                </Grid>
            </Grid>
        );
    }
    else return null;
}

/* RemovePropertyButton displays a "-" icon and can be used to remove instances of list-type items. It is passed a handler function 
as a prop, which should remove the specified instance from the list of items being updated. It is also passed an index value as a prop, 
which should be used to identify the specific object instance to be removed. */
const RemovePropertyButton = (props) => {
    if(!props.readOnlyForm) {
        return (
            <Grid item xs={1}>
                <Tooltip title={`Remove this ${props.objectName}.`}>
                    <IconButton color='secondary' onClick={() => props.handleClick(props.index)}>
                        <RemoveCircleIcon/>
                    </IconButton>
                </Tooltip>
            </Grid>
        );
    }
    else return null;
}

/* VerifyIdButton is used to verify if the ID entered for a parent or child DRS Object is valid. When the button is clicked, a GET request for
the given ID will be made. If an error is returned, the object is set as invalid. If an object is successfully returned, it is valid, unless the 
property to be updated is "drs_object_parents" and the DRS Object returned is an existing blob-type object. Since blob-type objects cannot have 
children, they cannot be set as parent objects.
If the ID has been verified and is valid, it will display a blue checkmark icon in place of the "Verify" button and the name field will be 
automatically populated.
If the ID has been verified and is invalid, a red "X" icon will be displayed and the name field will not be populated.
If the ID has not been verified, or has been edited since being verified, the "Verify" button is displayed.
If the ID field is empty, the "Verify" button is displayed and disabled. */

const VerifyIdButton = (props) => {
    const [objectId, setId] = useState(''); //objectId holds the value that is passed to the UseDrsStarterKit hook to make the API request
    let id = props.relatedDrsObject.id; //id holds the current state of relatedDrsObject.id which is the the value displayed and updated in the id field
    let disabled = false;
    const cancelToken = axios.CancelToken;
    const drsCancelToken = cancelToken.source();
    let requestConfig = {
        url: `http://localhost:8080/admin/ga4gh/drs/v1/objects/${objectId}`,
        method: 'GET',
        cancelToken: drsCancelToken.token
    };

    let activeDrsObject = {...props.activeDrsObject};
    let relatedObjectsList = activeDrsObject[props.property];
    let relatedObject = {...relatedObjectsList[props.index]};

    const handleResponse = (response) => {
        relatedObject.name = response.name;
        if(props.property === 'drs_object_parents' && !response.is_bundle) {
            relatedObject.isValid = false;
        }
        else {
            relatedObject.isValid = true;
        }
        relatedObjectsList[props.index] = relatedObject;
        props.drsObjectFunctions.setActiveDrsObject(activeDrsObject);
        props.drsObjectFunctions.updateValidRelatedDrsObjects(props.property);
    }

    const handleError = (error) => {
        relatedObject.name = '';
        relatedObject.isValid = false;
        relatedObjectsList[props.index] = relatedObject;
        props.drsObjectFunctions.setActiveDrsObject(activeDrsObject);
        props.drsObjectFunctions.updateValidRelatedDrsObjects(props.property);
    }
    
    /* UseDrsStarterKit hook is used to make the API GET request to retrieve the related DRS Object information. The hook is called when the 
    VerifyIdButton component is rendered and passes objectId to determine if it is valid. Prior to clicking the "Verify" button for the first 
    time, objectId is an empty string, and therefore the GET request is not made. When the "Verify" button is clicked, the ObjectId property 
    is updated to the value currently entered in the text field. When objectId is updated (when the "Verify" button is clicked and the objectId 
    value changes), a new API GET request is made to determine if the new objectId is valid. Although the id property is updated whenever the 
    textfield is edited, objectId is only updated when the "Verify" button is clicked. Therefore, the GET request is made when the "Verify" 
    button is clicked, resulting in validation of the updated objectId. */

    return (
        <h2>VerifyIdButton</h2>
    )

    /*
    DrsApiCaller(requestConfig, handleResponse, handleError, objectId, drsCancelToken);

    if(id === '') {
        disabled = true;
    }
    if(!props.readOnlyForm && relatedObject.isValid === undefined) {
        return(
            <Button color='primary' disabled={disabled} variant='contained' size='small' onClick={() => setId(id)}>
                <Tooltip title='Submit this ID for verification.'>
                    <Typography variant='button'>Verify ID</Typography>
                </Tooltip>
            </Button>
        );
    }
    else if(!props.readOnlyForm && relatedObject.isValid === true) {
        return(
            <IconButton color='primary'>
                <Tooltip title='This is a valid ID.'>
                    <CheckCircleIcon/>
                </Tooltip>
            </IconButton>
        );
    }
    else if(!props.readOnlyForm && relatedObject.isValid === false) {
        return(
            <IconButton color='secondary'>
                <Tooltip title='This is an invalid ID. Please enter a valid ID before proceeding.'>
                    <CancelIcon/>
                </Tooltip>
            </IconButton>
        );
    }
    else return null;
    */
}

/* When the form is editable, each related DRS Object displays the RemovePropertyButton. When the form is read-only, each related DRS Object 
displays the "Details" button, which links to the associated DRS Object. */
const RelatedDrsObjectButton = (props) => {
    if(!props.readOnlyForm) {
        return(
            <RemovePropertyButton objectName={props.objectName} index={props.index} readOnlyForm={props.readOnlyForm}
            handleClick={(index) => {
                props.drsObjectFunctions.removeListItem(props.relationship, index);
                props.drsObjectFunctions.updateValidRelatedDrsObjects(props.relationship);
            }}/>
        );
    }
    else {
        return(
            <Grid item xs={2}>
                <Tooltip title={`View details about this ${props.objectName}.`} id={`DetailsTooltip${props.relationship}${props.index}`}>
                    <Button variant='contained' component={Link} to={`/drs/${props.relatedDrs.id}`} color='primary'>
                        <Typography variant='button'>Details</Typography>
                    </Button>
                </Tooltip>    
            </Grid>
        )
    }
}

/* Related DRS Objects include DRS Object Children and DRS Object Parents, each of which can be added or removed. The ID of the related
DRS Object is entered in the text field. If the ID is valid, the name field is automatically populated by clicking the "Verify" button. 
Drs Object Children are only displayed for bundle-type DRS Objects. */
const RelatedDrsObject = (props) => {
    if(props.readOnlyForm && !props.relatedDrsObjects) {
        return null;
    }
    else if(!props.readOnlyForm && props.relationship === 'drs_object_children' && !props.isBundle) {
        return null;
    }
    else {
        if(!props.relatedDrsObjects) {
            return null;
        }
        const relatedDrsFields = props.relatedDrsObjects.map((relatedDrs, index) => {
            return (
                <FormGroup key={props.relationship + index} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`ID_${props.relationship}${index}`} 
                                label='Id' name={relatedDrs.id} value={relatedDrs.id} margin='normal' type='text' 
                                onChange={(event) => {
                                    props.drsObjectFunctions.updateObjectProperty(props.relationship, index, 'id', event.target.value);
                                    props.drsObjectFunctions.updateObjectProperty(props.relationship, index, 'isValid', undefined);
                                }}
                                InputProps={
                                    {
                                        readOnly: props.readOnlyForm,
                                        endAdornment: 
                                            <InputAdornment position='end'>
                                                <VerifyIdButton 
                                                relatedDrsObject={relatedDrs} 
                                                activeDrsObject={props.activeDrsObject} 
                                                readOnlyForm={props.readOnlyForm} 
                                                drsObjectFunctions={props.drsObjectFunctions} 
                                                index={index} 
                                                property={props.relationship}/>
                                            </InputAdornment>
                                    }
                                } >
                                </TextField>                        
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`Name_${props.relationship}${index}`} 
                                label='Name' margin='normal' name={relatedDrs.name} type='text' 
                                value={relatedDrs.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <RelatedDrsObjectButton relatedDrs={relatedDrs} readOnlyForm={props.readOnlyForm} index={index} 
                        drsObjectFunctions={props.drsObjectFunctions} objectName={props.objectName} relationship={props.relationship}/>
                    </Grid>
                </FormGroup>
            );
        })
        return (
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>{props.header}</Typography>
                {props.sectionDescription}
                {relatedDrsFields}
                <AddPropertyButton objectName={props.objectName} readOnlyForm={props.readOnlyForm} 
                handleClick={() => props.drsObjectFunctions.addListItem(props.relationship, props.drsObjectProperties.newRelatedDrsObject)}/>
            </FormGroup>
        );
    }
}

/* AccessPoints are displayed for blob-type DRS objects and inlcude FileAccessObjects and AwsS3AccessObjects, both of which can be added and removed. */
const AccessPoints = (props) => {
    let fileAccessObjects = props.activeDrsObject.file_access_objects;
    let awsS3AccessObjects = props.activeDrsObject.aws_s3_access_objects;
    if(props.isBundle || (!fileAccessObjects && !awsS3AccessObjects)) {
        return null;
    }
    else {
        return(
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>Access Points</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>
                    A DRS Object may contain multiple access points for fetching 
                    the raw bytes. Multiple access points give the client options 
                    in choosing the best data source for their use case (e.g.
                    based on geographic proximity to the data). All access points
                    associated with a single DRS Object must have the same bytes.
                </Typography>
                <FileAccessObjects fileAccessObjects={fileAccessObjects} readOnlyForm={props.readOnlyForm}
                drsObjectFunctions={props.drsObjectFunctions} drsObjectProperties={props.drsObjectProperties}/>
                <AwsS3AccessObjects awsS3AccessObjects={awsS3AccessObjects} readOnlyForm={props.readOnlyForm}
                drsObjectFunctions={props.drsObjectFunctions} drsObjectProperties={props.drsObjectProperties}/>
            </FormGroup>
        );
    }
}

const FileAccessObjects = (props) => {
    let fileAccessObjects  = props.fileAccessObjects;
    if(!fileAccessObjects){
        return null;
    }
    else {
        const fileAccessDisplay = fileAccessObjects.map((fileAccessObject, index) => {
            return (
                <Grid container alignItems='center' spacing={4} key={`FileAccessObject${index}`}>
                    <Grid item xs>
                        <FormControl fullWidth>
                            <TextField variant='outlined' id={`FileAccessObject${index}`} 
                            label='Path' margin='normal' name='path' type='text' 
                            value={fileAccessObject.path} InputProps={{readOnly: props.readOnlyForm}} 
                            helperText='The filesystem path to the local file storing DRS Object bytes'
                            onChange={(event) => props.drsObjectFunctions.updateObjectProperty('file_access_objects', index, 'path', event.target.value)}/>
                        </FormControl>
                    </Grid>
                    <RemovePropertyButton objectName='local file access point' index={index} readOnlyForm={props.readOnlyForm} 
                    handleClick={(index) => props.drsObjectFunctions.removeListItem('file_access_objects', index)} />
                </Grid>
                
            );
        })
        return (
            <FormGroup>
                <br /> 
                <Typography align='left' variant='body1'>Local File Access Points</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>
                    Local file access points represent local files available on
                    the same filesystem where the DRS service is running. This
                    can also include files co-located on Network Attached Storage
                    (NAS), such as on a high-performance compute cluster (HPC).                    
                </Typography>
                {fileAccessDisplay}
                <AddPropertyButton objectName='local file access point' readOnlyForm={props.readOnlyForm} 
                handleClick={() => props.drsObjectFunctions.addListItem('file_access_objects', props.drsObjectProperties.newFileAccessObject)}/>
            </FormGroup>
        );
    }
}

const AwsS3AccessObjects = (props) => {
    let awsS3AccessObjects = props.awsS3AccessObjects;
    if(!awsS3AccessObjects) {
        return null;
    }
    else {
        const awsS3AccessDisplay = awsS3AccessObjects.map((awsS3AccessObject, index) => {
            return (
                <FormGroup key={`AwsS3AccessObject${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`region${index}`} 
                                label='Region' margin='normal' name='region' type='text' 
                                value={awsS3AccessObject.region} InputProps={{readOnly: props.readOnlyForm}} 
                                helperText='Region where AWS S3 service is located.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'region', event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`bucket${index}`} 
                                label='Bucket' margin='normal' name='bucket' type='text' 
                                value={awsS3AccessObject.bucket} InputProps={{readOnly: props.readOnlyForm}} 
                                helperText='AWS S3 bucket containing the DRS Object.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'bucket', event.target.value)} />                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`key${index}`} 
                                label='Key' margin='normal' name='key' type='text' 
                                value={awsS3AccessObject.key} InputProps={{readOnly: props.readOnlyForm}} 
                                helperText='Path within the bucket to the S3 object storing DRS Object bytes.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'key', event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <RemovePropertyButton objectName='AWS S3 access point' index={index} readOnlyForm={props.readOnlyForm}
                        handleClick={(index) => props.drsObjectFunctions.removeListItem('aws_s3_access_objects', index)}/>
                    </Grid>
                </FormGroup>
            );
        })
        return (
            <FormGroup>
                <br /> 
                <Typography align='left' variant='body1'>AWS S3 Access Points</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>
                    Represents objects stored in AWS S3 containing DRS Object bytes.
                </Typography>
                {awsS3AccessDisplay}
                <AddPropertyButton objectName='AWS S3 access point' readOnlyForm={props.readOnlyForm}
                handleClick={() => props.drsObjectFunctions.addListItem('aws_s3_access_objects', props.drsObjectProperties.newAwsS3AccessObject)}/>
            </FormGroup>
        );
    }
}

const ErrorMessage = (props) => {
    if(!props.error) {
        return null;
    }
    else {
        return(
        <Box pb={4}>
            <Typography align='center' color='secondary'>DRS Object was not created successfully.</Typography>
            <Typography align='center' color='secondary'>{props.error.message}</Typography>
        </Box>
        );
    }
}

const InvalidDrsObjectMessage = (props) => {
    if(props.validId && props.validRelatedDrs) {
        return null;
    }
    else {
        return( 
            <Box pb={4} px={20}>
                <Typography align='center' color='secondary' variant='h6'>This DRS Object is invalid.</Typography>
                <Typography align='center' color='secondary'>
                    Please ensure that the DRS Object has a unique ID 
                    and that all Parent Bundles and Bundle Children are 
                    valid. Note that blob-type DRS Objects that do not 
                    have Bundle Children cannot be set as Parent Bundles 
                    for this DRS Object.
                </Typography>
            </Box>
        );
    }
}

/* SubmitButton is used to make a POST request to create a new DRS Object. If the id field is empty or if any of the related DRS 
Objects are invalid, the InvalidDrsObjectMessage component is displayed and the button is disabled. When the SubmitButton is clicked, 
the activeDrsObject is "cleaned up" to ensure that the correct properties are submitted to the POST request based on whether the DRS 
Object is a blob or a bundle. If the POST request is successful, the user is redirected to the DRS Index page. However, if it is 
unsuccessful, the user is not redirected and the ErrorMessage component is displayed. */
const SubmitButton = (props) => {
    console.log(props.activeDrsObject)
    return (
        <FormControl fullWidth>
            <SpaceDivider/>
            <Button variant='contained' color='primary'
            onClick={() => 
            {
                console.log(props.activeDrsObject);
            }}>
                Submit
            </Button>
        </FormControl>
    );
    /*
    const [newDrsObjectToSubmit, setNewDrsObjectToSubmit] = useState('');
    const [error, setError] = useState(null);
    let activeDrsObject = props.activeDrsObject;
    const scalarProperties = ['description', 'created_time', 'name', 'updated_time', 'version', 'is_bundle'] 
    const blobScalarProperties = ['mime_type', 'size']
    const blobListProperties = ['aliases', 'checksums', 'drs_object_parents', 'file_access_objects', 'aws_s3_access_objects'];
    const bundleListProperties = ['aliases', 'drs_object_parents', 'drs_object_children'];

    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects');
    const cancelToken = axios.CancelToken;
    const newDrsCancelToken = cancelToken.source();

    let requestConfig = {
        url: requestUrl,
        method: 'POST',
        data: newDrsObjectToSubmit,
        cancelToken: newDrsCancelToken.token
    };
    
    const relatedDrsObjects = (property) => {
        let relatedDrsObjects = [];
        if(activeDrsObject[property]) {
            activeDrsObject[property].map((relatedDrs) => {
                if(relatedDrs.isValid) {
                    let relatedDrsObject = {
                        id: relatedDrs.id
                    }
                    relatedDrsObjects.push(relatedDrsObject);    
                }
            })
        }
        return relatedDrsObjects;   
    }

    const getNewDrsObject = () => {
        let newDrsObject = {
            id: activeDrsObject.id
        };

        scalarProperties.map((property) => {
            if(activeDrsObject[property]) {
                newDrsObject[property] = activeDrsObject[property];
            }
        })

        if(!activeDrsObject.is_bundle) {
            blobScalarProperties.map((property) => {
                if(activeDrsObject[property]) {
                    newDrsObject[property] = activeDrsObject[property];
                }
            })
            blobListProperties.map((property) => {
                if(activeDrsObject[property] && Object.keys(activeDrsObject[property]).length > 0) {
                    if(property === 'drs_object_parents') {
                        newDrsObject[property] = relatedDrsObjects(property);
                    }
                    else {
                        newDrsObject[property] = activeDrsObject[property];
                    }
                }
            })
        }
        else { 
            bundleListProperties.map((property) => {
                if(activeDrsObject[property] && Object.keys(activeDrsObject[property]).length > 0) {
                    if(property === 'aliases') {
                        newDrsObject[property] = activeDrsObject[property];
                    }
                    else {
                        newDrsObject[property] = relatedDrsObjects(property);
                    }
                }
            })
        }
        console.log(newDrsObject); 
        return newDrsObject;   
    }

    const handleResponse = (response) => {
        console.log(response);
        props.updateSubmitNewDrsRedirect(true);
    }

    const handleError = (error) => {
        console.log(error);
        setError(error);
    }

    let submitButtonDisabled = false;
    if(!activeDrsObject.validId || !activeDrsObject.validRelatedDrsObjects) {
        submitButtonDisabled = true;
    } 
    else {
        submitButtonDisabled = false;
    }

    /* UseDrsStarterKit hook is used to make API POST request. The hook is called when the SubmitButton component is rendered and passes the 
    newDrsObjectToSubmit object within the request body. Prior to clicking the "Submit" button for the first time, newDrsObjectToSubmit is an 
    empty object, and therefore the POST request is not made. When the "Submit" button is clicked, the newDrsObjectToSubmit property is updated, 
    resulting in the POST request being made. */
    /*
    DrsApiCaller(requestConfig, handleResponse, handleError, newDrsObjectToSubmit.id, newDrsCancelToken);

    if(!props.readOnlyForm) {
        return (
            <FormControl fullWidth>
                <SpaceDivider/>
                <ErrorMessage error={error} />
                <InvalidDrsObjectMessage validId={activeDrsObject.validId} validRelatedDrs={activeDrsObject.validRelatedDrsObjects}/>
                <Button variant='contained' color='primary' disabled={submitButtonDisabled}
                onClick={() => 
                {
                    let newDrsObject = getNewDrsObject();
                    if(!error && activeDrsObject.validId && activeDrsObject.validRelatedDrsObjects) {
                        setNewDrsObjectToSubmit(newDrsObject);
                    }
                }}>
                    Submit
                </Button>
            </FormControl>
        );
    }
    else return null;
    */
}

const DrsObjectForm = (props) => {
    let activeDrsObject = props.activeDrsObject;
    let readOnlyId = props.readOnlyId;
    let readOnlyForm = props.readOnlyForm;
    
    const name = {...props.name, readOnly: props.readOnlyForm};
    const description = {...props.description, readOnly: props.readOnlyForm};
    const createdTime = {...props.createdTime, readOnly: props.readOnlyForm};
    const updatedTime = {...props.updatedTime, readOnly: props.readOnlyForm};
    const version = {...props.version, readOnly: props.readOnlyForm};
    const isBundle = {...props.isBundle, readOnly: props.readOnlyForm};
    const aliases = {...props.aliases, readOnly: props.readOnlyForm};
    const checksums = {...props.checksums, readOnly: props.readOnlyForm};
    const children = {...props.children, readOnly:props.readOnlyForm};
    const parents = {...props.parents, readOnly: props.readOnlyForm};

    return (
      <div>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Container maxWidth='lg'>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={2} align='left'>
                    <Button variant='contained' component={Link} to='/drs' color='primary' size='large'>
                        <Typography variant='button'>DRS Index</Typography>
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <Typography align='center' variant="h3" gutterBottom>{props.title}</Typography>
                </Grid>
                <Grid item xs={2} />
            </Grid>
            <Box pb={4}>
                <form>
                    <Id
                        id={props.activeDrsObject.id}
                        setId={props.activeDrsObjectFunctions.setId}
                        readOnlyId={props.readOnlyId}
                    />
                    <Name {...name} />
                    <Description {...description} />

                    <Grid container justify='space-evenly' spacing={4}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <CreatedTime {...createdTime} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <UpdatedTime {...updatedTime} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <Version {...version} />
                        </Grid>
                    </Grid>

                    <BundleBlobRadio {...isBundle} />

                    {isBundle.is_bundle
                        ? null
                        :
                            <Grid container justify='flex-start' spacing={4}>
                                <Grid item xs={4}>
                                    <MimeType
                                        mimeType={props.activeDrsObject.mime_type}
                                        setMimeType={props.activeDrsObjectFunctions.setMimeType}
                                        readOnly={props.readOnlyForm} drsObjectFunctions={props.drsObjectFunctions}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Size
                                        size={props.activeDrsObject.size}
                                        setSize={props.activeDrsObjectFunctions.setSize}
                                        readOnly={props.readOnlyForm}
                                    />
                                </Grid>
                            </Grid>
                    }
                    
                    <Aliases {...aliases} />

                    {isBundle.is_bundle
                        ? <DrsObjectChildren {...children} />
                        : <Checksums {...checksums} displayChecksumTypes={props.displayChecksumTypes} />
                    }

                    <DrsObjectParents {...parents} />
                    
                    <AccessPoints
                        activeDrsObject={activeDrsObject}
                        readOnlyForm={readOnlyForm}
                        isBundle={isBundle}
                        drsObjectFunctions={props.drsObjectFunctions}
                        drsObjectProperties={props.drsObjectProperties}
                    />
                    
                    <SubmitButton
                        activeDrsObject={activeDrsObject}
                        readOnlyForm={readOnlyForm} 
                        drsObjectFunctions={props.drsObjectFunctions}
                        updateSubmitNewDrsRedirect={props.updateSubmitNewDrsRedirect}
                    />
                </form>
            </Box>
        </Container>
      </div>
    );
}

export default DrsObjectForm;
