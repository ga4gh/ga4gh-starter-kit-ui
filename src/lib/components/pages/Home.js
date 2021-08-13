import React from 'react';
import {
  Link
} from "react-router-dom";
import { 
  Button, 
  Typography
 } from '@material-ui/core';
import { PageContainer } from '../common/layout';
import { BreadcrumbTrail }  from '../common/navigation';

const Home = props => {

    return(
        <PageContainer>
            <BreadcrumbTrail trail={props.trail} />

            <Typography variant="h1" gutterBottom>Welcome to the GA4GH Starter Kit</Typography>
            <Button
                variant="outlined"
                color="secondary"
            >
                <Link to='/services'>
                    <Typography variant="button">Get Started</Typography>
                </Link>
            </Button>
        </PageContainer>
    );
}

export default Home;
