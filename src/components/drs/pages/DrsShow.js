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
import DrsObject from '../DrsObjectForm';

/* const ChildProperties = (props) => {
  const childPropertyKey = props.childPropertiesArray[0];
  const childPropertyValueArray = props.childPropertiesArray[1];

  if(childPropertyKey === 'drs_object_children' || childPropertyKey === 'drs_object_parents'){
    const drsObject = childPropertyValueArray.map((drs) => 
    {
      return(
        <ListItem key={drs.id}>
          <ListItemText secondary={`Name: ${drs.name}`}>
            <Link to={`/drs/${drs.id}`}>
              <Typography>ID: {drs.id}</Typography>
            </Link>
          </ListItemText>
        </ListItem>
      )
    })
    return(
      <List>{drsObject}</List>
    )
  }
  else {
    const arrayObjects = childPropertyValueArray.map((object) => 
    {
      if (typeof object === 'string') {
        return (
          <ListItem key={object}>
            <ListItemText primary={object}></ListItemText>
          </ListItem>
        );
      }
      else {
        let objectProperties = Object.entries(object);
        const properties = objectProperties.map((property) => 
        {
          return(
            <ListItem key={property[1]}>
              <ListItemText primary={`${property[0]}: ${property[1]}`}></ListItemText>
            </ListItem>
          );
        });
        return (
          <List key={objectProperties}>{properties}</List>
        );
      }
    });
    return(
      <List>{arrayObjects}</List>
    );
  }
}

const DrsDetailsRows = (props) => {
  const drsObjectDetails = props.drsObjectDetails;
  if (!drsObjectDetails){
    return(
      <TableBody />
    )
  }
  else {
    let drsProperties = Object.entries(drsObjectDetails);
    const details = drsProperties.map((property)=>
      {
        if (Array.isArray(property[1])){
          return(
          <TableRow key={property[0]}>
            <TableCell>
              <Typography>{property[0]}</Typography>
            </TableCell>
            <TableCell>
              <ChildProperties childPropertiesArray={property} />
            </TableCell>
          </TableRow>
          );
        }
      else {
        return(
        <TableRow key={property[0]}>
          <TableCell>
            <Typography>{property[0]}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{property[1]}</Typography>
          </TableCell>
        </TableRow>
        );
      }
    }
    );
    return(
      <TableBody>{details}</TableBody>
    );
  }
} */

const DrsShow = (props) => {
  const activeDrsObject = props.activeDrsObject;
  let { objectId } = useParams();
  //setState(activeDrsObject.id = objectId);
  const [drsObjectDetails, setDrsObjectDetails] = useState(null);
  const [errorState, setError] = useState(null);

  useEffect(() => {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects/'+objectId);
    const cancelToken = axios.CancelToken;
    const drsShowCancelToken = cancelToken.source();

    let getDrsObjectDetails = async () => {
      const response = await axios({
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
    console.log(drsObjectDetails);
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
            <DrsObject drsObjectDetails={drsObjectDetails} readOnly={true}/>
            {/* <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="h5">Property</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h5">Value</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <DrsDetailsRows drsObjectDetails={drsObjectDetails}/>
              </Table>
            </TableContainer> */}
          </Container>
        </div>
      );
    }
  }
}

export default DrsShow;