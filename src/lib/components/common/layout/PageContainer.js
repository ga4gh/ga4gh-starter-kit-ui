import React from 'react';

import { Container } from '@material-ui/core';
import pageContainerStyles from '../../../styles/common/layout/pageContainerStyles';

const PageContainer = props => {
    const classes = pageContainerStyles();
    return (
        <Container maxWidth="lg" className={classes.root}>
            {props.children}
        </Container>
    )
}

export default PageContainer;
