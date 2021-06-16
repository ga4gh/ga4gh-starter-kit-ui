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
    MenuItem, 
    Tooltip
} from '@material-ui/core';
import {
    Link
} from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { 
    DateTimePicker,
    MuiPickersUtilsProvider 
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';

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
            <Tooltip title={`Add another ${props.objectName}.`}>
                <IconButton color='primary' onClick={props.handleClick}>
                    <AddCircleIcon/>
                </IconButton>   
            </Tooltip>
        );
    }
    else { 
        return null;
    }
}

const RemovePropertyButton = (props) => {
    let formType = props.formType;
    if(formType === 'NewDrs') {
        return (
            <Tooltip title={`Remove this ${props.objectName}.`}>
                <IconButton color='secondary' onClick={() => props.handleClick(props.index)}>
                    <RemoveCircleIcon/>
                </IconButton>
            </Tooltip>
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
                <Typography variant='body2' align='left' color='textSecondary'>
                    Bundles contain references to Child Drs Objects, while Blobs act as single DRS Objects and do not have any children.
                </Typography>
                <RadioGroup name='drs_object_type' value={props.drsObjectType} onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}>
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

const Id = (props) => {
    if(props.formType === 'NewDrs') {
        return(
            <Grid container spacing={4} alignItems='center' justify='space-between'>
                <Grid item xs={10}>
                    <FormControl fullWidth>
                        <TextField id='id' label='Id' margin='normal' name='id' type='text'
                        value={props.drsObjectDetails.id} InputProps={{readOnly: true}} 
                        helperText='Unique identifier for this DRS Object (UUID recommended), cannot be modified later.'/>
                    </FormControl>
                </Grid>
                <Grid item xs={2} align='right'>
                    <Button variant='contained' color='primary' onClick={() => props.drsObjectFunctions.updateScalarProperty('id', uuidv4())}>
                        <Typography variant='button'>Generate ID</Typography>
                    </Button>
                </Grid>
            </Grid>     
        );    
    }
    else {
        return(
            <FormControl fullWidth>
                <TextField id='id' label='Id' margin='normal' name='id' type='text' 
                value={props.drsObjectDetails.id} InputProps={{readOnly: props.readOnlyValue}} 
                onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                helperText='Unique identifier for this DRS Object (UUID recommended), cannot be modified later.'/>
            </FormControl>
        );
    }
}

const CreatedTime = (props) => {
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormControl fullWidth>
                <DateTimePicker id='created_time' label='Created Time' margin='normal' name='created_time' format='yyyy-MM-dd HH:mm:ss'
                value={props.drsObjectDetails.created_time} readOnly={props.readOnlyValue} showTodayButton
                onChange={date => props.drsObjectFunctions.updateScalarProperty('created_time', date.toISOString())}
                helperText='Timestamp of DRS Object creation in ISO 8601 format'/>
            </FormControl>
        </MuiPickersUtilsProvider>
    );
}

const UpdatedTime = (props) => {
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormControl fullWidth>
                <DateTimePicker id='updated_time' label='Updated Time' margin='normal' name='updated_time' format='yyyy-MM-dd HH:mm:ss'
                value={props.drsObjectDetails.updated_time} readOnly={props.readOnlyValue} showTodayButton
                onChange={date => props.drsObjectFunctions.updateScalarProperty('updated_time', date.toISOString())}
                helperText='Timestamp of DRS Object creation in ISO 8601 format'/>
            </FormControl>
        </MuiPickersUtilsProvider>
    );
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
                <TextField id='mime_type' label='MIME Type' margin='normal' name='mime_type' type='text' value={mimeType} 
                onChange={props.UpdateMimeType} InputProps={{readOnly: readOnlyValue}} helperText='The media type of the DRS Object'/>
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
                helperText='The size (in bytes) of the DRS Object represented as an integer.'
                onChange={props.UpdateSize}/>
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
        const aliasesDisplay = aliases.map((alias, index) => {
            return (
                <Grid item key={`alias${index}`}>
                    <FormGroup row>
                        <FormControl>
                            <TextField variant='outlined' id={`alias${index}`} margin='normal' 
                            name='alias' label='Alias' type='text' value={alias} 
                            InputProps={{readOnly: readOnlyValue}} 
                            onChange={event => props.drsObjectFunctions.updateAlias(index, event.target.value)}/>
                        </FormControl>
                        <Box zIndex={1} position='relative' right='10%' top={-9}>
                            <RemovePropertyButton formType={formType} handleClick={(index) => props.drsObjectFunctions.removeAlias(index)}
                            index={index} objectName='alias'/>    
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
                            <AddPropertyButton formType={formType} objectName='alias'
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
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    let drsObjectType = props.drsObjectType;
    /* let checksumTypesList = Object.entries(props.checksumTypes);
    let checksumTypeOptions = [];
    checksumTypesList.map((checksum) => {
        if(checksum[1].enabled === true) {
            checksumTypeOptions.push(checksum[0]);
        }
    }) */
       
    if((formType === 'DrsShow' && !checksums)||(formType === 'NewDrs' && drsObjectType !== 'blob')) {
        return null;
    }
    else {
        const checksumsDisplay = checksums.map((checksum, index) => {
            return (
                <FormGroup key={`checksum${index}`} row>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField select variant='outlined' id={`ChecksumType${index}`} 
                                label='Type' name='type' type='text' align='left'
                                value={checksum.type} InputProps={{readOnly: readOnlyValue}} 
                                helperText='Hashing algorithm used to generate the checksum.' 
                                onChange={(event) => props.drsObjectFunctions.updateChecksumType(index, event.target.value)}>
                                    {/* {
                                        checksumTypeOptions.map((type, index) => {
                                            return(
                                                <MenuItem key={type+index} id={type} value={type}>{type}</MenuItem>
                                            )   
                                        })
                                    } */}
                                    <MenuItem id='md5' value='md5' disabled={!props.checksumTypes.md5.enabled}>md5</MenuItem>
                                    <MenuItem id='sha1' value='sha1' disabled={!props.checksumTypes.sha1.enabled}>sha1</MenuItem>
                                    <MenuItem id='sha256' value='sha256' disabled={!props.checksumTypes.sha256.enabled}>sha256</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={`ChecksumValue${index}`} 
                                label='Checksum' name='checksum' type='checksum' value={checksum.checksum} 
                                InputProps={{readOnly: readOnlyValue}} helperText='Checksum digest value.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('checksums', index, 'checksum', event.target.value)}/>
                            </FormControl>    
                        </Grid>   
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={formType} index={index} objectName='checksum'
                            handleClick={(index) => props.drsObjectFunctions.removeChecksumItem(index)}/>
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
                <Grid container>
                    <Grid item>
                        <AddPropertyButton formType={formType} objectName='checksum'
                        handleClick={() => props.drsObjectFunctions.addListItem('checksums', props.drsObjectFunctions.newChecksum)}/>
                    </Grid>
                </Grid>
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
        const drsChildrenDisplay = drsChildren.map((drsChild, index) => {
            return (
                <FormGroup key={`DrsChildObject${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsChildId${index}`} 
                                label='Id' margin='normal' name={drsChild.id} type='text' 
                                value={drsChild.id} InputProps={{readOnly: readOnlyValue}} 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('drs_object_children', index, 'id', event.target.value)}/>                        
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsChildName${index}`} 
                                label='Name' margin='normal' name={drsChild.name} type='text' 
                                value={drsChild.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title='View details about this bundle child.' id={`DetailsTooltipDrsChildObject${index}`}>
                                <Button variant='contained' component={Link} to={`/drs/${drsChild.id}`} color='primary'>Details</Button>
                            </Tooltip>
                            
                        </Grid>
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={formType} index={index} objectName='child bundle'
                            handleClick={(index) => props.drsObjectFunctions.removeListItem('drs_object_children', index)}/>
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
                <Grid container>
                    <Grid item>
                        <AddPropertyButton formType={formType} objectName='child bundle'
                        handleClick={() => props.drsObjectFunctions.addListItem('drs_object_children', props.drsObjectFunctions.newDrsObjectChild)}/>
                    </Grid>
                </Grid>
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
        const drsParentsDisplay = drsParents.map((drsParent, index) => {
            return (
                <FormGroup key={`DrsParentObject${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsParentId${index}`} 
                                label='Id' margin='normal' name={drsParent.id} type='text' 
                                value={drsParent.id} InputProps={{readOnly: readOnlyValue}} 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('drs_object_parents', index, 'id', event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsParentName${index}`} 
                                label='Name' margin='normal' name={drsParent.name} type='text' 
                                value={drsParent.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title='View details about this parent bundle.' id={`DetailsTooltipDrsParentObject${index}`}>
                                <Button variant='contained' component={Link} to={`/drs/${drsParent.id}`} color='primary'>Details</Button>
                            </Tooltip>
                            
                        </Grid>
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={formType} index={index} objectName='parent bundle' 
                            handleClick={(index) => props.drsObjectFunctions.removeListItem('drs_object_parents', index)}/>
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
                <Grid container>
                    <Grid item>
                        <AddPropertyButton formType={formType} objectName='parent bundle'
                        handleClick={() => props.drsObjectFunctions.addListItem('drs_object_parents', props.drsObjectFunctions.newDrsObjectParent)}/>
                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
}

const AccessPoints = (props) => {
    let fileAccessObjects = props.drsObject.file_access_objects;
    let awsS3AccessObjects = props.drsObject.aws_s3_access_objects;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;
    let drsObjectType = props.drsObjectType;
    if((formType === 'DrsShow' && !fileAccessObjects && !awsS3AccessObjects)||(formType === 'NewDrs' && drsObjectType !== 'blob')) {
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
                <FileAccessObjects file_access_objects={fileAccessObjects} readOnly={readOnlyValue} formType={formType} 
                drsObjectFunctions={props.drsObjectFunctions}/>
                <AwsS3AccessObjects aws_s3_access_objects={awsS3AccessObjects} readOnly={readOnlyValue} formType={formType} 
                drsObjectFunctions={props.drsObjectFunctions}/>
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
        const fileAccessDisplay = fileAccessObjects.map((fileAccessObject, index) => {
            return (
                <Grid container alignItems='center' spacing={4} key={`FileAccessObject${index}`}>
                    <Grid item xs={11}>
                        <FormControl fullWidth>
                            <TextField
                                variant='outlined' id={`FileAccessObject${index}`} label='Path' margin='normal'
                                name='path' type='text'
                                value={fileAccessObject.path}
                                InputProps={{readOnly: readOnlyValue}}
                                helperText='The filesystem path to the local file storing 
                                    DRS Object bytes'
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('file_access_objects', index, 'path', event.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <RemovePropertyButton formType={props.formType} 
                        handleClick={(index) => props.drsObjectFunctions.removeListItem('file_access_objects', index)} 
                        index={index} objectName='local file access point'/>
                    </Grid>
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
                <Grid container>
                    <Grid item>
                        <AddPropertyButton formType={props.formType} objectName='local file access point'
                        handleClick={() => props.drsObjectFunctions.addListItem('file_access_objects', props.drsObjectFunctions.newFileAccessObject)}/>
                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
}

const AwsS3AccessObjects = (props) => {
    let awsS3AccessObjects = props.aws_s3_access_objects;
    let readOnlyValue = props.readOnly;
    if(!awsS3AccessObjects) {
        return null;
    }
    else {
        const awsS3AccessDisplay = awsS3AccessObjects.map((awsS3AccessObject, index) => {
            return (
                <FormGroup key={`AwsS3AccessObject${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`region${index}`} 
                                label='Region' margin='normal' name='region' type='text' 
                                value={awsS3AccessObject.region} InputProps={{readOnly: readOnlyValue}} 
                                helperText='Region where AWS S3 service is located.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'region', event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`bucket${index}`} 
                                label='Bucket' margin='normal' name='bucket' type='text' 
                                value={awsS3AccessObject.bucket} InputProps={{readOnly: readOnlyValue}} 
                                helperText='AWS S3 bucket containing the DRS Object.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'bucket', event.target.value)} />                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`key${index}`} 
                                label='Key' margin='normal' name='key' type='text' 
                                value={awsS3AccessObject.key} InputProps={{readOnly: readOnlyValue}} 
                                helperText='Path within the bucket to the S3 object storing DRS Object bytes.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'key', event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={props.formType} 
                            handleClick={(index) => props.drsObjectFunctions.removeListItem('aws_s3_access_objects', index)} 
                            index={index} objectName='AWS S3 access point'/>
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
                {awsS3AccessDisplay}
                <Grid container>
                    <Grid item>
                        <AddPropertyButton formType={props.formType} objectName='AWS S3 access point'
                        handleClick={() => props.drsObjectFunctions.addListItem('aws_s3_access_objects', props.drsObjectFunctions.newAwsS3AccessObject)} />
                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
}

const SubmitButton = (props) => {
    if(props.formType === 'NewDrs') {
        return (
            <FormControl fullWidth>
                <SpaceDivider/>
                <Button variant='contained' color='primary'>Submit</Button>
            </FormControl>
        );
    }
    else {
        return null;
    }
}

const DrsObjectForm = (props) => {
    let drsObjectDetails = props.drsObjectDetails;
    let readOnlyValue = props.readOnly;
    let formType = props.formType;

    return (
      <div>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Box pb={4}>
        <Container maxWidth='lg'>
            <form>
                <Id drsObjectDetails={drsObjectDetails} drsObjectFunctions={props.drsObjectFunctions} readOnlyValue={readOnlyValue} formType={formType}/>
                <FormControl fullWidth>
                    <TextField id='name' label='Name' margin='normal' name='name' type='text' 
                    value={drsObjectDetails.name} InputProps={{readOnly: readOnlyValue}} 
                    onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                    helperText='Short, descriptive name for this DRS Object'/>
                </FormControl>
                <FormControl fullWidth>
                    <TextField id='description' label='Description' margin='normal' name='description' type='text' 
                    value={drsObjectDetails.description} InputProps={{readOnly: readOnlyValue}} 
                    onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                    helperText='Longer description of this DRS Object'/>
                </FormControl>
                <Grid container justify='space-evenly' spacing={4}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <CreatedTime drsObjectDetails={drsObjectDetails} drsObjectFunctions={props.drsObjectFunctions} readOnlyValue={readOnlyValue}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <UpdatedTime drsObjectDetails={drsObjectDetails} drsObjectFunctions={props.drsObjectFunctions} readOnlyValue={readOnlyValue}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField id='version' label='Version' margin='normal' name='version' type='text' 
                            value={drsObjectDetails.version} InputProps={{readOnly: readOnlyValue}} 
                            onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)} 
                            helperText='Current version of the DRS Object, it should be updated each time the DRS Object is modified.'/>
                        </FormControl>
                    </Grid>
                </Grid>
                <BundleBlobRadio formType={formType} drsObjectType={drsObjectDetails.drs_object_type} readOnly={readOnlyValue} drsObjectFunctions={props.drsObjectFunctions}/>
                <Grid container justify='flex-start' spacing={4}>
                    <Grid item xs={4}>
                        <MimeType mimeType={drsObjectDetails.mime_type} readOnly={readOnlyValue} formType={formType} 
                        drsObjectType={drsObjectDetails.drs_object_type} 
                        UpdateMimeType={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Size size={drsObjectDetails.size} readOnly={readOnlyValue} formType={formType} 
                        drsObjectType={drsObjectDetails.drs_object_type}
                        UpdateSize={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}/>
                    </Grid>
                </Grid>
                <Aliases aliases={drsObjectDetails.aliases} readOnly={readOnlyValue} formType={formType} drsObjectFunctions={props.drsObjectFunctions}/>
                <Checksums checksums={drsObjectDetails.checksums} readOnly={readOnlyValue} formType={formType} checksumTypes={props.checksumTypes}
                    drsObjectType={drsObjectDetails.drs_object_type} drsObjectFunctions={props.drsObjectFunctions}/>
                <DrsObjectChildren drs_object_children={drsObjectDetails.drs_object_children} readOnly={readOnlyValue} formType={formType} 
                    drsObjectType={drsObjectDetails.drs_object_type} drsObjectFunctions={props.drsObjectFunctions}/>
                 <DrsObjectParents drs_object_parents={drsObjectDetails.drs_object_parents} readOnly={readOnlyValue} formType={formType} 
                    drsObjectFunctions={props.drsObjectFunctions}/>
                <AccessPoints drsObject={drsObjectDetails} readOnly={readOnlyValue} formType={formType} 
                    drsObjectType={drsObjectDetails.drs_object_type} drsObjectFunctions={props.drsObjectFunctions}/>
                <SubmitButton formType={formType}/>
            </form>
        </Container>
        </Box>
      </div>
    );
}

export default DrsObjectForm;