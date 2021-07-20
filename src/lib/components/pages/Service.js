import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Paper,
    Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PageContainer from '../common/layout/PageContainer';
import BreadcrumbTrail from '../common/navigation/BreadcrumbTrail';
import BackButton from '../common/button/BackButton';
import ServiceInfo from '../common/info/ServiceInfo';
import servicesStyles from '../../styles/pages/servicesStyles';
import ga4ghApiTypes from '../../model/common/ga4ghApiTypes';
import ApiCaller from '../apis/drs/utils/ApiCaller';

const Service = props => {
    const apiType = ga4ghApiTypes[props.service.serviceType];

    const trail = [...props.trail];
    trail.push({to: `/services/${props.service.id}`, label: props.service.id});

    const [serviceInfo, setServiceInfo] = useState(null);

    const callAndUpdateServiceInfo = () => {
        let url = `${props.service.publicUrl}${apiType.serviceInfoEndpoint}`;
        let requestConfig = {
            url: url,
            method: 'GET'
        }
        ApiCaller(requestConfig, setServiceInfo, console.log);
    }

    useEffect(() => {
        callAndUpdateServiceInfo();
    }, [])

    return (
        <PageContainer>
            <BreadcrumbTrail trail={trail} />
            <BackButton to='/services' />

            <Typography align='left' variant="h5" gutterBottom>
                GA4GH Starter Kit Service
                <br />
                service type: {apiType.name} {apiType.abbreviation ? `(${apiType.abbreviation})` : null}
                <br />
                service id: {props.service.id}
            </Typography>

            

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper>
                        <Typography align='center' variant='h6'>
                            Service Info
                        </Typography>
                        {serviceInfo
                            ? <ServiceInfo {...serviceInfo} />
                            : null
                        }

                    </Paper>                    
                </Grid>

                <Grid item xs={6}>
                    <Paper>
                        <Typography align='center' variant='h6'>
                            Models
                        </Typography>
                        {apiType.models.map(model => {
                            return (
                                <Button
                                    component={Link}
                                    to={`/services/${props.service.id}/${props.service.serviceType}/${model.path}`}
                                    variant='outlined'
                                    color='primary'>
                                    {model.label}
                                </Button>
                            )
                        })}
                    </Paper>
                    
                </Grid>
            </Grid>

        </PageContainer>
    )
}

export default Service;
