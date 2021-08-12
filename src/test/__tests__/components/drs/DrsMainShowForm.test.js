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
import {
    mockBlobDrsObject
} from '../../../resources/MockData';
import {MemoryRouter} from 'react-router-dom';

jest.setTimeout(60000);

test('DrsMain SHOW form render', async () => {
    let {container} = render( 
        <MemoryRouter initialEntries={[`/drs/1a570e4e-2489-4218-9333-f65549495872`]}> 
            <DrsMain />
        </MemoryRouter>
    );
    //await(waitFor(() => expect(screen.getByText('View DrsObject: 1a570e4e-2489-4218-9333-f65549495872')).toBeInTheDocument()), {timeout: 20000});
    await(waitFor(() => expect(screen.getAllByRole('textbox', {name: 'Id'})[0]).toHaveValue('1a570e4e-2489-4218-9333-f65549495872'), {timeout: 60000}));
    expect(screen.getByLabelText('drs-index-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('delete-drs-object-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('edit-drs-object-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('cancel-editing-drs-object-button')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();
    //expect(screen.getAllByRole('textbox', {name: 'Id'})[0]).toHaveValue('1a570e4e-2489-4218-9333-f65549495872');
});