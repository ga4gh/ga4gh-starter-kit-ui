import '@fontsource/roboto';
import React, { 
  useEffect
} from 'react';
import axios from 'axios';
import { 
  Typography, 
  Container
} from '@material-ui/core';
import {
    useParams
} from "react-router-dom";
import DrsObjectForm from '../DrsObjectForm';

const DrsShow = (props) => {
  let drsObjectDetails = props.activeDrsObject;
  let updateActiveDrsObject = props.updateActiveDrsObject;
  let handleError = props.handleError;
  let { objectId } = useParams();

  useEffect(() => {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects/'+objectId);
    const cancelToken = axios.CancelToken;
    const drsShowCancelToken = cancelToken.source();

    let getDrsObjectDetails = async () => {
      await axios({
        url: requestUrl,
        method: 'GET',
        cancelToken: drsShowCancelToken.token
      })
      .then (
        (response) => {
          let activeDrsObject = response.data;
          if(response.data.drs_object_children) {
            activeDrsObject.isBundle = true;
            activeDrsObject.isBlob = false;
          }
          else {
            activeDrsObject.isBlob = true;
            activeDrsObject.isBundle = false;
          }
          updateActiveDrsObject(activeDrsObject);
        },
        (error) => {
          if (axios.isCancel(error)) {
            console.log('DrsShow request has been cancelled');
          }
          else {
            handleError(error);
          }
        }
      )
    } 

    if(!drsObjectDetails){
      getDrsObjectDetails();
    }

    return () => {
      drsShowCancelToken.cancel('Cleanup DrsShow');
    };
  }, [drsObjectDetails]);

  if(!drsObjectDetails) {
    return (
      <div align="center">
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <Typography variant="h3" gutterBottom>DRS Object Details</Typography>
    </div>
    );
  }
  else {
    return(
      <div align="center">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
        <Typography variant="h3" gutterBottom>DRS Object Details</Typography>
        <Container maxWidth="lg">
          <DrsObjectForm 
            drsObjectDetails={drsObjectDetails} 
            readOnlyId={true}
            readOnlyForm={true}
            checksumTypes={props.checksumTypes}/>
        </Container>
      </div>
    );
  }
}

export default DrsShow;