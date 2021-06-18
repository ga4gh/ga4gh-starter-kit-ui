import '@fontsource/roboto';
import React from 'react';
import { 
  Typography, 
  Container
} from '@material-ui/core';
import {
    useParams
} from "react-router-dom";
import DrsObjectForm from '../DrsObjectForm';
import useDrsObjectDetails from './UseDrsObjectDetails';

const DrsShow = (props) => {
  let drsObjectDetails = props.activeDrsObject;
  let updateActiveDrsObject = props.updateActiveDrsObject;
  let handleError = props.handleError;
  let { objectId } = useParams();

  useDrsObjectDetails(drsObjectDetails, updateActiveDrsObject, handleError, objectId);

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