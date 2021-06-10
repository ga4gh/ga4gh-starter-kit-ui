import '@fontsource/roboto';
import React from 'react';
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
    FormLabel
} from '@material-ui/core';
import {
    Link
} from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const SpaceDivider = () => {
    return (
        <Box py={4}>
            <Divider />
        </Box>
    );
}

const AddPropertyButton = (props) => {
    let formType = props.formType;
    if(formType === 'NewDrs') {
        return (
            <IconButton color='primary' onClick={props.handleClick}>
                <AddCircleIcon/>
            </IconButton>
        );
    }
    else { 
        return null;
    }
}

const BundleBlobRadio = (props) => {
    let readOnlyValue = props.readOnly;
    if(props.formType === 'NewDrs') {
        return(
            <FormGroup>
                <Typography align='left' variant='h6'>Is this DRS Object a bundle or a blob?</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>Bundles contain references to Child Drs Objects, while Blobs act as single DRS Objects and do not have any children.</Typography>
                <RadioGroup name='DrsObjectType' value={props.drsObjectType} onChange={props.HandleDrsObjectTypeChange}>
                        <FormControlLabel control={<Radio color='primary'/>} label='Blob' value='blob' disabled={readOnlyValue}></FormControlLabel>
                        <FormControlLabel control={<Radio color='primary'/>} label='Bundle' value='bundle' disabled={readOnlyValue}></FormControlLabel>
                </RadioGroup>
            </FormGroup>
        );
    }
    else {
        return null;
    }
}

const MimeType = (props) => {
    let mimeType = props.mimeType;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    let drsObjectType = props.drsObjectType;
    if((formType === 'DrsShow' && !mimeType)||(formType === 'NewDrs' && drsObjectType !== 'blob')) {
        return null;
    }
    else {
        return (
            <FormControl fullWidth>
                <TextField 
                id='mime_type' label='MIME Type' margin='normal' name='mime_type' type='text' value={mimeType} onChange={props.HandleMimeTypeChange} InputProps={{readOnly: readOnlyValue}}
                helperText='The media type of the DRS Object'/>
            </FormControl>
        );
        
    }
}

const Size = (props) => {
    let size = props.size;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    let drsObjectType = props.drsObjectType;
    if((formType === 'DrsShow' && !size)||(formType === 'NewDrs' && drsObjectType !== 'blob')) {
        return null;
    }
    else {
        return (
            <FormControl fullWidth>
                <TextField id='size' label='Size' margin='normal' name='size' type='number' value={size} InputProps={{readOnly: readOnlyValue}}
                helperText='The size (in bytes) of the DRS Object represented as an integer.'/>
            </FormControl>
        );
    }
}

const Aliases = (props) => {
    let aliases = props.aliases;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    
    if(formType === 'DrsShow' && !aliases) {
        return null;
    }
    else {
        const aliasesDisplay = aliases.map((alias) => {
            return (
                <Grid item key={alias}>
                    <FormControl>
                        <TextField variant='outlined' id={alias} margin='normal' name='alias' label='Alias' type='text' value={alias} InputProps={{readOnly: readOnlyValue}} onChange={props.HandleAliasChange}/>
                    </FormControl>
                </Grid>
            );
        })
        return (
            <FormGroup>
                <SpaceDivider />
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography align='left' variant='h6'>Aliases</Typography>
                        <Typography variant='body2' align='left' color='textSecondary'>
                            A list of aliases that can be used to identify the DRS Object
                            by additional names
                        </Typography>
                        <br />
                    </Grid>
                    <Grid item>
                        <AddPropertyButton formType={formType} property='Alias' handleClick={props.HandleAddAlias}/>
                    </Grid>
                </Grid>
                <FormGroup row>
                   <Grid container spacing={4} alignItems='center'>
                       {aliasesDisplay}
                   </Grid>
                </FormGroup>
            </FormGroup>
        );
    }
}

