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
    Box
} from '@material-ui/core';
import {
    Link
} from "react-router-dom";
import { spacing } from '@material-ui/system';

const SpaceDivider = () => {
    return (
        <Box py={4}>
            <Divider />
        </Box>
    );
}

const MimeType = (props) => {
    let mimeType = props.mimeType;
    let readOnlyValue = props.readOnly;
    if(!mimeType) {
        return null;
    }
    else {
        return (
            <FormControl fullWidth>
                <TextField 
                id='mime_type' label='mime_type' margin='normal' name='mime_type' type='text' value={mimeType} InputProps={{readOnly: readOnlyValue}}
                helperText='The mime-type of the DRS Object represented as a string.'/>
            </FormControl>
        );
        
    }
}

const Size = (props) => {
    let size = props.size;
    let readOnlyValue = props.readOnly;
    if(!size) {
        return null;
    }
    else {
        return (
            <FormControl fullWidth>
                <TextField id='size' label='size' margin='normal' name='size' type='number' value={size} InputProps={{readOnly: readOnlyValue}}
                helperText='The size (in bytes) of the DRS Object represented as an integer.'/>
            </FormControl>
        );
    }
}

const Aliases = (props) => {
    let aliases = props.aliases;
    let readOnlyValue = props.readOnly;
    if(!aliases) {
        return null;
    }
    else {
        const aliasesDisplay = aliases.map((alias) => {
            return (
                <Grid item key={alias}>
                    <FormControl>
                        <TextField variant='outlined' id={alias} margin='normal' name='alias' type='text' value={alias} InputProps={{readOnly: readOnlyValue}}/>
                    </FormControl>
                </Grid>
            );
        })
        return (
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>Aliases</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>A list of strings that can be used to identify the DRS Object. The list of aliases is set when creating the DRS Object and can be modified by editing it.</Typography>
                <FormGroup row>
                   <Grid container spacing={4}>
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
    if(!checksums) {
        return null;
    }
    else {
        const checksumsDisplay = checksums.map((checksum) => {
            return (
                <FormGroup key={checksum.type} row>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={checksum.type} label='type' name='type' type='text' value={checksum.type} InputProps={{readOnly: readOnlyValue}} helperText='Hashing algorithm used to generate the checksum.'/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={checksum.checksum} label='checksum' name='checksum' type='checksum' value={checksum.checksum} InputProps={{readOnly: readOnlyValue}} helperText='Checksum digest value.'/>
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
                <Typography variant='body2' align='left' color='textSecondary'>Each DRS Object must have at least one checksum. For blob-type DRS Objects, checksums are calculated based on the bytes in the DRS Object. For bundle-type objects, checksums are calculated based on each of its DRS Object Children. The type and value of each checksum associated with the current DRS Object are shown below.</Typography>
                <br />
                {checksumsDisplay} 
            </FormGroup>
        );
    }
}

const DrsObjectChildren = (props) => {
    let drsChildren = props.drs_object_children;
    let readOnlyValue = props.readOnly;
    if(!drsChildren) {
        return null;
    }
    else {
        const drsChildrenDisplay = drsChildren.map((drsChild) => {
            return (
                <FormGroup key={drsChild.id} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsChild.name} label='name' margin='normal' name={drsChild.name} type='text' value={drsChild.name} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsChild.id} label='id' margin='normal' name={drsChild.id} type='text' value={drsChild.id} InputProps={{readOnly: readOnlyValue}}/>                        
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
                <Typography align='left' variant='h6'>DRS Object Children</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>DRS Object Children are bundle-type or blob-type DRS Objects associated with the current DRS Object. The name and DRS ID of each DRS Object Child associated with the current DRS Object are shown below. More details about each DRS Object Child can be accessed by clicking the corresponding "View Details" button.</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>The current DRS Object is a DRS Object Parent to each of its DRS Object Children. All bundles must have at least one DRS Object Child, while blobs represent a single DRS Object and do not have any DRS Object Children. DRS Object Children are set when creating or modifying a bundle-type DRS Object by identifying the DRS Object Child using its DRS ID.</Typography>
                {drsChildrenDisplay}
            </FormGroup>
        );
    }
}

const DrsObjectParents = (props) => {
    let drsParents = props.drs_object_parents;
    let readOnlyValue = props.readOnly;
    if(!drsParents) {
        return null;
    }
    else {
        const drsParentsDisplay = drsParents.map((drsParent) => {
            return (
                <FormGroup key={drsParent.id} row>
                    <Grid container alignItems='center' spacing={4}>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsParent.name} label='name' margin='normal' name={drsParent.name} type='text' value={drsParent.name} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id={drsParent.id} label='id' margin='normal' name={drsParent.id} type='text' value={drsParent.id} InputProps={{readOnly: readOnlyValue}}/>                            
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
                <Typography align='left' variant='h6'>DRS Object Parents</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>DRS Object Parents are bundle-type DRS Objects associated with the current DRS Object. The name and DRS ID of each DRS Object Parent associated with the current DRS Object are shown below. More details about each DRS Object Parent can be accessed by clicking the corresponding "View Details" button.</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>All DRS Object Parents are bundle-type DRS Objects, meaning that they must have at least one DRS Object Child. The current DRS Object is a DRS Object Child to each of its DRS Object Parents. DRS Object Parents are set when creating or modifying a DRS Object by identifying the DRS Object Parent using its DRS ID.</Typography>
                {drsParentsDisplay}
            </FormGroup>
        );
    }
}

const AccessPoints = (props) => {
    let fileAccessObjects = props.drsObject.file_access_objects;
    let awsAccessObjects = props.drsObject.aws_s3_access_objects;
    let readOnlyValue = props.readOnly;
    if(!fileAccessObjects && !awsAccessObjects) {
        return null;
    }
    else {
        return(
            <FormGroup>
                <SpaceDivider />
                <Typography align='left' variant='h6'>Access Points</Typography>
                <Typography variant='body2' align='left' color='textSecondary'>Access Points provide information about how the DRS Object data can be accessed.</Typography>
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
                    <TextField variant='outlined' id='path' label='path' margin='normal' name='path' type='text' value={fileAccessObject.path} InputProps={{readOnly: readOnlyValue}} helperText='A string that can be used to retrieve the DRS Object data.'/>
                </FormControl>
            );
        })
        return (
          <FormGroup>
              <br /> 
              <Typography align='left' variant='body1'>File Access Objects</Typography>
              <Typography variant='body2' align='left' color='textSecondary'>A list of access methods to retrieve DRS Object data.</Typography>
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
                                <TextField variant='outlined' fullWidth id='region' label='region' margin='normal' name='region' type='text' value={awsAccessObject.region} InputProps={{readOnly: readOnlyValue}} helperText='Region where AWS S3 service is located.'/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='bucket' label='bucket' margin='normal' name='bucket' type='text' value={awsAccessObject.bucket} InputProps={{readOnly: readOnlyValue}} helperText='AWS S3 bucket containing the DRS Object.'/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='key' label='key' margin='normal' name='key' type='text' value={awsAccessObject.key} InputProps={{readOnly: readOnlyValue}} helperText='Identifier used to access the DRS Object.'/>                            
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormGroup>
            );
        })
        return (
            <FormGroup>
            <br /> 
            <Typography align='left' variant='body1'>AWS S3 Access Objects</Typography>
            <Typography variant='body2' align='left' color='textSecondary'>Information needed to access the DRS Object stored in AWS S3.</Typography>
                {awsAccessDisplay}
            </FormGroup>
        );
    }
}

const DrsObject = (props) => {
    let drsObjectDetails = props.drsObjectDetails;
    let readOnlyValue = props.readOnly;
    return (
        <div align="center">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <Container maxWidth='lg'>
          <form>
            <FormControl fullWidth>
                <TextField id='id' label='id' margin='normal' name='id' type='text' value={drsObjectDetails.id} InputProps={{readOnly: readOnlyValue}} 
                helperText='A unique identifier for each DRS Object in the form of a string. This property is set when the DRS Object is created and cannot be modified afterwards.'/>
            </FormControl>
            <FormControl fullWidth>
                <TextField id='name' label='name' margin='normal' name='name' type='text' value={drsObjectDetails.name} InputProps={{readOnly: readOnlyValue}}
                helperText='A name to represent and identify the DRS Object. This property is set when the DRS Object is created and can be modified by editing the DRS Object.'/>
            </FormControl>
            <FormControl fullWidth>
                <TextField id='description' label='description' margin='normal' name='description' type='text' value={drsObjectDetails.description} InputProps={{readOnly: readOnlyValue}}
                helperText='A description of the DRS Object. This property is set when the DRS Object is created and can be modified by editing the DRS Object.'/>
            </FormControl>
            <Grid container justify='space-evenly' spacing={4}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='created_time' label='created_time' margin='normal' name='created_time' type='text' value={drsObjectDetails.created_time} InputProps={{readOnly: readOnlyValue}}
                        helperText='The time the DRS Object was created, represented in string (date-time) format. The default value is set to the time that the DRS Object was created using DRS Starter Kit, however it can also be set manually.'/>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='updated_time' label='updated_time' margin='normal' name='updated_time' type='text' value={drsObjectDetails.updated_time} InputProps={{readOnly: readOnlyValue}}
                        helperText='The time the DRS Object was most recently updated, represented in string (date-time) format. The default value is set to the time that the DRS Object was most recently edited using DRS Starter Kit, however is can also be set manually.'/>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='version' label='version' margin='normal' name='version' type='text' value={drsObjectDetails.version} InputProps={{readOnly: readOnlyValue}}
                        helperText='The current version of the DRS Object represented by a string. This should be updated when the DRS Object is modified.'/>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container justify='flex-start' spacing={4}>
                <Grid item xs={4}>
                    <MimeType mimeType={drsObjectDetails.mime_type} readOnly={readOnlyValue}/>
                </Grid>
                <Grid item xs={4}>
                    <Size size={drsObjectDetails.size} readOnly={readOnlyValue}/>
                </Grid>
            </Grid>
            <Aliases aliases={drsObjectDetails.aliases} readOnly={readOnlyValue}/>
            <Checksums checksums={drsObjectDetails.checksums} readOnly={readOnlyValue}/>
            <DrsObjectChildren drs_object_children={drsObjectDetails.drs_object_children} readOnly={readOnlyValue}/>
            <DrsObjectParents drs_object_parents={drsObjectDetails.drs_object_parents} readOnly={readOnlyValue}/>
            <AccessPoints drsObject={drsObjectDetails} readOnly={readOnlyValue}/>
          </form>
      </Container>
      </div>
    );
}

export default DrsObject;