import React, { useState } from 'react';
import {
    BottomNavigation,
    BottomNavigationAction
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';


const StarterKitBottomNav = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            position: 'fixed',
            bottom: 0
        }
    }))
    const classes = useStyles();
    const [value, setValue] = useState('home')

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Home" value="home" icon={<Home />} />
        </BottomNavigation>
    )
}

export default StarterKitBottomNav;