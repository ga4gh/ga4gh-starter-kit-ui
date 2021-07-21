import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Paper,
    Button,
    Table,
    TableBody,
    Tooltip,
    TableRow,
    TableCell
} from '@material-ui/core';
import {
    Help
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PageContainer from '../common/layout/PageContainer';
import {
    BackButton,
    BreadcrumbTrail
 } from '../common/navigation';
import ServiceInfo from '../common/info/ServiceInfo';
import serviceStyles from '../../styles/pages/serviceStyles';
import ga4ghApiTypes from '../../model/common/ga4ghApiTypes';
import ApiCaller from '../ga4gh/drs/utils/ApiCaller';

const Service = props => {
    const classes = serviceStyles();

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
                Service Details
            </Typography>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography
                            className={classes.paperTitle}
                            align='center'
                            variant='h6'
                        >
                            Service Info
                            {`   `}
                            <Tooltip 
                                title="Information returned from the standardized '/service-info' endpoint implemented in all GA4GH APIs. Displays basic information about the web service."
                            >
                                <Help color="primary" fontSize="small" />
                            </Tooltip>
                        </Typography>
                        {serviceInfo
                            ? <ServiceInfo apiType={apiType} {...serviceInfo} />
                            : null
                        }

                    </Paper>                    
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography
                            className={classes.paperTitle}
                            align='center'
                            variant='h6'
                        >
                            Models
                            {`   `}
                            <Tooltip
                                title="GA4GH entities that can be viewed, created, edited, and deleted for this web service. Available models are based on the web service's API type"
                            >
                                <Help color='primary' fontSize='small' />
                            </Tooltip>
                        </Typography>
                        <Table size="small">
                            <TableBody>
                                {apiType.models.map(model => {
                                    return (
                                        <TableRow>
                                            <TableCell align="center">
                                                <Button
                                                    component={Link}
                                                    to={`/services/${props.service.id}/${props.service.serviceType}/${model.path}`}
                                                    variant='outlined'
                                                    color='primary'>
                                                    {model.label}
                                                </Button>
                                                {`   `}
                                                <Tooltip title={model.description}>
                                                    <Help color='primary' fontSize='small' />
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>

        </PageContainer>
    )
}

export default Service;
