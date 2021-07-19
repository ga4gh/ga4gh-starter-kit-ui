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

const Home = () => {
    return(
        <PageContainer>
            <Breadcrumbs>
                <Link color="inherit" to="/home">starter-kit</Link>
            </Breadcrumbs>

            <Typography variant="h1" gutterBottom>Welcome to the GA4GH Starter Kit</Typography>
            <Typography variant="h3" gutterBottom>Get Started</Typography>
            <Typography variant="body1" gutterBottom>Click the buttons below to start using one of the GA4GH Starter Kits</Typography>
            <div>
                <nav>
                    <Button variant="contained" color="default" size="large">
                        <Link to='/services'>
                            <Typography variant="button">Services</Typography>
                        </Link>
                    </Button>
                </nav>
            </div>
        </PageContainer>
    );
}

export default Home;
