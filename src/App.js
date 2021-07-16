import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import Landing from './lib/components/pages/Landing';
import DrsMain from './lib/components/drs/DrsMain';
import Main from './lib/components/pages/Main';
import theme from './lib/styles/theme/theme';

const App = () => {
  
    return (
        //<ThemeProvider theme={theme}>
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
