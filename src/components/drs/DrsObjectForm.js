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

const RemovePropertyButton = (props) => {
    let formType = props.formType;
    if(formType === 'NewDrs') {
        return (
            <Tooltip title={`Remove this ${props.objectName}`}>
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
                <RadioGroup name='drs_object_type' value={props.drsObjectType} onChange={props.UpdateDrsObjectType}>
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
                <Grid item key={`alias ${index}`}>
                    <FormControl>
                        <TextField variant='outlined' id={alias} margin='normal' 
                        name='alias' label='Alias' type='text' value={alias} 
                        InputProps={{readOnly: readOnlyValue}} 
                        onChange={event => props.UpdateAlias(index, event.target.value)}/>
                    </FormControl>
                    <RemovePropertyButton formType={formType} handleClick={props.RemoveAlias} index={index} objectName='alias'/>
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
                            <AddPropertyButton formType={formType} handleClick={props.AddAlias}/>
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
    if((formType === 'DrsShow' && !checksums)||(formType === 'NewDrs' && drsObjectType !== 'blob')) {
        return null;
    }
    else {
        const checksumsDisplay = checksums.map((checksum, index) => {
            return (
                <FormGroup key={`checksum ${index}`} row>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField select variant='outlined' id={checksum.type} 
                                label='Type' name='type' type='text' 
                                value={checksum.type} InputProps={{readOnly: readOnlyValue}} 
                                helperText='Hashing algorithm used to generate the checksum.' 
                                onChange={(event) => props.UpdateChecksumType(index, event.target.value)}>
                                    <MenuItem value='md5'>md5</MenuItem>
                                    <MenuItem value='sha1'>sha1</MenuItem>
                                    <MenuItem value='sha256'>sha256</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={checksum.checksum} 
                                label='Checksum' name='checksum' type='checksum' value={checksum.checksum} 
                                InputProps={{readOnly: readOnlyValue}} helperText='Checksum digest value.' 
                                onChange={(event) => props.UpdateChecksumValue(index, event.target.value)}/>
                            </FormControl>    
                        </Grid>   
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={formType} handleClick={props.RemoveChecksum} index={index} objectName='checksum'/>
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
                        <AddPropertyButton formType={formType} handleClick={props.AddChecksum}/>
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
                <FormGroup key={`drs child object ${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsChild.id} 
                                label='Id' margin='normal' name={drsChild.id} type='text' 
                                value={drsChild.id} InputProps={{readOnly: readOnlyValue}} 
                                onChange={(event) => props.UpdateChildId(index, event.target.value)}/>                        
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsChild.name} 
                                label='Name' margin='normal' name={drsChild.name} type='text' 
                                value={drsChild.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant='contained' component={Link} to={`/drs/${drsChild.id}`} color='primary'>View</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={formType} handleClick={props.RemoveChild} index={index} objectName='bundle child'/>
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
                        <AddPropertyButton formType={formType} handleClick={props.AddChild}/>
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
                <FormGroup key={`drs parent object ${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsParent.id} 
                                label='Id' margin='normal' name={drsParent.id} type='text' 
                                value={drsParent.id} InputProps={{readOnly: readOnlyValue}} 
                                onChange={(event) => props.UpdateParentId(index, event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsParent.name} 
                                label='Name' margin='normal' name={drsParent.name} type='text' 
                                value={drsParent.name} InputProps={{readOnly: true}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant='contained' component={Link} to={`/drs/${drsParent.id}`} color='primary'>View</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={formType} handleClick={props.RemoveParent} index={index} objectName='parent bundle'/>
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
                        <AddPropertyButton formType={formType} handleClick={props.AddParent}/>
                    </Grid>
                </Grid>
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
                <FileAccessObjects file_access_objects={fileAccessObjects} readOnly={readOnlyValue} formType={formType} 
                AddFileAccessObject={props.AddFileAccessObject} UpdateFileAccessObject={props.UpdateFileAccessObject}
                RemoveFileAccessObject={props.RemoveFileAccessObject}/>
                <AwsS3AccessObjects aws_s3_access_objects={awsAccessObjects} readOnly={readOnlyValue} formType={formType} 
                AddAwsAccessObject={props.AddAwsAccessObject} UpdateRegion={props.UpdateRegion} 
                UpdateBucket={props.UpdateBucket} UpdateKey={props.UpdateKey}
                RemoveAwsS3AccessObject={props.RemoveAwsS3AccessObject}/>
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
                <Grid container alignItems='center' spacing={4}>
                    <Grid item xs={11}>
                        <FormControl fullWidth key={`file access object ${index}`}>
                            <TextField
                                variant='outlined' id='path' label='Path' margin='normal'
                                name='path' type='text'
                                value={fileAccessObject.path}
                                InputProps={{readOnly: readOnlyValue}}
                                helperText='The filesystem path to the local file storing 
                                    DRS Object bytes'
                                onChange={(event) => props.UpdateFileAccessObject(index, event.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <RemovePropertyButton formType={props.formType} handleClick={props.RemoveFileAccessObject} index={index} objectName='local file access point'/>
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
                        <AddPropertyButton formType={props.formType} handleClick={props.AddFileAccessObject}/>
                    </Grid>
                </Grid>
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
        const awsAccessDisplay = awsAccessObjects.map((awsAccessObject, index) => {
            return (
                <FormGroup key={`aws access object ${index}`} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='region' 
                                label='Region' margin='normal' name='region' type='text' 
                                value={awsAccessObject.region} InputProps={{readOnly: readOnlyValue}} 
                                helperText='Region where AWS S3 service is located.' 
                                onChange={(event) => props.UpdateRegion(index, event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='bucket' 
                                label='Bucket' margin='normal' name='bucket' type='text' 
                                value={awsAccessObject.bucket} InputProps={{readOnly: readOnlyValue}} 
                                helperText='AWS S3 bucket containing the DRS Object.' 
                                onChange={(event) => props.UpdateBucket(index, event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='key' 
                                label='Key' margin='normal' name='key' type='text' 
                                value={awsAccessObject.key} InputProps={{readOnly: readOnlyValue}} 
                                helperText='Path within the bucket to the S3 object storing DRS Object bytes.' 
                                onChange={(event) => props.UpdateKey(index, event.target.value)}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <RemovePropertyButton formType={props.formType} handleClick={props.RemoveAwsS3AccessObject} index={index} objectName='AWS S3 access point'/>
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
                <Grid container>
                    <Grid item>
                        <AddPropertyButton formType={props.formType} handleClick={props.AddAwsAccessObject}/>
                    </Grid>
                </Grid>
            </FormGroup>
        );
    }
}

const DrsObject = (props) => {
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
                <FormControl fullWidth>
                    <TextField id='id' label='Id' margin='normal' name='id' type='text' 
                    value={drsObjectDetails.id} InputProps={{readOnly: readOnlyValue}} 
                    onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                    helperText='Unique identifier for this DRS Object (UUID recommended), cannot be modified later.'/>
                </FormControl>
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
                            <TextField id='created_time' label='Created Time' margin='normal' name='created_time' type='text' 
                            value={drsObjectDetails.created_time} InputProps={{readOnly: readOnlyValue}} 
                            onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                            helperText='Timestamp of DRS Object creation in ISO 8601 format'/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField id='updated_time' label='Updated Time' margin='normal' name='updated_time' type='text' 
                            value={drsObjectDetails.updated_time} InputProps={{readOnly: readOnlyValue}} 
                            onChange={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}
                            helperText='Timestamp of when the DRS Object was most recently updated in ISO 8601 format'/>
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
                <BundleBlobRadio formType={formType} drsObjectType={drsObjectDetails.drs_object_type} readOnly={readOnlyValue} 
                UpdateDrsObjectType={e => props.drsObjectFunctions.updateScalarProperty(e.target.name, e.target.value)}/>
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
                <Aliases aliases={drsObjectDetails.aliases} readOnly={readOnlyValue} formType={formType} 
                    AddAlias={() => props.drsObjectFunctions.addListItem('aliases', props.drsObjectFunctions.newAlias)} 
                    UpdateAlias={(index, newValue) => props.drsObjectFunctions.updateAlias(index, newValue)}
                    RemoveAlias={(index) => props.drsObjectFunctions.removeAlias(index)}/>
                <Checksums checksums={drsObjectDetails.checksums} readOnly={readOnlyValue} formType={formType} 
                    drsObjectType={drsObjectDetails.drs_object_type} 
                    AddChecksum={() => props.drsObjectFunctions.addListItem('checksums', props.drsObjectFunctions.newChecksum)} 
                    UpdateChecksumValue={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('checksums', index, 'checksum', newValue)}
                    UpdateChecksumType={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('checksums', index, 'type', newValue)}
                    RemoveChecksum={(index) => props.drsObjectFunctions.removeListItem('checksums', index)}/>
                <DrsObjectChildren drs_object_children={drsObjectDetails.drs_object_children} readOnly={readOnlyValue} formType={formType} 
                    drsObjectType={drsObjectDetails.drs_object_type} 
                    AddChild={() => props.drsObjectFunctions.addListItem('drs_object_children', props.drsObjectFunctions.newDrsObjectChild)} 
                    UpdateChildId={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('drs_object_children', index, 'id', newValue)}
                    RemoveChild={(index) => props.drsObjectFunctions.removeListItem('drs_object_children', index)}/>
                <DrsObjectParents drs_object_parents={drsObjectDetails.drs_object_parents} readOnly={readOnlyValue} formType={formType} 
                    AddParent={() => props.drsObjectFunctions.addListItem('drs_object_parents', props.drsObjectFunctions.newDrsObjectParent)} 
                    UpdateParentId={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('drs_object_parents', index, 'id', newValue)}
                    RemoveParent={(index) => props.drsObjectFunctions.removeListItem('drs_object_parents', index)}/>
                <AccessPoints drsObject={drsObjectDetails} readOnly={readOnlyValue} formType={formType} 
                    drsObjectType={drsObjectDetails.drs_object_type} 
                    AddFileAccessObject={() => props.drsObjectFunctions.addListItem('file_access_objects', props.drsObjectFunctions.newFileAccessObject)} 
                    UpdateFileAccessObject={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('file_access_objects', index, 'path', newValue)}
                    RemoveFileAccessObject={(index) => props.drsObjectFunctions.removeListItem('file_access_objects', index)} 
                    AddAwsAccessObject={() => props.drsObjectFunctions.addListItem('aws_s3_access_objects', props.drsObjectFunctions.newAwsS3AccessObject)} 
                    UpdateRegion={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'region', newValue)}
                    UpdateBucket={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'bucket', newValue)} 
                    UpdateKey={(index, newValue) => props.drsObjectFunctions.updateObjectProperty('aws_s3_access_objects', index, 'key', newValue)}
                    RemoveAwsS3AccessObject={(index) => props.drsObjectFunctions.removeListItem('aws_s3_access_objects', index)}/>
            </form>
        </Container>
        </Box>
      </div>
    );
}

export default DrsObject;