import React, { useState } from 'react';
import {
    BottomNavigation,
    BottomNavigationAction
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
    
} from 'reactstrap';

const StarterKitBottomNav = () => {
    const useStyles = makeStyles((theme) => ({
        footer: {
            // width: '100%',
            // position: 'absolute',
            // position: 'sticky',
            // left: 0,
            // bottom: 0,
            // right: 0
            width: '100%',
            // position: 'absolute',
            height: '50px',
            marginTop: '-50px'
        }
    }))
    const classes = useStyles();
    const [value, setValue] = useState('home')

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    return (
        <BottomNavigation 
            value={value}
            onChange={handleChange}
            className={classes.footer}
        >
            <BottomNavigationAction
                label="Home"
                value="home"
                icon={<Home />}
             />
        </BottomNavigation>
    )
}

export default StarterKitBottomNav;