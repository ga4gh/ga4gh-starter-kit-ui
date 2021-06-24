import '@fontsource/roboto';
import React, {useState} from 'react';
import { 
    Typography, 
    Container, 
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
import { v4 as uuidv4 } from 'uuid';
import useDrsObjectDetails from './UseDrsObjectDetails';
import useNewDrsObject from './UseNewDrsObject';

const SpaceDivider = () => {
    return (
        <Box py={4}>
            <Divider />
        </Box>
    );
}

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

const BundleBlobRadio = (props) => {
    let value = 'blob';
    if(props.isBlob) value = 'blob';
    else if (props.isBundle) value = 'bundle';
    else value = 'blob';
    if(!props.readOnlyForm) {
        return(
            <FormGroup>
                <Typography align='left' variant='h6'>Is this DRS Object a bundle or a blob?</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>
                    Bundles contain references to Child Drs Objects, while Blobs act as single DRS Objects and do not have any children.
                </Typography>
                <RadioGroup name='drs_object_type' value={value} onChange={e => props.drsObjectFunctions.updateDrsObjectType(e.target.value)}>
                    <FormControlLabel control={<Radio color='primary'/>} label='Blob' value='blob' disabled={props.readOnlyForm}></FormControlLabel>
                    <FormControlLabel control={<Radio color='primary'/>} label='Bundle' value='bundle' disabled={props.readOnlyForm}></FormControlLabel>
                </RadioGroup>
            </FormGroup>
        );
    }
    else return null;
}

const GenerateIdButton = (props) => {
    if(!props.readOnlyId) {
        return(
            <Grid item xs={2} align='right'>
                <Button variant='contained' color='primary' onClick={() => props.drsObjectFunctions.updateScalarProperty('id', uuidv4())}>
                    <Typography variant='button'>Generate ID</Typography>
                </Button>
            </Grid>     
        );
    }
    else return null;
}

const Id = (props) => {
    return(
        <Grid container spacing={4} alignItems='center' justify='space-between'>
            <Grid item xs>
                <FormControl fullWidth>
                    <TextField id='id' label='Id' margin='normal' name='id' type='text'
                    value={props.activeDrsObject.id} InputProps={{readOnly: props.readOnlyId}} 
                    onChange={(event) => props.drsObjectFunctions.updateScalarProperty('id', event.target.value)}
                    helperText='Unique identifier for this DRS Object (UUID recommended), cannot be modified later.'/>
                </FormControl>
            </Grid>
            <GenerateIdButton readOnlyId={props.readOnlyId} drsObjectFunctions={props.drsObjectFunctions}/>
        </Grid>     
    );  
}

const SimpleTextField = (props) => {
    if(!props.property && props.readOnlyForm) {
        return null;
    }
    else {
        return(
            <FormControl fullWidth>
                <TextField id={props.propertyName} label={props.label} margin='normal' name={props.propertyName} type='text' 
                value={props.property} InputProps={{readOnly: props.readOnlyForm}}
                onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                helperText={props.description}/>
            </FormControl>
        );
    }
}

const DateTimeField = (props) => {
    if(!props.value && props.readOnlyForm) {
        return null;
    }
    else {
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormControl fullWidth>
                    <DateTimePicker id={props.parameterName} label={props.label} margin='normal' name={props.parameterName} value={props.value} 
                    format='yyyy-MM-dd HH:mm:ss' readOnly={props.readOnlyForm} showTodayButton ampm={false} helperText={props.description}
                    onChange={date => {
                        date.setSeconds(0, 0);
                        props.drsObjectFunctions.updateScalarProperty(props.parameterName, date.toISOString());
                    }} />
                </FormControl>
            </MuiPickersUtilsProvider>
        );    
    }
}

const MimeType = (props) => {
    let mimeType = props.mimeType;
    if(props.isBlob !== true || (!mimeType && props.readOnlyForm)) {
        return null;
    }
    else {
        return (
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField id='mime_type' label='MIME Type' margin='normal' name='mime_type' type='text' value={mimeType}
                    InputProps={{readOnly: props.readOnlyForm}} helperText='The media type of the DRS Object' 
                    onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)} />
                </FormControl>    
            </Grid>
        );
        
    }
}

