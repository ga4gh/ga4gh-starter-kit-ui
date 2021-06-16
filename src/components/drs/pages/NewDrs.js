import '@fontsource/roboto';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Typography, 
    Container
} from '@material-ui/core';
import DrsObjectForm from '../DrsObjectForm';

/* const CreateDrsObject = (props) => {
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
} */

const NewDrs = (props) => {

    let newDrsObject = props.newDrsObject;
    let activeDrsObject = props.activeDrsObject;
    
    useEffect(() => {
        if(activeDrsObject === null) {
            props.updateActiveDrsObject(newDrsObject);
        }  
    })
    console.log(activeDrsObject);

    /* const CreateNewDrsObject = (event) => {
        event.preventDefault();
        //return function-based component which makes api call using hooks
        // <CreateDrsObject id={id} description={description} name={name} />
    } */

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
                <Typography align='center' variant="h3" gutterBottom>Create New DRS Object</Typography>
                <DrsObjectForm 
                    drsObjectDetails={activeDrsObject} 
                    readOnly={false} 
                    formType='NewDrs'
                    drsObjectFunctions={props.drsObjectFunctions}
                    checksumTypes={props.checksumTypes}
                />
            </Container>
        </div>
        );    
    }
    
}

export default NewDrs;