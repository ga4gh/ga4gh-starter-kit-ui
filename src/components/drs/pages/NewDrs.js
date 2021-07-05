import '@fontsource/roboto';
import React from 'react';
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

/* Render NewDrs page */
const NewDrs = (props) => {
    console.log('new drs page');
    let activeDrsObject = props.activeDrsObject;
    console.log(activeDrsObject);

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
                    activeDrsObject={activeDrsObject} 
                    readOnlyId={false}
                    readOnlyForm={false}
                    drsObjectFunctions={props.drsObjectFunctions}
                    drsObjectProperties={props.drsObjectProperties}
                    updateSubmitNewDrsRedirect={props.updateSubmitNewDrsRedirect}
                />
            </Container>
        </div>
    );  
    
}

export default NewDrs;