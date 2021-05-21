import './App.css';
import '@fontsource/roboto';
import React from 'react';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <h1>Welcome to the GA4GH Starter Kit</h1>
        <header className="App-header">
          <h3>Get started</h3>
          <p>Click the buttons below to start using one of the GA4GH Starter Kits</p>
          <Button variant="contained" color="primary" onClick={() => { }}>DRS Starter Kit</Button>
        </header>
      </div>
    );
  }
}

export default App;
