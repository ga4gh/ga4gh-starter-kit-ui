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
    if(!props.readOnlyForm) {
        return (
            <Tooltip title={`Add another ${props.objectName}.`}>
                <IconButton color='primary' onClick={props.handleClick} disabled={props.disabled}>
                    <AddCircleIcon/>
                </IconButton>   
            </Tooltip>
        );
    }
    else return null;
}

const RemovePropertyButton = (props) => {
    if(!props.readOnlyForm) {
        return (
            <Grid item xs={1} justify='right'>
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
                    value={props.drsObjectDetails.id} InputProps={{readOnly: true}} 
                    helperText='Unique identifier for this DRS Object (UUID recommended), cannot be modified later.'/>
                </FormControl>
            </Grid>
            <GenerateIdButton readOnlyId={props.readOnlyId} drsObjectFunctions={props.drsObjectFunctions}/>
        </Grid>     
    );  
}

const CreatedTime = (props) => {
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormControl fullWidth>
                <DateTimePicker id='created_time' label='Created Time' margin='normal' name='created_time' format='yyyy-MM-dd HH:mm:ss'
                value={props.created_time} readOnly={props.readOnlyForm} showTodayButton
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
                value={props.updated_time} readOnly={props.readOnlyForm} showTodayButton
                onChange={date => props.drsObjectFunctions.updateScalarProperty('updated_time', date.toISOString())}
                helperText='Timestamp of DRS Object creation in ISO 8601 format'/>
            </FormControl>
        </MuiPickersUtilsProvider>
    );
}

const MimeType = (props) => {
    let mimeType = props.mimeType;
    if(props.isBlob !== true) {
        return null;
    }
    else {
        return (
            <FormControl fullWidth>
                <TextField id='mime_type' label='MIME Type' margin='normal' name='mime_type' type='text' value={mimeType} 
                onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)} 
                InputProps={{readOnly: props.readOnlyForm}} helperText='The media type of the DRS Object'/>
            </FormControl>
        );
        
    }
}

const Size = (props) => {
    let size = props.size;
    if(props.isBlob !== true) {
        return null;
    }
    else {
        return (
            <FormControl fullWidth>
                <TextField id='size' label='Size' margin='normal' name='size' type='number' value={size} InputProps={{readOnly: props.readOnlyForm}}
                helperText='The size (in bytes) of the DRS Object represented as an integer.'
                onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}/>
            </FormControl>
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
                            <TextField variant='outlined' id={`alias${index}`} margin='normal' 
                            name='alias' label='Alias' type='text' value={alias} 
                            InputProps={{readOnly: props.readOnlyForm}} 
                            onChange={event => props.drsObjectFunctions.updateAlias(index, event.target.value)}/>
                        </FormControl>
                        <Box zIndex={1} position='relative' right='10%' top={-9}>
                            <RemovePropertyButton readOnlyForm={props.readOnlyForm} handleClick={(index) => props.drsObjectFunctions.removeAlias(index)}
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
                            <AddPropertyButton readOnlyForm={props.readOnlyForm} objectName='alias'
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
                                <TextField select variant='outlined' id={`ChecksumType${index}`} 
                                label='Type' name='type' type='text' align='left'
                                value={checksum.type} InputProps={{readOnly: props.readOnlyForm}} 
                                helperText='Hashing algorithm used to generate the checksum.' 
                                onChange={(event) => props.drsObjectFunctions.updateChecksumType(index, event.target.value)}>
                                    <MenuItem id='md5' value='md5' disabled={props.checksumTypes.md5.disabled}>md5</MenuItem>
                                    <MenuItem id='sha1' value='sha1' disabled={props.checksumTypes.sha1.disabled}>sha1</MenuItem>
                                    <MenuItem id='sha256' value='sha256' disabled={props.checksumTypes.sha256.disabled}>sha256</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={`ChecksumValue${index}`} 
                                label='Checksum' name='checksum' type='checksum' value={checksum.checksum} 
                                InputProps={{readOnly: props.readOnlyForm}} helperText='Checksum digest value.' 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('checksums', index, 'checksum', event.target.value)}/>
                            </FormControl>    
                        </Grid>   
                        <RemovePropertyButton readOnlyForm={props.readOnlyForm} index={index} objectName='checksum'
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
                <Grid container>
                    <Grid item>
                        <AddPropertyButton readOnlyForm={props.readOnlyForm} objectName='checksum' disabled={disableAddButton}
                        handleClick={() => props.drsObjectFunctions.addListItem('checksums', props.drsObjectFunctions.newChecksum)}/>
                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
}

