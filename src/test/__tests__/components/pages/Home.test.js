import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Home from '../../../../lib/components/pages/Home';
import { mockHomepageTrail } from '../../../resources/MockData';

test('the correct Home page elements are displayed', () => {
    let testLocation;
    let {container} = render(
        <MemoryRouter>
            <Home trail={mockHomepageTrail} />
            <Route 
                path="*"
                render={({ location }) => {
                testLocation = location;
                return null;
                }}
            />
        </MemoryRouter>
    );
    // TODO re-enable assertions
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Welcome to the GA4GH Starter Kit');
    // expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Get Started');
})