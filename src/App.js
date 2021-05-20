import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto';

function App() {
  return (
    <div className="App">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <h1>Welcome to the GA4GH Starter Kit</h1>
      <h2>This app is built with Semantic UI React</h2>
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