const DrsObjectChildButton = (props) => {
    if(!props.readOnlyForm) {
        return(
            <RemovePropertyButton readOnlyForm={props.readOnlyForm} index={props.index} objectName='child bundle'
            handleClick={(index) => props.drsObjectFunctions.removeListItem('drs_object_children', index)}/>
        );
    }
    else {
        return(
            <Grid item xs={2}>
                <Tooltip title='View details about this bundle child.' id={`DetailsTooltipDrsChildObject${props.index}`}>
                    <Button variant='contained' component={Link} to={`/drs/${props.drsChild.id}`} color='primary'>
                        <Typography variant='button'>Details</Typography>
                    </Button>
                </Tooltip>    
            </Grid>
        )
    }
}

const DrsObjectChildren = (props) => {
    let drsChildren = props.drs_object_children;
    if(props.isBundle !== true) {
        return null;
    }
    else {
        const drsChildrenDisplay = drsChildren.map((drsChild, index) => {
            return (
                <FormGroup key={`DrsChildObject${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsChildId${index}`} 
                                label='Id' margin='normal' name={drsChild.id} type='text' 
                                value={drsChild.id} InputProps={{readOnly: props.readOnlyForm}} 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('drs_object_children', index, 'id', event.target.value)}/>                        
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsChildName${index}`} 
                                label='Name' margin='normal' name={drsChild.name} type='text' 
                                value={drsChild.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <DrsObjectChildButton readOnlyForm={props.readOnlyForm} index={index} drsChild={drsChild} drsObjectFunctions={props.drsObjectFunctions}/>
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
                        <AddPropertyButton  readOnlyForm={props.readOnlyForm} objectName='child bundle'
                        handleClick={() => props.drsObjectFunctions.addListItem('drs_object_children', props.drsObjectFunctions.newDrsObjectChild)}/>
                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
}

const DrsObjectParentButton = (props) => {
    if(!props.readOnlyForm) {
        return(
            <RemovePropertyButton readOnlyForm={props.readOnlyForm} index={props.index} objectName='parent bundle'
            handleClick={(index) => props.drsObjectFunctions.removeListItem('drs_object_parents', index)}/>
        );
    }
    else {
        return(
            <Grid item xs={2}>
                <Tooltip title='View details about this parent bundle.' id={`DetailsTooltipDrsParentObject${props.index}`}>
                    <Button variant='contained' component={Link} to={`/drs/${props.drsParent.id}`} color='primary'>
                        <Typography variant='button'>Details</Typography>
                    </Button>
                </Tooltip>
            </Grid>
        )
    }
}

const DrsObjectParents = (props) => {
    let drsParents = props.drs_object_parents;
    if(!drsParents) {
        return null;
    }
    else {
        const drsParentsDisplay = drsParents.map((drsParent, index) => {
            return (
                <FormGroup key={`DrsParentObject${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsParentId${index}`} 
                                label='Id' margin='normal' name={drsParent.id} type='text' 
                                value={drsParent.id} InputProps={{readOnly: props.readOnlyForm}} 
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('drs_object_parents', index, 'id', event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={`DrsParentName${index}`} 
                                label='Name' margin='normal' name={drsParent.name} type='text' 
                                value={drsParent.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <DrsObjectParentButton readOnlyForm={props.readOnlyForm} index={index} drsParent={drsParent} drsObjectFunctions={props.drsObjectFunctions}/>
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
                        <AddPropertyButton readOnlyForm={props.readOnlyForm} objectName='parent bundle'
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
    if(props.isBlob !== true) {
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
                            <TextField
                                variant='outlined' id={`FileAccessObject${index}`} label='Path' margin='normal'
                                name='path' type='text'
                                value={fileAccessObject.path}
                                InputProps={{readOnly: props.readOnlyForm}}
                                helperText='The filesystem path to the local file storing 
                                    DRS Object bytes'
                                onChange={(event) => props.drsObjectFunctions.updateObjectProperty('file_access_objects', index, 'path', event.target.value)}/>
                        </FormControl>
                    </Grid>
                    <RemovePropertyButton readOnlyForm={props.readOnlyForm}
                    handleClick={(index) => props.drsObjectFunctions.removeListItem('file_access_objects', index)} 
                    index={index} objectName='local file access point'/>
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
                <Grid container alignItems='center'>
                    <Grid item>
                        <AddPropertyButton readOnlyForm={props.readOnlyForm} objectName='local file access point'
                        handleClick={() => props.drsObjectFunctions.addListItem('file_access_objects', props.drsObjectFunctions.newFileAccessObject)}/>
                    </Grid>
                </Grid>
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
                        <RemovePropertyButton readOnlyForm={props.readOnlyForm}
                        handleClick={(index) => props.drsObjectFunctions.removeListItem('aws_s3_access_objects', index)} 
                        index={index} objectName='AWS S3 access point'/>
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
                <Grid container alignItems='center'>
                    <Grid item>
                        <AddPropertyButton readOnlyForm={props.readOnlyForm} objectName='AWS S3 access point'
                        handleClick={() => props.drsObjectFunctions.addListItem('aws_s3_access_objects', props.drsObjectFunctions.newAwsS3AccessObject)} />
                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
}

const SubmitButton = (props) => {
    if(!props.readOnlyForm) {
        return (
            <FormControl fullWidth>
                <SpaceDivider/>
                <Button variant='contained' color='primary'>Submit</Button>
            </FormControl>
        );
    }
    else return null;
}

const DrsObjectForm = (props) => {
    let drsObjectDetails = props.drsObjectDetails;
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
        <Container maxWidth='lg'>
            <form>
                <Id drsObjectDetails={drsObjectDetails} drsObjectFunctions={props.drsObjectFunctions} readOnlyId={readOnlyId}/>
                <FormControl fullWidth>
                    <TextField id='name' label='Name' margin='normal' name='name' type='text' 
                    value={drsObjectDetails.name} InputProps={{readOnly: readOnlyForm}}
                    onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                    helperText='Short, descriptive name for this DRS Object'/>
                </FormControl>
                <FormControl fullWidth>
                    <TextField id='description' label='Description' margin='normal' name='description' type='text' 
                    value={drsObjectDetails.description} InputProps={{readOnly: readOnlyForm}}
                    onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                    helperText='Longer description of this DRS Object'/>
                </FormControl>
                <Grid container justify='space-evenly' spacing={4}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <CreatedTime created_time={drsObjectDetails.created_time} drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <UpdatedTime updated_time={drsObjectDetails.updated_time} drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField id='version' label='Version' margin='normal' name='version' type='text' 
                            value={drsObjectDetails.version} InputProps={{readOnly: readOnlyForm}}
                            onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)} 
                            helperText='Current version of the DRS Object, it should be updated each time the DRS Object is modified.'/>
                        </FormControl>
                    </Grid>
                </Grid>
                <BundleBlobRadio readOnlyForm={readOnlyForm} isBlob={isBlob} isBundle={isBundle} drsObjectFunctions={props.drsObjectFunctions}/>
                <Grid container justify='flex-start' spacing={4}>
                    <Grid item xs={4}>
                        <MimeType mimeType={drsObjectDetails.mime_type} isBlob={isBlob} readOnlyForm={readOnlyForm} drsObjectFunctions={props.drsObjectFunctions}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Size size={drsObjectDetails.size} isBlob={isBlob} readOnlyForm={readOnlyForm} drsObjectFunctions={props.drsObjectFunctions}/>
                    </Grid>
                </Grid>
                <Aliases aliases={drsObjectDetails.aliases} drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                <Checksums checksums={drsObjectDetails.checksums} checksumTypes={props.checksumTypes} isBlob={isBlob}
                    drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                <DrsObjectChildren drs_object_children={drsObjectDetails.drs_object_children} isBundle={isBundle}
                    drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                 <DrsObjectParents drs_object_parents={drsObjectDetails.drs_object_parents} drsObjectFunctions={props.drsObjectFunctions} readOnlyForm={readOnlyForm}/>
                <AccessPoints drsObject={drsObjectDetails} readOnlyForm={readOnlyForm} drsObjectFunctions={props.drsObjectFunctions} isBlob={isBlob}/>
                <SubmitButton readOnlyForm={readOnlyForm}/>
            </form>
        </Container>
        </Box>
      </div>
    );
}

export default DrsObjectForm;