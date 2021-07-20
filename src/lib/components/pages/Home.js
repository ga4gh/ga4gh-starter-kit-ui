import '@fontsource/roboto';
import React from 'react';
import {
  Link
} from "react-router-dom";
import { 
  Container, 
  Button, 
  Typography,
  Breadcrumbs
 } from '@material-ui/core';
 import { scrollToTop } from '../../functions/common';
import PageContainer from '../common/layout/PageContainer';
import BackButton from '../common/button/BackButton';
import BreadcrumbTrail from '../common/navigation/BreadcrumbTrail';

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
