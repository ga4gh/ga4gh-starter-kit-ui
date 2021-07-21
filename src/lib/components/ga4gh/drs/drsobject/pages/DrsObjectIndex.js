import React from 'react';
import { 
  Typography, 
  Table,
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Button, 
  Paper,
  Link as MuiLink
} from '@material-ui/core';
import {
  Link, 
  useLocation
} from "react-router-dom";
import { scrollToTop } from '../../../../../functions/common';
import { PageContainer } from '../../../../common/layout';
import {
  BackButton,
  BreadcrumbTrail
} from '../../../../common/navigation';
import drsObjectIndexStyles from '../../../../../styles/ga4gh/drs/drsobject/pages/drsObjectIndexStyles';

const DrsObjectIndex = (props) => {
  /* Restore scroll to top of page on navigation to a new page */
  const { pathname }  = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  const classes = drsObjectIndexStyles();

  /* Render DrsIndex page */
  return (
    <PageContainer>
      <BreadcrumbTrail trail={props.trail} /*trail={props.trail}*/ />
      <BackButton to=".." />

      <div>
        <Button
          className={classes.newButton}
          variant='contained'
          component={Link}
          to={`${props.baseURL}/new`}
          color='primary'
          size='large'
        >
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
          <TableBody>
            {props.drsObjectsList.map(drsObject => {
              return (
                <TableRow key={drsObject.id}>
                  <TableCell align="left">{drsObject.id}</TableCell>
                  <TableCell align="left">{drsObject.name}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color='secondary'
                      component={Link}
                      to={`${props.baseURL}/${drsObject.id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}

export default DrsObjectIndex;
