import React from 'react';
import { Button } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../functions/common';
import viewButtonStyles from '../../../styles/common/navigation/viewButtonStyles';

const ViewButton = props => {
    const classes = viewButtonStyles();
    return (
        <Button
            className={classes.root}
            variant="outlined"
            color="secondary"
            onClick={scrollToTop}
            disabled={props.disabled}
            component={Link}
            to={props.to}
            aria-label="view-button"
        >
            View
            <Visibility />
        </Button>

    )
}

export default ViewButton;
