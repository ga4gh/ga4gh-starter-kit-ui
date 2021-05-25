import '@fontsource/roboto';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    useParams
  } from "react-router-dom";

const DrsShow = () => {
  let { objectId } = useParams();
  return(
      <div align="center">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
    />
      <Typography variant="h2">DRS Object {objectId}</Typography>
  </div>
  );
}

export default DrsShow;