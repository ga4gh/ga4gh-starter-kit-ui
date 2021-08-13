import React from 'react';
import { 
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    Tooltip
} from '@material-ui/core';
import {
    Help
} from '@material-ui/icons';
import { 
    Link
} from 'react-router-dom';
import { PageContainer } from '../common/layout';
import {
    BackButton,
    BreadcrumbTrail
 } from '../common/navigation';
import servicesStyles from '../../styles/pages/servicesStyles';
import ga4ghApiTypes from '../../model/common/ga4ghApiTypes';

const Services = props => {

    const classes = servicesStyles();

    return (
        <PageContainer>
            <BreadcrumbTrail trail={props.trail} />
            <BackButton to='/home' />

            <Typography align='left' variant="h5" gutterBottom>
                Services
            </Typography>

            <Typography>
                Registered Services: {props.validServices.length + props.invalidServices.length}
                <br />
                Valid Services: {props.validServices.length}
                <br />
                Invalid Services: {props.invalidServices.length}
            </Typography>

            {props.validServices.length > 0
            ?
                <div>
                    <Typography align='left' variant="h6" gutterBottom>
                        Valid Services
                        <Tooltip 
                            title="Starter kit services described in the config that appear to be working correctly."
                        >
                            <Help color="primary" fontSize="small" />
                        </Tooltip>
                    </Typography>
                    <Grid container>
                        {props.validServices.map(e => {
                            const serviceInfo = e.serviceInfo
                            return (
                                <Grid item>
                                    <Card className={classes.cardRoot}>
                                        <CardContent>
                                            <Typography className={classes.cardTitle}>
                                                GA4GH Starter Kit Service
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {ga4ghApiTypes[serviceInfo.type.artifact].name}
                                                {
                                                    ga4ghApiTypes[serviceInfo.type.artifact].abbreviation
                                                    ? ` (${ga4ghApiTypes[serviceInfo.type.artifact].abbreviation})`
                                                    : null
                                                }
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {`ID: ${serviceInfo.id}`}
                                                <br />
                                                {`Name: ${serviceInfo.name}`}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                component={Link}
                                                to={`/services/${serviceInfo.id}`}
                                            >
                                                View
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            : null
            }

            {props.invalidServices.length > 0
            ?
                <div>
                    <Typography align='left' variant="h6" gutterBottom>
                        Invalid Services
                        <Tooltip 
                            title="Entries in the config describing Starter Kit services that cannot be reached. They may be unreachable at the provided URL(s), or the service type is incorrect."
                        >
                            <Help color="primary" fontSize="small" />
                        </Tooltip>
                    </Typography>
                    <Grid container>
                        {props.invalidServices.map(e => {
                            const config = e.serviceConfig
                            const message = e.message
                            return (
                                <Grid item>
                                    <Card className={classes.cardRoot}>
                                        <CardContent>
                                            <Typography className={classes.cardTitle}>
                                                Invalid Service
                                                <br />
                                                {`serviceType: ${config.serviceType}`}
                                                <br />
                                                {`publicURL: ${config.publicURL}`}
                                                <br />
                                                {`adminURL: ${config.adminURL}`}
                                                <br />
                                                {`Error: ${message}`}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            : null
            }
        </PageContainer>
    )
}

export default Services;