const Checksums = (props) => {
    let checksums = props.checksums;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    let drsObjectType = props.drsObjectType;
    if((formType === 'DrsShow' && !checksums)||(formType === 'NewDrs' && drsObjectType !== 'blob')) {
        return null;
    }
    else {
        const checksumsDisplay = checksums.map((checksum) => {
            return (
                <FormGroup key={checksum.type} row>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={checksum.type} label='Type' name='type' type='text' value={checksum.type} InputProps={{readOnly: readOnlyValue}} helperText='Hashing algorithm used to generate the checksum.'/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={checksum.checksum} label='Checksum' name='checksum' type='checksum' value={checksum.checksum} InputProps={{readOnly: readOnlyValue}} helperText='Checksum digest value.'/>
                            </FormControl>    
                        </Grid>    
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
            </FormGroup>
        );
    }
}

const DrsObjectChildren = (props) => {
    let drsChildren = props.drs_object_children;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    let drsObjectType = props.drsObjectType;
    if((formType === 'DrsShow' && !drsChildren)||(formType === 'NewDrs' && drsObjectType !== 'bundle')) {
        return null;
    }
    else {
        const drsChildrenDisplay = drsChildren.map((drsChild) => {
            return (
                <FormGroup key={drsChild.id} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsChild.id} label='Id' margin='normal' name={drsChild.id} type='text' value={drsChild.id} InputProps={{readOnly: readOnlyValue}}/>                        
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsChild.name} label='Name' margin='normal' name={drsChild.name} type='text' value={drsChild.name} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to={`/drs/${drsChild.id}`}>
                                <Button variant='contained'>View Details</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </FormGroup>
            );
        })
        return (
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>Bundle Children</Typography>
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
                {drsChildrenDisplay}
            </FormGroup>
        );
    }
}

const DrsObjectParents = (props) => {
    let drsParents = props.drs_object_parents;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    if(formType ==='DrsShow' && !drsParents) {
        return null;
    }
    else {
        const drsParentsDisplay = drsParents.map((drsParent) => {
            return (
                <FormGroup key={drsParent.id} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsParent.id} label='Id' margin='normal' name={drsParent.id} type='text' value={drsParent.id} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsParent.name} label='Name' margin='normal' name={drsParent.name} type='text' value={drsParent.name} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to={`/drs/${drsParent.id}`}>
                                <Button variant='contained'>View Details</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </FormGroup>
            );
        })
        return (
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>Parent Bundles</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>
                    The following listing displays all "Parent" DRS Bundles,
                    that is, all bundles that contain the current DRS Object as
                    one of its Children.
                </Typography>
                {drsParentsDisplay}
            </FormGroup>
        );
    }
}

const AccessPoints = (props) => {
    let fileAccessObjects = props.drsObject.file_access_objects;
    let awsAccessObjects = props.drsObject.aws_s3_access_objects;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    let drsObjectType = props.drsObjectType;
    if((formType === 'DrsShow' && !fileAccessObjects && !awsAccessObjects)||(formType === 'NewDrs' && drsObjectType !== 'blob')) {
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
                    associated with a single DRS Object must have the same bytes
                </Typography>
                <FileAccessObjects file_access_objects={fileAccessObjects} readOnly={readOnlyValue}/>
                <AwsS3AccessObjects aws_s3_access_objects={awsAccessObjects} readOnly={readOnlyValue}/>
            </FormGroup>
        );
    }
}

