import '@fontsource/roboto';
import React, {
  useState, 
  useEffect
} from 'react';
import axios from 'axios';
import { 
  Typography, 
  Container, 
  Table,
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  List, 
  ListItem, 
  ListItemText
} from '@material-ui/core';
import {
    useParams, 
    Link
} from "react-router-dom";

const ChildProperties = (props) => {
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
  else if (typeof childPropertyValueArray[0] === 'string') {
    const arrayStrings = childPropertyValueArray.map((string) => 
    {
      return (
        <ListItem key={string}>
          <ListItemText primary={string}></ListItemText>
        </ListItem>
      );
    });
    return (
      <List>{arrayStrings}</List>
    );
  }
  else {
    const arrayObjects = childPropertyValueArray.map((object)=>
      {
        let objectProperties = Object.entries(object);
        const properties = objectProperties.map((property) => 
        {
          return(
            <ListItem key={property[0]}>
              <ListItemText primary={`${property[0]}: ${property[1]}`}></ListItemText>
            </ListItem>
          );
        });
        return (
          <List>{properties}</List>
        );
      }
    );
    return(
      <List>{arrayObjects}</List>
    );
  }
}

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
}

const DrsShow = () => {
  let { objectId } = useParams();
  const [drsObjectDetails, setDrsObjectDetails] = useState(null);

  useEffect(() => {
    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects/'+objectId);
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
      <Typography variant="h3" gutterBottom>DRS Object Details</Typography>
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