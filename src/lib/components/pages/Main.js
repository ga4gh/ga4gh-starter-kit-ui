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
import ApiCaller from '../ga4gh/drs/utils/ApiCaller';

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
    const [serviceInfoList, setServiceInfoList] = useState({});

    const fetchAllServiceInfo = async () => {
        
    }

    const setServiceInfo = (index, serviceInfo) => {
        console.log('****');
        console.log(index);
        console.log(serviceInfo);
        console.log('****');
        let transientServiceInfoList = {...serviceInfoList};
        transientServiceInfoList[index] = serviceInfo;
        console.log('about to make permanent');
        console.log(transientServiceInfoList);
        setServiceInfoList(transientServiceInfoList);
    }

    useEffect(() => {
        servicesConfig.forEach((serviceConfig, index) => {
            let apiType = ga4ghApiTypes[serviceConfig.serviceType];
            let url = `${serviceConfig.publicUrl}${apiType.serviceInfoEndpoint}`;
            let requestConfig = {
                url: url,
                method: 'GET'
            }
            ApiCaller(
                requestConfig,
                responseData => setServiceInfo(index, responseData),
                error => setServiceInfo(index, 'noway!')
            )
        });
        
        // console.log('running effect to get service infos...');
        // let transientServiceInfoList = [];
        // console.log(servicesConfig);
        // console.log(transientServiceInfoList);
        // transientServiceInfoList[3] = '12345';
        // console.log(transientServiceInfoList);
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
                            serviceInfoList={serviceInfoList}
                            url='/services'
                        />
                    </Route>

                    {/* for each service in the config: */}
                    {servicesConfig.map(service => {
                        let apiType = ga4ghApiTypes[service.serviceType];
                        return (
                            <div>
                                {/* render the service summary */}
                                <Route exact path={`/services/${service.id}`}>
                                    <Service
                                        service={service}
                                        trail={servicesTrail}
                                    />
                                </Route>
                                {apiType.models.map(model => {
                                    let trail = [...servicesTrail];
                                    trail.push({to: `/services/${service.id}`, label: service.id})
                                    trail.push({to: `/services/${service.id}/${service.serviceType}`, label: service.serviceType});
                                    trail.push({to: `/services/${service.id}/${service.serviceType}/${model.path}`, label: model.path});
                                    return (
                                        <Route
                                            path={`/services/${service.id}/${service.serviceType}/${model.path}`}
                                        >
                                            {model.componentFunction(service, trail)};
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
