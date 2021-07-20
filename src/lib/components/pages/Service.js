import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Paper
} from '@material-ui/core';
import PageContainer from '../common/layout/PageContainer';
import BreadcrumbTrail from '../common/navigation/BreadcrumbTrail';
import BackButton from '../common/button/BackButton';
import servicesStyles from '../../styles/pages/servicesStyles';
import ga4ghApiTypes from '../../model/common/ga4ghApiTypes';
import ApiCaller from '../drs/utils/ApiCaller';

const Service = props => {
    const apiType = ga4ghApiTypes[props.service.serviceType];

    const trail = [...props.trail];
    trail.push({to: `/services/${props.service.id}`, label: props.service.id});

    const [serviceInfo, setServiceInfo] = useState(null);

    useEffect(() => {
        console.log('fetching service info');
        console.log(`${props.service.publicUrl}${apiType.serviceInfoEndpoint}`);
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

                    </Paper>
                    
                </Grid>

                <Grid item xs={6}>
                    <Paper>
                        <Typography align='center' variant='h6'>
                            Models
                        </Typography>
                    </Paper>
                    
                </Grid>
            </Grid>

        </PageContainer>
    )
}

export default Service;
