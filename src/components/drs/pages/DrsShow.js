import '@fontsource/roboto';
import React, {
  useState, 
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

const DrsShow = () => {
  let { objectId } = useParams();
  const [drsObjectDetails, setDrsObjectDetails] = useState(null);
  const [errorState, setError] = useState(null);

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
          setDrsObjectDetails(response.data);
        },
        (error) => {
          if (axios.isCancel(error)) {
            console.log('DrsShow request has been cancelled');
          }
          else {
            setError(error);
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

  if(errorState){
    if(errorState.response) {
      return (
        <div align="center">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
          <Typography variant="h4" gutterBottom>Error</Typography>
          <Typography gutterBottom>{errorState.response.data.message}</Typography>
          <Typography gutterBottom>{errorState.response.data.error}</Typography>
        </div>
      );
    }
    else if(errorState.request) {
      return (
        <div align="center">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
          <Typography variant="h4" gutterBottom>Error</Typography>
          <Typography gutterBottom>{errorState.request}</Typography>
        </div>
      );
    }
    else {
      return (
        <div align="center">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
          <Typography variant="h4" gutterBottom>Error</Typography>
          <Typography gutterBottom>{errorState.message}</Typography>
        </div>
      );
    }
  }

  else {
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
            <DrsObjectForm drsObjectDetails={drsObjectDetails} readOnly={true}/>
          </Container>
        </div>
      );
    }
  }
}

export default DrsShow;