import '@fontsource/roboto';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import DrsObject from './DrsObject'

function DrsStarterKit() {
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
          <DrsObject />
        </Route>
      </Switch>
    </div>
  );
}

  export default DrsStarterKit;