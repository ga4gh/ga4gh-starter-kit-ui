import '@fontsource/roboto';
import React, { useEffect} from 'react';
import { 
    Typography, 
    Container, 
    Grid, 
    Button
} from '@material-ui/core';
import DrsObjectForm from '../DrsObjectForm';
import {
    Link
  } from "react-router-dom";

const NewDrs = (props) => {

    let newDrsObject = props.drsObjectProperties.newDrsObject;
    console.log(newDrsObject);
    let activeDrsObject = props.activeDrsObject;
    console.log(activeDrsObject);
    
    useEffect(() => {
        if(activeDrsObject === null) {
            props.updateActiveDrsObject(newDrsObject);
        }  
    })
    console.log(activeDrsObject);

    if(!activeDrsObject) {
        return (
            <div>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <Container maxWidth='lg'>
                    <Typography align='center' variant="h3" gutterBottom>Create New DRS Object</Typography>
                </Container>
            </div>
        );
    }
    else {
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
                        <Typography align='center' variant="h3" gutterBottom>Create New DRS Object</Typography>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
                <DrsObjectForm 
                    drsObjectDetails={activeDrsObject} 
                    readOnlyId={false}
                    readOnlyForm={false}
                    drsObjectFunctions={props.drsObjectFunctions}
                    drsObjectProperties={props.drsObjectProperties}
                    checksumTypes={props.checksumTypes}
                    updateActiveDrsObject={props.updateActiveDrsObject}
                />
            </Container>
        </div>
        );    
    }
    
}

export default NewDrs;