import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import breadcrumbTrailStyles from '../../../styles/common/navigation/breadcrumbTrailStyles';

const BreadcrumbTrail = props => {
    const classes = breadcrumbTrailStyles();
    return (
        <Breadcrumbs className={classes.root}>
            {props.trail.map(trailItem => {
                return (
                    <Link color='inherit' to={trailItem.to}>{trailItem.label}</Link>
                )
            })}
        </Breadcrumbs>
    )
}

export default BreadcrumbTrail;
