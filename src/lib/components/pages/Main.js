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

const Main = () => {
    return (
        <div>
            <StarterKitAppBar />
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/drs' component={DrsMain} />
            <StarterKitBottomNav />
        </div>
    )
}

export default Main;
