import './App.css';
import '@fontsource/roboto';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom>Welcome to the GA4GH Starter Kit</Typography>
          <Typography variant="h3" gutterBottom>Get Started</Typography>
          <Typography variant="body1" gutterBottom>Click the buttons below to start using one of the GA4GH Starter Kits</Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => { }}>DRS Starter Kit</Button>
        </Container>
      </div>
    );
  }
}

export default App;
