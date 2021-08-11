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

test('DrsMain SHOW form render', async () => {
    let {container} = render( 
        <MemoryRouter initialEntries={[`/drs/${mockBlobDrsObject.id}`]}> 
            <DrsMain />
        </MemoryRouter>
    );
    await(waitFor(() => expect(screen.getByText('View DrsObject: 1a570e4e-2489-4218-9333-f65549495872')).toBeInTheDocument()));
    expect(screen.getByLabelText('drs-index-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('delete-drs-object-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('edit-drs-object-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('cancel-editing-drs-object-button')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();
    expect(screen.getAllByRole('textbox', {name: 'Id'})[0]).toHaveValue('1a570e4e-2489-4218-9333-f65549495872');
});