const Size = (props) => {
    let size = props.size;
    if(props.isBlob !== true || (!size && props.readOnlyForm)) {
        return null;
    }
    else {
        return (
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField id='size' label='Size' margin='normal' name='size' type='number' value={size} 
                    InputProps={{readOnly: props.readOnlyForm}} helperText='The size (in bytes) of the DRS Object represented as an integer.'
                    onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}/>
                </FormControl>    
            </Grid>
        );
    }
}

const Aliases = (props) => {
    let aliases = props.aliases;
    if(!aliases) {
        return null;
    }
    else {
        const aliasesDisplay = aliases.map((alias, index) => {
            return (
                <Grid item key={`alias${index}`}>
                    <FormGroup row>
                        <FormControl>
                            <TextField variant='outlined' id={`alias${index}`} margin='normal' name='alias' label='Alias' type='text' 
                            value={alias} InputProps={{readOnly: props.readOnlyForm}} 
                            onChange={event => props.drsObjectFunctions.updateAlias(index, event.target.value)}/>
                        </FormControl>
                        <Box zIndex={1} position='relative' right='10%' top={-10}>
                            <RemovePropertyButton index={index} objectName='alias' readOnlyForm={props.readOnlyForm}
                            handleClick={(index) => props.drsObjectFunctions.removeAlias(index)}/>    
                        </Box>    
                    </FormGroup>
                    
                </Grid>
            );  
        })
        
        return (
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>Aliases</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>
                    A list of aliases that can be used to identify the DRS Object
                    by additional names
                </Typography>
                <br />
                <FormGroup row>
                   <Grid container spacing={4} alignItems='center'>
                       {aliasesDisplay}
                       <Grid item>
                            <AddPropertyButton objectName='alias' readOnlyForm={props.readOnlyForm}
                            handleClick={() => props.drsObjectFunctions.addListItem('aliases', props.drsObjectFunctions.newAlias)}/>
                       </Grid>
                   </Grid>
                </FormGroup>
            </FormGroup>
        );
    }
}

const Checksums = (props) => {
    let checksums = props.checksums;
    let disableAddButton = false;
    if(checksums && Object.keys(checksums).length === 3) {
        disableAddButton = true;
    } 
    if(props.isBlob !== true) {
        return null;
    }
    else {
        const checksumsDisplay = checksums.map((checksum, index) => {
            return (
                <FormGroup key={`checksum${index}`} row>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField select variant='outlined' id={`ChecksumType${index}`} label='Type' name='type' type='text' align='left' 
                                value={checksum.type} InputProps={{readOnly: props.readOnlyForm}} helperText='Hashing algorithm used to generate the checksum.' 
                                onChange={(event) => props.drsObjectFunctions.updateChecksumType(index, event.target.value)}>
                                    <MenuItem id='md5' value='md5' disabled={props.checksumTypes.md5.disabled}>md5</MenuItem>
                                    <MenuItem id='sha1' value='sha1' disabled={props.checksumTypes.sha1.disabled}>sha1</MenuItem>
                                    <MenuItem id='sha256' value='sha256' disabled={props.checksumTypes.sha256.disabled}>sha256</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={`ChecksumValue${index}`} label='Checksum' name='checksum' type='checksum' 
                                value={checksum.checksum} InputProps={{readOnly: props.readOnlyForm}} helperText='Checksum digest value.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('checksums', index, 'checksum', event.target.value)}/>
                            </FormControl>    
                        </Grid>   
                        <RemovePropertyButton objectName='checksum' index={index} readOnlyForm={props.readOnlyForm} 
                        handleClick={(index) => props.drsObjectFunctions.removeChecksumItem(index)}/>
                    </Grid>
                </FormGroup>
            );
        })
        return(
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>Checksums</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>
                    Each single-blob DRS Object must report one or more checksums,
                    recording the digest algorithm and value of the DRS Object
                    bytes.
                    The following list displays the recorded digest algorithms
                    and corresponding values for this DRS Object.
                </Typography>
                <br />
                {checksumsDisplay} 
                <AddPropertyButton objectName='checksum' readOnlyForm={props.readOnlyForm} disabled={disableAddButton}
                handleClick={() => props.drsObjectFunctions.addListItem('checksums', props.drsObjectFunctions.newChecksum)}/>
            </FormGroup>
        );
    }
}

