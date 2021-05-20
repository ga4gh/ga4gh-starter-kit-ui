import logo from './logo.svg';
import './App.css';
import { Header } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Header as='h1'>Welcome to the GA4GH Starter Kit</Header>
      <Header as='h2'>This app is built with Semantic UI React</Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
