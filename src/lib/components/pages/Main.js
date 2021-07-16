import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom'
import About from './About';
import Home from './Home';
import StarterKitAppBar from '../common/StarterKitAppBar';
import StarterKitBottomNav from '../common/StarterKitBottomNav';
import DrsMain from '../drs/DrsMain';
import { makeStyles } from '@material-ui/core/styles';

const Main = () => {
    const useStyles = makeStyles((theme) => ({
        contentRoot: {
            minHeight: '100vh',
        }
    }));
    const classes = useStyles();

    return (
        <div>
            <div className={classes.contentRoot}>
                <div>
                    <StarterKitAppBar />
                    <Route path='/home' component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/drs' component={DrsMain} />
                </div>
            </div>
            <StarterKitBottomNav />
        </div>
    )
}

export default Main;