const VerifyIdButton = (props) => {
    const [objectId, setId] = useState('');
    let id = props.relatedDrsObject.id;
    let disabled = false;

    let drsObjectDetails = {...props.activeDrsObject};
    let relatedObjectsList = drsObjectDetails[props.property];
    let relatedObject = {...relatedObjectsList[props.index]};

    const handleResponse = (response) => {
        console.log(response.name);
        relatedObject.name = response.name;
        relatedObject.isValid = true;
        relatedObjectsList[props.index] = relatedObject;
        props.updateActiveDrsObject(drsObjectDetails);
    }

    const handleError = (error) => {
        relatedObject.name = '';
        relatedObject.isValid = false;
        relatedObjectsList[props.index] = relatedObject;
        props.updateActiveDrsObject(drsObjectDetails);
    }

    useDrsObjectDetails(relatedObject, handleResponse, handleError, objectId);

    if(id === '') {
        disabled = true;
    }
    if(!props.readOnlyForm && relatedObject.isValid === '') {
        console.log(id);
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
}

const RelatedDrsObjectButton = (props) => {
    if(!props.readOnlyForm) {
        return(
            <RemovePropertyButton objectName={props.objectName} index={props.index} readOnlyForm={props.readOnlyForm}
            handleClick={(index) => props.drsObjectFunctions.removeListItem(props.relationship, index)}/>
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

const RelatedDrsObject = (props) => {
    let relatedDrsObjects = props.relatedDrsObjects;
    let relationship = props.relationship;
    if(relationship === 'drs_object_children' && props.isBundle !== true) {
        return null;
    }
    else if(relationship === 'drs_object_parents' && !relatedDrsObjects){
        return null;
    }
    else {
        const relatedDrsFields = relatedDrsObjects.map((relatedDrs, index) => {
            return (
                <FormGroup key={relationship + index} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`ID_${relationship}${index}`} 
                                label='Id' name={relatedDrs.id} value={relatedDrs.id} margin='normal' type='text' 
                                onChange={(event) => {
                                    props.drsObjectFunctions.updateObjectProperty(relationship, index, 'id', event.target.value);
                                    props.drsObjectFunctions.updateObjectProperty(relationship, index, 'isValid', '');
                                }}
                                InputProps={
                                    {readOnly: props.readOnlyForm,
                                    endAdornment: 
                                        <InputAdornment position='end'>
                                            <VerifyIdButton relatedDrsObject={relatedDrs} 
                                            activeDrsObject={props.activeDrsObject} 
                                            readOnlyForm={props.readOnlyForm} 
                                            drsObjectFunctions={props.drsObjectFunctions} 
                                            updateActiveDrsObject={props.updateActiveDrsObject} 
                                            index={index} 
                                            property={relationship}/>
                                        </InputAdornment>
                                    }
                                } >
                                </TextField>                        
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`Name_${relationship}${index}`} 
                                label='Name' margin='normal' name={relatedDrs.name} type='text' 
                                value={relatedDrs.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <RelatedDrsObjectButton relatedDrs={relatedDrs} readOnlyForm={props.readOnlyForm} index={index} 
                        drsObjectFunctions={props.drsObjectFunctions} objectName={props.objectName} relationship={relationship}/>
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
                handleClick={() => props.drsObjectFunctions.addListItem(relationship, props.drsObjectFunctions.newRelatedDrsObject)}/>
            </FormGroup>
        );
    }
}

const AccessPoints = (props) => {
    let fileAccessObjects = props.drsObject.file_access_objects;
    let awsS3AccessObjects = props.drsObject.aws_s3_access_objects;
    if(props.isBlob !== true || (!fileAccessObjects && !awsS3AccessObjects)) {
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
                <FileAccessObjects file_access_objects={fileAccessObjects} readOnlyForm={props.readOnlyForm}
                drsObjectFunctions={props.drsObjectFunctions}/>
                <AwsS3AccessObjects aws_s3_access_objects={awsS3AccessObjects} readOnlyForm={props.readOnlyForm}
                drsObjectFunctions={props.drsObjectFunctions}/>
            </FormGroup>
        );
    }
}

const FileAccessObjects = (props) => {
    let fileAccessObjects = props.file_access_objects;
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
                handleClick={() => props.drsObjectFunctions.addListItem('file_access_objects', props.drsObjectFunctions.newFileAccessObject)}/>
            </FormGroup>
        );
    }
}

const AwsS3AccessObjects = (props) => {
    let awsS3AccessObjects = props.aws_s3_access_objects;
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
                handleClick={() => props.drsObjectFunctions.addListItem('aws_s3_access_objects', props.drsObjectFunctions.newAwsS3AccessObject)}/>
            </FormGroup>
        );
    }
}

