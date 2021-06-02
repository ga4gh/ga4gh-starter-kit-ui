import '@fontsource/roboto';
import React from 'react';
import { 
  Typography, 
  Container, 
  Table,
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Button
} from '@material-ui/core';
import {
  Link
} from "react-router-dom";

const DrsIndexRows = (props) => {
  const drsObjectsList = props.drsObjectsList;
  if (!drsObjectsList){
    return(
      <TableBody></TableBody>
    )
  }
  else {
    const rows = drsObjectsList.map((drsObject) =>
    <TableRow key={drsObject.name}>
      <TableCell align="left">
        <Typography>{drsObject.id}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{drsObject.name}</Typography>
      </TableCell>
      <TableCell align="right">
        <Link to={`/drs/${drsObject.id}`}>
          <Button variant="contained" color='default'>
            <Typography variant="button">View Details</Typography>
          </Button>
        </Link>
      </TableCell>
    </TableRow>
    );
  return (
    <TableBody>{rows}</TableBody>
  );
  }
}

const DrsIndex = (props) => {
  return (
    <div align="center">
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <Typography variant="h2" gutterBottom>Welcome to DRS Starter Kit</Typography>
      <Container align='right' maxWidth="lg">
        <Link to='/drs/create'>
          <Button variant='contained'>
          <Typography variant='button'>Create New DRS Object</Typography>
          </Button>
        </Link>
      </Container>
      <Container maxWidth="lg">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="h5">DRS Object ID</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h5">Name</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5">View DRS Object Details</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <DrsIndexRows drsObjectsList={props.drsObjectsList}/>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

  export default DrsIndex;