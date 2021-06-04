import '@fontsource/roboto';
import React from 'react';
import { 
    Typography, 
    Container, 
    FormControl,
    TextField, 
    Grid, 
    FormGroup, 
    Button
} from '@material-ui/core';
import {
    Link
} from "react-router-dom";

const MimeType = (props) => {
    let mimeType = props.mimeType;
    let readOnlyValue = props.readOnly;
    if(!mimeType) {
        return null;
    }
    else {
        return (
            <FormControl fullWidth>
                <TextField id='mime_type' label='mime_type' margin='normal' name='mime_type' type='text' value={mimeType} InputProps={{readOnly: readOnlyValue}}/>
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
                <TextField id='size' label='size' margin='normal' name='size' type='number' value={size} InputProps={{readOnly: readOnlyValue}}/>
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
                <br/>
                <Typography align='left' variant='h6'>Aliases</Typography>
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
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={checksum.type} label='type' margin='normal' name='type' type='text' value={checksum.type} InputProps={{readOnly: readOnlyValue}}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' id={checksum.checksum} label='checksum' margin='normal' name='checksum' type='checksum' value={checksum.checksum} InputProps={{readOnly: readOnlyValue}}/>
                            </FormControl>    
                        </Grid>    
                    </Grid>
                    
                </FormGroup>
            );
        })
        return(
            <FormGroup>
                <br/>
                <Typography align='left' variant='h6'>Checksums</Typography>
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
                <br/>
                <Typography align='left' variant='h6'>DRS Object Children</Typography>
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
                <br/>
                <Typography align='left' variant='h6'>DRS Object Parents</Typography>
                {drsParentsDisplay}
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
    else{
        const fileAccessDisplay = fileAccessObjects.map((fileAccessObject) => {
            return (
                <FormControl fullWidth key='file_access_object'>
                    <TextField variant='outlined' id='path' label='path' margin='normal' name='path' type='text' value={fileAccessObject.path} InputProps={{readOnly: readOnlyValue}}/>
                </FormControl>
            );
        })
        return (
          <FormGroup>
              <br />
              <Typography align='left' variant='h6'>File Access Objects</Typography>  
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
                                <TextField variant='outlined' fullWidth id='region' label='region' margin='normal' name='region' type='text' value={awsAccessObject.region} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}> 
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='bucket' label='bucket' margin='normal' name='bucket' type='text' value={awsAccessObject.bucket} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' fullWidth id='key' label='key' margin='normal' name='key' type='text' value={awsAccessObject.key} InputProps={{readOnly: readOnlyValue}}/>                            
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormGroup>
            );
        })
        return (
            <FormGroup>
                <br/>
                <Typography align='left' variant='h6'>AWS S3 Access Objects</Typography>
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
                <TextField id='id' label='id' margin='normal' name='id' type='text' value={drsObjectDetails.id} InputProps={{readOnly: readOnlyValue}}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField id='name' label='name' margin='normal' name='name' type='text' value={drsObjectDetails.name} InputProps={{readOnly: readOnlyValue}}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField id='description' label='description' margin='normal' name='description' type='text' value={drsObjectDetails.description} InputProps={{readOnly: readOnlyValue}}/>
            </FormControl>
            <Grid container justify='space-evenly' spacing={4}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='created_time' label='created_time' margin='normal' name='created_time' type='text' value={drsObjectDetails.created_time} InputProps={{readOnly: readOnlyValue}}/>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='updated_time' label='updated_time' margin='normal' name='updated_time' type='text' value={drsObjectDetails.updated_time} InputProps={{readOnly: readOnlyValue}}/>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='version' label='version' margin='normal' name='version' type='text' value={drsObjectDetails.version} InputProps={{readOnly: readOnlyValue}}/>
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
            <FileAccessObjects file_access_objects={drsObjectDetails.file_access_objects} readOnly={readOnlyValue}/>
            <AwsS3AccessObjects aws_s3_access_objects={drsObjectDetails.aws_s3_access_objects} readOnly={readOnlyValue}/>
          </form>
      </Container>
      </div>
    );
}

export default DrsObject;