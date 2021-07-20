import React from 'react';
import './App.css';
import '@fontsource/roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import {
    Landing,
    Main
} from './lib/components/pages';
import theme from './lib/styles/theme/theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route path='/**' component={Main} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
