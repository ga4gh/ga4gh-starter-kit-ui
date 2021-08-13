import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Link
} from 'react-router-dom'
import starterKitAppBarStyles from '../../../styles/common/navigation/starterKitAppBarStyles';

const StarterKitAppBar = () => {
    const classes = starterKitAppBarStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.heading}>
                    <Link to='/' className={classes.link}>
                        GA4GH Starter Kit
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.heading}>
                    <Link to='/home' className={classes.link}>
                        Home
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.heading}>
                    <Link to='/services' className={classes.link}>
                        Services
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default StarterKitAppBar;
