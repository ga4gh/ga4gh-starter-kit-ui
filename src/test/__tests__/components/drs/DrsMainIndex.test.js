import React from 'react';
import renderer from 'react-test-renderer';
import {
    render, 
    screen, 
    waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsMain from '../../../../lib/components/drs/DrsMain';
import {MemoryRouter} from 'react-router-dom';

jest.setTimeout(60000);

test('DrsMain default Index render', async () => {
    let {container} = render(
        <MemoryRouter initialEntries={["/drs"]}>
            <DrsMain />
        </MemoryRouter>
    );
    await(waitFor(() => expect(screen.getByText('Welcome to DRS Starter Kit')).toBeInTheDocument(), {timeout: 20000}));
    expect(container.firstChild).toMatchSnapshot();

    // verify that correct text and buttons are displayed
    expect(screen.getByRole('button', {name: 'New DRS Object'})).toBeInTheDocument(); 
    expect(screen.queryByLabelText('drs-index-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('delete-drs-object-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('edit-drs-object-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('cancel-editing-drs-object-button')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();
    screen.getAllByRole('row').forEach(row => {
        expect(row).toBeInTheDocument();    
    });      
});