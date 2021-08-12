import React from 'react';
import renderer from 'react-test-renderer';
import {
    render, 
    screen, 
    waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsObjectMain from '../../../../../../lib/components/ga4gh/drs/drsobject/DrsObjectMain';
import {
    mockDrsServiceInfo,
    mockDrsServiceConfig,
    mockDrsObjectMainTrail
} from '../../../../../resources/MockData';
import {MemoryRouter} from 'react-router-dom';

jest.setTimeout(60000);

test('DrsObjectMain SHOW form render', async () => {
    let {container} = render( 
        <MemoryRouter initialEntries={[`/services/org.ga4gh.starterkit.drs/drs/objects/1a570e4e-2489-4218-9333-f65549495872`]}>
            <DrsObjectMain
                trail={mockDrsObjectMainTrail}
                serviceInfo={mockDrsServiceInfo}
                serviceConfig={mockDrsServiceConfig}
            />
        </MemoryRouter>
    );
    await(waitFor(() => expect(screen.getAllByRole('textbox', {name: 'Id'})[0]).toHaveValue('1a570e4e-2489-4218-9333-f65549495872'), {timeout: 60000}));
    expect(screen.getByLabelText('back-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('view-button')).toBeInTheDocument();
    expect(screen.getByLabelText('edit-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('delete-button')).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();
});