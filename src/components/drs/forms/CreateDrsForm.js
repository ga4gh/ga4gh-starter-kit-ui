import '@fontsource/roboto';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Typography, 
    TextField,
    Container, 
    Button, 
    Input
} from '@material-ui/core';

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

const CreateDrsForm = () => {
    const[id, setId] = useState('');
    const[description, setDescription] = useState('');
    const[name, setName] = useState('');
    //const[newDrsObject, setNewDrsObject] = useState({});

    const HandleIdChange = (event) => {
        setId(event.target.value);
    }
    const HandleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const HandleNameChange = (event) => {
        setName(event.target.value);
    }

    const CreateNewDrsObject = (event) => {
        //setNewDrsObject();
        //return function-based component which makes api call using hooks
    }

    return (
    <div>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Container maxWidth='lg'>
            <Typography align='center' variant="h3" gutterBottom>Create New DRS Object</Typography>
            <form onSubmit={CreateNewDrsObject}>
                <TextField variant='outlined' id='id' required fullWidth label='id' margin='normal' value={id} onChange={HandleIdChange}></TextField>
                <TextField variant='outlined' id='description' required fullWidth label='description' margin='normal' value={description} onChange={HandleDescriptionChange}></TextField>
                <TextField variant='outlined' id='name' required fullWidth label='name' margin='normal' value={name} onChange={HandleNameChange}></TextField>
                <TextField variant='outlined' id='created_time' fullWidth label='created_time' margin='normal'></TextField>
                <TextField variant='outlined' id='updated_time' fullWidth label='updated_time'margin='normal'></TextField>
                <TextField variant='outlined' id='mime_type' fullWidth label='mime_type' margin='normal'></TextField>
                <TextField variant='outlined' id='size' fullWidth label='size' margin='normal'></TextField>
                <TextField variant='outlined' id='version'  fullWidth label='version' margin='normal'></TextField>
                <TextField variant='outlined' id='aliases' fullWidth label='aliases' margin='normal'></TextField>
                <TextField variant='outlined' id='checksums' fullWidth label='checksums' margin='normal'></TextField>
                <TextField variant='outlined' id='drs_object_children' fullWidth label='drs_object_children' margin='normal'></TextField>
                <TextField variant='outlined' id='drs_object_parents' fullWidth label='drs_object_parents' margin='normal'></TextField>
                <TextField variant='outlined' id='access_methods' fullWidth label='access_methods' margin='normal'></TextField>
                <Button variant='contained' color='default'>
                    <Input type='submit' value='Create DRS Object'></Input>
                </Button>
            </form>
        </Container>
    </div>
    );
}

export default CreateDrsForm;