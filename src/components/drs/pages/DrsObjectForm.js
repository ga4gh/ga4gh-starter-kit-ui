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
    IconButton, 
    Tooltip,
} from '@material-ui/core';
import {
    Link
} from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {
    Aliases,
    AwsS3AccessObjects,
    BundleBlobRadio,
    Checksums,
    CreatedTime,
    Description,
    DrsObjectChildren,
    DrsObjectParents,
    FileAccessObjects,
    Id,
    MimeType,
    Name,
    Size,
    UpdatedTime,
    Version
} from '../formComponents';
import SpaceDivider from '../../common/SpaceDivider';

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
    const fileAccessObjects = {...props.fileAccessObjects, readOnly: props.readOnlyForm};
    const awsS3AccessObjects = {...props.awsS3AccessObjects, readOnly: props.readOnlyForm};

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

                    {isBundle.is_bundle
                        ? null
                        :
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
                                <FileAccessObjects {...fileAccessObjects} />
                                <AwsS3AccessObjects {...awsS3AccessObjects} />
                            </FormGroup>
                    }
                    
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
