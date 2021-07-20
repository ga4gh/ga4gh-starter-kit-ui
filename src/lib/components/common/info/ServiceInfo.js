import React from 'react';
import {
    Typography
} from '@material-ui/core';

const ServiceInfo = props => {
    return (
        <div>
            <Typography>{props.id}</Typography>
            <Typography>{props.name}</Typography>
        </div>
    )
}

export default ServiceInfo;