import React from 'react';
import {
    Button,
    Typography
} from '@material-ui/core';
import {
    Link
} from 'react-router-dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import backButtonStyles from '../../../styles/common/button/backButtonStyles';

const BackButton = props => {
    const classes = backButtonStyles();
    return (
        <Button
            className={classes.root}
            variant='text'
            component={Link}
            to={props.to}
            color='primary'
        >
            <ArrowBackIos />
            <Typography>back</Typography>
        </Button>
    )
}

export default BackButton;
