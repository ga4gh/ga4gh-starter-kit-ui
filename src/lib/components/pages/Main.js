import React, { useState } from 'react';
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
import Services from './Services';
import Service from './Service';
import hardCodedServiceConfigs from '../../temp/hardcodedServiceConfigs';

const Main = () => {
    const useStyles = makeStyles((theme) => ({
        contentRoot: {
            minHeight: '100vh',
        }
    }));
    const classes = useStyles();

    const homeTrail = [{to: '/home', label: 'starter-kit'}];
    const servicesTrail = [...homeTrail];
    servicesTrail.push({to: '/services', label: 'services'})

    return (
        <div>
            <div className={classes.contentRoot}>
                <div>
                    <StarterKitAppBar />

                    {/* render introductory pages */}
                    <Route path='/home'>
                        <Home trail={homeTrail} />
                    </Route>

                    <Route path='/about' component={About} />

                    <Route exact path='/services'>
                        <Services trail={servicesTrail} url='/services' />
                    </Route>

                    {/*
                        for each service in the config, render its service
                        summary, as well as the 'Main' component for its API
                        type
                    */}

                    {hardCodedServiceConfigs.map(service => {
                        return (
                            <Route exact path={`/services/${service.id}`}>
                                <Service
                                    service={service}
                                    trail={servicesTrail}
                                />

                                
                            </Route>

                        )
                    })}
                </div>
            </div>
            <StarterKitBottomNav />
        </div>
    )
}

export default Main;
