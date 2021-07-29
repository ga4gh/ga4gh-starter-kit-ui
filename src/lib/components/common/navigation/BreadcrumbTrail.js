import React from 'react';
import {
    Breadcrumbs,
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import breadcrumbTrailStyles from '../../../styles/common/navigation/breadcrumbTrailStyles';

const BreadcrumbTrail = props => {
    const classes = breadcrumbTrailStyles();
    return (
        <Breadcrumbs className={classes.root}>
            {props.trail.map(trailItem => {
                return (
                    <span>
                        {trailItem.noLink
                        ?
                            <Typography>
                                {trailItem.label}
                            </Typography>
                        :
                            <Link className={classes.link}
                                color='inherit'
                                to={trailItem.to}>{trailItem.label}
                            </Link>
                        }
                    </span>
                )
            })}
        </Breadcrumbs>
    )
}

export default BreadcrumbTrail;
