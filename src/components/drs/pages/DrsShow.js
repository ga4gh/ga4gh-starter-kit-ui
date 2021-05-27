import '@fontsource/roboto';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { 
  Typography, 
  Container, 
  Table,
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell
} from '@material-ui/core';
import {
    useParams
  } from "react-router-dom";

const DrsDetailsRows = (props) => {
  const drsObjectDetails = props.drsObjectDetails;
  if (!drsObjectDetails){
    return(
      <TableBody></TableBody>
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
}

const DrsShow = () => {
  let { objectId } = useParams();
  const [drsObjectDetails, setDrsObjectDetails] = useState(null);

  useEffect(() => {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects/'+objectId);
    console.log(requestUrl);
    let getDrsObjectDetails = async () => {
      try {
        const response = await axios.get(requestUrl);
        console.log(response);
        setDrsObjectDetails(response.data);
      }
      catch(error){
        console.log(error)
      }
    }
    if(!drsObjectDetails){
      getDrsObjectDetails();
    }
  });

  return(
      <div align="center">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
    />
      <Typography variant="h3">DRS Object Details</Typography>
      <Container maxWidth="lg">
        <TableContainer>
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
        </TableContainer>
      </Container>
  </div>
  );
}

export default DrsShow;