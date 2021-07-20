import '@fontsource/roboto';
import React, { useEffect } from 'react';
import { 
  Typography, 
  Container, 
  Table,
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Button, 
  Grid,
  Paper,
  Breadcrumbs,
  Link as MuiLink
} from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import {
  Link, 
  useLocation
} from "react-router-dom";
import { scrollToTop } from '../../../../functions/common';
import PageContainer from '../../../../common/layout/PageContainer';

  /* Render index table rows populated with data */
const DrsIndexRows = (props) => {
  const drsObjectsList = props.drsObjectsList;
  if (!drsObjectsList){
    return null;
  }
  else {
    const rows = drsObjectsList.map((drsObject) =>
    <TableRow key={drsObject.id}>
      <TableCell align="left">{drsObject.id}</TableCell>
      <TableCell align="left">{drsObject.name}</TableCell>
      <TableCell align="left">
        <Button variant="outlined" color='secondary' component={Link} to={`/drs/${drsObject.id}`}>
          View
        </Button>
      </TableCell>
      <TableCell align="center">
        <IconButton 
          variant="contained" 
          color='primary' 
          component={Link} 
          to={`/drs/${drsObject.id}/edit`}
          onClick={scrollToTop}
        >
          <EditIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
    );
    return (
      <TableBody>{rows}</TableBody>
    );
  }
}

const DrsObjectIndex = (props) => {
  /* Restore scroll to top of page on navigation to a new page */
  console.log('inside DRS Object Index!!');
  const { pathname }  = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  /* Render DrsIndex page */
  return (
    <PageContainer>
      <Breadcrumbs>
        <Link color="inherit" to="/home">starter-kit</Link>
        <Link>services</Link>
        <Link>org.ga4gh.my-drs-service</Link>
        <Link to="/drs">drs</Link>
      </Breadcrumbs>

      <div>
        <Button
          variant='text'
          component={Link}
          to='/'
          color='primary'
        >
          <ArrowBackIos />
          <Typography>back</Typography>
        </Button>
      </div>
      <div>
        <Button variant='contained' component={Link} to='/drs/new' color='primary' size='large'>
          <Typography variant='button'>New DRS Object</Typography>
        </Button>
      </div>
    
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">DRS Object ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <DrsIndexRows drsObjectsList={props.drsObjectsList}/>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}

export default DrsObjectIndex;
