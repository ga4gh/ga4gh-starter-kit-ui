import React, { useState, useEffect } from 'react';
import {
    Route
} from 'react-router-dom'
import About from './About';
import Home from './Home';
import {
    StarterKitAppBar,
    StarterKitBottomNav
 } from '../common/navigation';
import { makeStyles } from '@material-ui/core/styles';
import Services from './Services';
import Service from './Service';
import ga4ghApiTypes from '../../model/common/ga4ghApiTypes';
import hardCodedServiceConfigs from '../../temp/hardcodedServiceConfigs';
import syncApiCaller from '../../utils/syncApiCaller';

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

    const [servicesConfig, setServicesConfig] = useState(hardCodedServiceConfigs);
    const [validServices, setValidServices] = useState([]);
    const [invalidServices, setInvalidServices] = useState([]);

    useEffect(async () => {
        let transientValidServices = [];
        let transientInvalidServices = [];

        for (let i = 0; i < servicesConfig.length; i++) {
            let serviceConfig = servicesConfig[i];
            let apiType = ga4ghApiTypes[serviceConfig.serviceType];
            let url = `${serviceConfig.publicURL}${apiType.serviceInfoEndpoint}`;
            let requestConfig = {
                url: url,
                method: 'GET'
            }
            let [success, result] = await syncApiCaller(requestConfig);
            let service = {serviceConfig: serviceConfig};
            if (success) {
                service.serviceInfo = result.data;
                transientValidServices.push(service);
            } else {
                service.message = result.message;
                transientInvalidServices.push(service);
            }
        }
        setValidServices(transientValidServices);
        setInvalidServices(transientInvalidServices);
    }, [])

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
                        <Services
                            trail={servicesTrail}
                            validServices={validServices}
                            invalidServices={invalidServices}
                            url='/services'
                        />
                    </Route>

                    {/* for each valid service in the config: */}
                    {validServices.map(service => {
                        let config = service.serviceConfig;
                        let serviceInfo = service.serviceInfo;
                        let apiType = ga4ghApiTypes[config.serviceType];
                        return (
                            <div>
                                {/* render the service summary */}
                                <Route exact path={`/services/${serviceInfo.id}`}>
                                    <Service
                                        service={service}
                                        trail={servicesTrail}
                                    />
                                </Route>
                                {apiType.models.map(model => {
                                    let trail = [...servicesTrail];
                                    trail.push({to: `/services/${serviceInfo.id}`, label: serviceInfo.id})
                                    trail.push({to: `/services/${serviceInfo.id}/${config.serviceType}`, label: config.serviceType});
                                    trail.push({to: `/services/${serviceInfo.id}/${config.serviceType}/${model.path}`, label: model.path});
                                    return (
                                        <Route
                                            path={`/services/${serviceInfo.id}/${config.serviceType}/${model.path}`}
                                        >
                                            {model.componentFunction(config, serviceInfo, trail)};
                                        </Route>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <StarterKitBottomNav />
        </div>
    )
}

export default Main;
