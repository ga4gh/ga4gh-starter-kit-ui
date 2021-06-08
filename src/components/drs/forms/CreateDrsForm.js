import '@fontsource/roboto';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Box,
    Typography, 
    TextField,
    Container, 
    Button, 
    Input, 
    Grid, 
    IconButton
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const CreateDrsObject = (props) => {
    const newDrsObject=props.drsObject;

    useEffect(() => {
        let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
        let requestUrl=(baseUrl+'objects/'); //confirm that url is correct
        const cancelToken = axios.CancelToken;
        const createDrsCancelToken = cancelToken.source();

        let createDrsObject = async () => {
            await axios({
                url: requestUrl, 
                method: 'POST', 
                data: {newDrsObject},   //need to ensure correct data format
                cancelToken: createDrsCancelToken
            })
            .then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    if (axios.isCancel(error)) {
                        console.log('CreateDrsObject request has been cancelled');
                      }
                      else {
                        console.log(error);
                      }
                }
            )
        }
        //createDrsObject();
    })
}

const CreateDrsForm = (props) => {

    let activeDrsObject = props.activeDrsObject;
    console.log(activeDrsObject);

    /* useEffect(() => {
        if(!activeDrsObject) {
            console.log(activeDrsObject);
            props.resetDrsObject();
            console.log(activeDrsObject);
        }
    }) */

    const HandleIdChange = (event) => {
        props.updateId(event.target.value);
        console.log(activeDrsObject);
    }

    const CreateNewDrsObject = (event) => {
        event.preventDefault();
        //return function-based component which makes api call using hooks
        {/* <CreateDrsObject id={id} description={description} name={name} /> */}
    }

    return (
    <div>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Box>
            <Container maxWidth='lg'>
                <Typography align='center' variant="h3" gutterBottom>Create New DRS Object</Typography>
                <form onSubmit={CreateNewDrsObject}>
                    <TextField variant='outlined' id='id' required fullWidth label='id' margin='normal' value={activeDrsObject.id} onChange={HandleIdChange}></TextField>
                    <TextField variant='outlined' id='description' required fullWidth label='description' margin='normal' value={activeDrsObject.description}></TextField>
                    <Grid container justify='space-evenly' spacing={4}>
                        <Grid item xs={3}>
                            <TextField variant='outlined' id='name' required fullWidth label='name' margin='normal' value={activeDrsObject.name}></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField variant='outlined' id='mime_type' fullWidth label='mime_type' margin='normal' value={activeDrsObject.mime_type}></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField variant='outlined' id='size' fullWidth label='size' margin='normal' value={activeDrsObject.size}></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField variant='outlined' id='version' fullWidth label='version' margin='normal'></TextField>
                        </Grid>
                    </Grid>
                    {/* <Grid container alignItems='center' justify='flex-start' spacing={4}>
                        <Grid item>
                            <IconButton color='primary'>
                                <AddCircleIcon />
                            </IconButton>
                        </Grid>
                    </Grid> 
                    <Button variant='contained' color='default'>
                        <Input type='submit' value='Create DRS Object'></Input>
                    </Button> */}
                </form>
            </Container>
        </Box>
    </div>
    );
}

export default CreateDrsForm;