const SubmitButton = (props) => {
    const [newDrsObjectToSubmit, setNewDrsObjectToSubmit] = useState('');
    const [error, setError] = useState(null);
    let activeDrsObject = props.activeDrsObject;
    const scalarProperties = ['description', 'created_time', 'name', 'updated_time', 'version']
    const blobScalarProperties = ['mime_type', 'size']
    const blobListProperties = ['aliases', 'checksums', 'drs_object_parents', 'file_access_objects', 'aws_s3_access_objects'];
    const bundleListProperties = ['aliases', 'drs_object_parents', 'drs_object_children'];

    //console.log(newDrsObjectToSubmit);
    
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

    const newDrsObject = () => {
        let newDrsObject = {
            id: activeDrsObject.id
        };

        scalarProperties.map((property) => {
            if(activeDrsObject[property]) {
                newDrsObject[property] = activeDrsObject[property];
            }
        })

        if(activeDrsObject.isBlob) {
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
        //if successful notify user and/or navigate to DrsShow page for new object
    }

    const handleError = (error) => {
        console.log(error);
        setError(error);
    }

    useNewDrsObject(handleResponse, handleError, newDrsObjectToSubmit);

    if(!props.readOnlyForm && error) {
        return (
            <div>
                <SpaceDivider /> 
                <Typography align='center' color='secondary'>New DRS Object was not created successfully.</Typography>
                <Typography align='center' color='secondary'>Error: {error.message}</Typography>   
                <FormControl fullWidth>
                    <SpaceDivider/>
                    <Button variant='contained' color='primary' onClick={() => setNewDrsObjectToSubmit(newDrsObject())}>Submit</Button>
                </FormControl>
            </div>
        );
    }
    else if(!props.readOnlyForm) {
        return (
            <FormControl fullWidth>
                <SpaceDivider/>
                <Button variant='contained' color='primary' /* component={Link} to={`/drs`} */
                onClick={() => 
                {
                    console.log('clicked!');
                    setNewDrsObjectToSubmit(newDrsObject());
                    //props.getDrsObjectsList();
                }}>Submit</Button>
            </FormControl>
        );
    }
    else return null;
}

const DrsObjectForm = (props) => {
    let activeDrsObject = props.drsObjectDetails;
    let readOnlyId = props.readOnlyId;
    let readOnlyForm = props.readOnlyForm;
    let isBlob = props.drsObjectDetails.isBlob;
    let isBundle = props.drsObjectDetails.isBundle;

    return (
      <div>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Box pb={4}>
            <form>
                <Id activeDrsObject={activeDrsObject} drsObjectFunctions={props.drsObjectFunctions} readOnlyId={readOnlyId}/>
                <SimpleTextField property={activeDrsObject.name} propertyName='name' label='Name' 
                drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}
                description='Short, descriptive name for this DRS Object.'/>
                <SimpleTextField property={activeDrsObject.description} propertyName='description' label='Description' 
                drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}
                description='Longer description of this DRS Object.'/>
                <Grid container justify='space-evenly' spacing={4}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <DateTimeField value={activeDrsObject.created_time} drsObjectFunctions={props.drsObjectFunctions} 
                            readOnlyForm={readOnlyForm} parameterName='created_time' label='Created Time' 
                            description='Timestamp of DRS Object creation in ISO 8601 format.'/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <DateTimeField value={activeDrsObject.updated_time} drsObjectFunctions={props.drsObjectFunctions} 
                            readOnlyForm={readOnlyForm} parameterName='updated_time' label='Updated Time' 
                            description='Timestamp of when the DRS Object was most recently updated in ISO 8601 format.'/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <SimpleTextField property={activeDrsObject.version} propertyName='version' label='Version' 
                        drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}
                        description='Current version of the DRS Object, it should be updated each time the DRS Object is modified.'/>
                    </Grid>
                </Grid>
                <BundleBlobRadio readOnlyForm={readOnlyForm} isBlob={isBlob} isBundle={isBundle} drsObjectFunctions={props.drsObjectFunctions}/>
                <Grid container justify='flex-start' spacing={4}>
                    <MimeType mimeType={activeDrsObject.mime_type} isBlob={isBlob} readOnlyForm={readOnlyForm} drsObjectFunctions={props.drsObjectFunctions}/>
                    <Size size={activeDrsObject.size} isBlob={isBlob} readOnlyForm={readOnlyForm} drsObjectFunctions={props.drsObjectFunctions}/>
                </Grid>
                <Aliases aliases={activeDrsObject.aliases} drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                <Checksums checksums={activeDrsObject.checksums} checksumTypes={props.checksumTypes} isBlob={isBlob}
                drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                <RelatedDrsObject relatedDrsObjects={activeDrsObject.drs_object_children} isBundle={isBundle} relationship='drs_object_children'
                activeDrsObject={activeDrsObject} updateActiveDrsObject={props.updateActiveDrsObject} readOnlyForm={readOnlyForm}
                drsObjectFunctions={props.drsObjectFunctions} header='Bundle Children' objectName='child bundle'
                sectionDescription={
                    <div>
                        <Typography variant='body2' align='left' color='textSecondary'>
                            This DRS Object is currently acting as a DRS Bundle. Bundles
                            contain references to multiple Child objects (single-blob DRS
                            Objects and/or DRS Bundles), enabling multiple DRS Objects to
                            be logically grouped in a nested structure. Only DRS Bundles
                            may have children, single-blob DRS Objects do not have
                            children.
                        </Typography>
                        <Typography variant='body2' align='left' color='textSecondary'>
                            The following listing displays all children for the current
                            DRS Bundle.
                        </Typography>
                    </div>
                }/>
                <RelatedDrsObject relatedDrsObjects={activeDrsObject.drs_object_parents} isBundle={isBundle} relationship='drs_object_parents'
                activeDrsObject={activeDrsObject} updateActiveDrsObject={props.updateActiveDrsObject} readOnlyForm={readOnlyForm}
                drsObjectFunctions={props.drsObjectFunctions} header='Parent Bundles' objectName='parent bundle'
                sectionDescription={
                    <Typography variant='body2' align='left' color='textSecondary'>
                        The following listing displays all "Parent" DRS Bundles,
                        that is, all bundles that contain the current DRS Object as
                        one of its Children.
                    </Typography>
                }/>
                <AccessPoints drsObject={activeDrsObject} readOnlyForm={readOnlyForm} drsObjectFunctions={props.drsObjectFunctions} isBlob={isBlob}/>
                <SubmitButton activeDrsObject={activeDrsObject} readOnlyForm={readOnlyForm} getDrsObjectsList={props.getDrsObjectsList}/>
            </form>
        </Box>
      </div>
    );
}

export default DrsObjectForm;