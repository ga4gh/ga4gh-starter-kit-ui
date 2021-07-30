import React from 'react';
import { Button } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import viewButtonStyles from '../../../styles/common/navigation/viewButtonStyles';

const ViewButton = props => {
    const classes = viewButtonStyles();
    return (
        <Button
            className={classes.root}
            variant="outlined"
            color="secondary"
            component={Link}
            to={props.to}
        >
            View
            <Visibility />
        </Button>

    )
}

export default ViewButton;
