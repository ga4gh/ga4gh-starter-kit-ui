import '@fontsource/roboto';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import DrsShow from './DrsShow'

const DrsIndex = () => {
  let match = useRouteMatch();
  return(
    <div align="center">
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <Typography variant="h2">Welcome to DRS Starter Kit</Typography>
      <Switch>
        <Route path={`${match.path}/:objectId`}>
          <DrsShow />
        </Route>
      </Switch>
    </div>
  );
}

  export default DrsIndex;