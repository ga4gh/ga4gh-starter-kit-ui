import React from 'react';
import { 
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid
} from '@material-ui/core';
import { 
    Link
} from 'react-router-dom';
import PageContainer from '../common/layout/PageContainer';
import DrsMain from '../apis/drs/drsobject/DrsObjectMain';
import BackButton from '../common/button/BackButton';
import BreadcrumbTrail from '../common/navigation/BreadcrumbTrail';
import servicesStyles from '../../styles/pages/servicesStyles';
import ga4ghApiTypes from '../../model/common/ga4ghApiTypes';
import hardCodedServiceConfigs from '../../temp/hardcodedServiceConfigs';

const Services = props => {

    const classes = servicesStyles();

    return (
        <PageContainer>
            <BreadcrumbTrail trail={props.trail} />
            <BackButton to='/home' />

            <div>
                <Grid container>
                    {hardCodedServiceConfigs.map(serviceConfig => {
                        return (
                            <Grid item>
                                <Card className={classes.cardRoot}>
                                    <CardContent>
                                        <Typography className={classes.cardTitle}>
                                            GA4GH Starter Kit Service
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {ga4ghApiTypes[serviceConfig.serviceType].name}
                                            {
                                                ga4ghApiTypes[serviceConfig.serviceType].abbreviation
                                                ? ` (${ga4ghApiTypes[serviceConfig.serviceType].abbreviation})`
                                                : null
                                            }
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {`ID: ${serviceConfig.id}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            component={Link}
                                            to={`/services/${serviceConfig.id}`}
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
        </PageContainer>
    )
}

export default Services;