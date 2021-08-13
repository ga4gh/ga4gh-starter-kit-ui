import React from 'react';
import 'babel-polyfill';
import {MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom'
import App from '../../App';
import userEvent from '@testing-library/user-event';

test('Default route is rendered correctly', () => {
    const history = createMemoryHistory();
    let {container} = render(
        <Router history={history}>
            <App />
        </Router>
    );
    // TODO re-enable tests later 
    // expect(container.firstChild).toMatchSnapshot();
    // expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Welcome to the GA4GH Starter Kit');
    // userEvent.click(screen.getByRole('button'));
    // expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Welcome to DRS Starter Kit');
});