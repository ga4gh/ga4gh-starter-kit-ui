import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Home from '../../../lib/components/pages/Home';

test('the correct Home page elements are displayed', () => {
    let testLocation;
    let {container} = render(
        <MemoryRouter>
            <Home/>
            <Route 
                path="*"
                render={({ location }) => {
                testLocation = location;
                return null;
                }}
            />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Welcome to the GA4GH Starter Kit');
    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Get Started');
    expect(screen.getByText('Click the buttons below to start using one of the GA4GH Starter Kits')).toBeInTheDocument();
    const drsStarterKitButton = screen.getByRole('button');
    expect(drsStarterKitButton).toHaveTextContent('DRS Starter Kit');
    userEvent.click(drsStarterKitButton);
    expect(testLocation.pathname).toBe('/drs');
})