const FileAccessObjects = (props) => {
    let fileAccessObjects = props.file_access_objects;
    let readOnlyValue = props.readOnly;
    if(!fileAccessObjects){
        return null;
    }
    else {
        const fileAccessDisplay = fileAccessObjects.map((fileAccessObject) => {
            return (
                <FormControl fullWidth key='file_access_object'>
                    <TextField
                        variant='outlined' id='path' label='Path' margin='normal'
                        name='path' type='text'
                        value={fileAccessObject.path}
                        InputProps={{readOnly: readOnlyValue}}
                        helperText='The filesystem path to the local file storing 
                            DRS Object bytes'/>
                </FormControl>
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
            </FormGroup>
        );
    }
}

const AwsS3AccessObjects = (props) => {
    let awsAccessObjects = props.aws_s3_access_objects;
    let readOnlyValue = props.readOnly;
    if(!awsAccessObjects) {
        return null;
    }
    else {
        const awsAccessDisplay = awsAccessObjects.map((awsAccessObject) => {
            return (
                <FormGroup key='aws_access_object' row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='region' label='Region' margin='normal' name='region' type='text' value={awsAccessObject.region} InputProps={{readOnly: readOnlyValue}} helperText='Region where AWS S3 service is located.'/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='bucket' label='Bucket' margin='normal' name='bucket' type='text' value={awsAccessObject.bucket} InputProps={{readOnly: readOnlyValue}} helperText='AWS S3 bucket containing the DRS Object.'/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='key' label='Key' margin='normal' name='key' type='text' value={awsAccessObject.key} InputProps={{readOnly: readOnlyValue}} helperText='Path within the bucket to the S3 object storing DRS Object bytes.'/>                            
                            </FormControl>
                        </Grid>
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
                {awsAccessDisplay}
            </FormGroup>
        );
    }
}

const DrsObject = (props) => {
    let drsObjectDetails = props.drsObjectDetails;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    
    const HandleIdChange = (event) => {
        props.updateId(event.target.value);
    }

    const HandleNameChange = (event) => {
        props.updateName(event.target.value);
    }

    const HandleDescriptionChange = (event) => {
        props.updateDescription(event.target.value);
    }

    const HandleCreatedTimeChange = (event) => {
        props.updateCreatedTime(event.target.value);
    }

    const HandleUpdatedTimeChange = (event) => {
        props.updateUpdatedTime(event.target.value);
    }

    const HandleVersionChange = (event) => {
        props.updateVersion(event.target.value);
    }

    const HandleDrsObjectTypeChange = (event) => {
        props.updateDrsObjectType(event.target.value);
    }

    const HandleMimeTypeChange = (event) => {
        props.updateMimeType(event.target.value);
    }

    const HandleAddAlias = () => {
        props.addAlias('');
    }

    const HandleAliasChange = (event) => {
        console.log(event.target.value);
        props.updateAlias(event.target.value);
    }

    return (
      <div align="center">
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Box pb={4}>
        <Container maxWidth='lg'>
            <form>
                
                <FormControl fullWidth>
                    <TextField id='id' label='Id' margin='normal' name='id' type='text' value={drsObjectDetails.id} onChange={HandleIdChange} InputProps={{readOnly: readOnlyValue}} 
                    helperText='Unique identifier for this DRS Object (UUID recommended), cannot be modified later.'/>
                </FormControl>
                <FormControl fullWidth>
                    <TextField id='name' label='Name' margin='normal' name='name' type='text' value={drsObjectDetails.name} onChange={HandleNameChange} InputProps={{readOnly: readOnlyValue}}
                    helperText='Short, descriptive name for this DRS Object'/>
                </FormControl>
                <FormControl fullWidth>
                    <TextField id='description' label='Description' margin='normal' name='description' type='text' value={drsObjectDetails.description} onChange={HandleDescriptionChange} InputProps={{readOnly: readOnlyValue}}
                    helperText='Longer description of this DRS Object'/>
                </FormControl>
                <Grid container justify='space-evenly' spacing={4}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField id='created_time' label='Created Time' margin='normal' name='created_time' type='text' value={drsObjectDetails.created_time} InputProps={{readOnly: readOnlyValue}} onChange={HandleCreatedTimeChange}
                            helperText='Timestamp of DRS Object creation in ISO 8601 format'/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField id='updated_time' label='Updated Time' margin='normal' name='updated_time' type='text' value={drsObjectDetails.updated_time} InputProps={{readOnly: readOnlyValue}} onChange={HandleUpdatedTimeChange}
                            helperText='Timestamp of when the DRS Object was most recently updated in ISO 8601 format'/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField id='version' label='Version' margin='normal' name='version' type='text' value={drsObjectDetails.version} onChange={HandleVersionChange} InputProps={{readOnly: readOnlyValue}}
                            helperText='Current version of the DRS Object, it should be updated each time the DRS Object is modified.'/>
                        </FormControl>
                    </Grid>
                </Grid>
                <BundleBlobRadio formType={formType} drsObjectType={drsObjectDetails.drs_object_type} readOnly={readOnlyValue} HandleDrsObjectTypeChange={HandleDrsObjectTypeChange}/>
                <Grid container justify='flex-start' spacing={4}>
                    <Grid item xs={4}>
                        <MimeType mimeType={drsObjectDetails.mime_type} readOnly={readOnlyValue} formType={formType} drsObjectType={drsObjectDetails.drs_object_type} HandleMimeTypeChange={HandleMimeTypeChange}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Size size={drsObjectDetails.size} readOnly={readOnlyValue} formType={formType} drsObjectType={drsObjectDetails.drs_object_type}/>
                    </Grid>
                </Grid>
                <Aliases aliases={drsObjectDetails.aliases} readOnly={readOnlyValue} formType={formType} HandleAddAlias={HandleAddAlias} HandleAliasChange={HandleAliasChange}/>
                <Checksums checksums={drsObjectDetails.checksums} readOnly={readOnlyValue} formType={formType} drsObjectType={drsObjectDetails.drs_object_type}/>
                <DrsObjectChildren drs_object_children={drsObjectDetails.drs_object_children} readOnly={readOnlyValue} formType={formType} drsObjectType={drsObjectDetails.drs_object_type}/>
                <DrsObjectParents drs_object_parents={drsObjectDetails.drs_object_parents} readOnly={readOnlyValue} formType={formType}/>
                <AccessPoints drsObject={drsObjectDetails} readOnly={readOnlyValue} formType={formType} drsObjectType={drsObjectDetails.drs_object_type}/>
            </form>
        </Container>
        </Box>
      </div>
    );
}

export default DrsObject;