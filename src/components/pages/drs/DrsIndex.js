import '@fontsource/roboto';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  useRouteMatch
} from "react-router-dom";

const DrsIndex = () => {
  let match = useRouteMatch();
  return(
    <div align="center">
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <Typography variant="h2">Welcome to DRS Starter Kit</Typography>
    </div>
  );
}

  export default DrsIndex;