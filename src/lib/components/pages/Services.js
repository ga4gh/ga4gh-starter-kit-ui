import React from 'react';
import { 
    Breadcrumbs,
    Typography,
    Button
} from '@material-ui/core';
import { 
    Link,
    Route
} from 'react-router-dom';
import PageContainer from '../common/layout/PageContainer';
import DrsMain from '../drs/DrsMain';

const Services = props => {
    const hardCodedServiceConfigs = [
        {
            id: 'org.ga4gh.localdrs',
            serviceType: 'drs',
            publicUrl: 'http://localhost:4500',
            adminUrl: 'http://localhost:4501'
        }
    ]

    const renderServiceByType = serviceConfig => {
        switch (serviceConfig.serviceType) {
            case 'drs':
                return (
                    <DrsMain serviceConfig={serviceConfig} />
                )
                break;
        }
    }

    return (
        <PageContainer>
            <Breadcrumbs>
                <Link color="inherit" to="/home">starter-kit</Link>
                <Link to="/services">services</Link>
            </Breadcrumbs>

            {hardCodedServiceConfigs.map(serviceConfig => {
                return (
                    <div>
                        <Button
                            variant='contained'
                            component={Link}
                            to={`${props.url}/${serviceConfig.id}`}
                        >
                            <Typography variant='button'>
                                {serviceConfig.id}
                            </Typography>
                        </Button>
                    </div>
                )
            })}
        </PageContainer>
    )
}

export default Services;