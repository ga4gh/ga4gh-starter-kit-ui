import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, getByRole, queryByRole, getByLabelText, waitFor, logRoles, getByText} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {
    mockDrsObjectsList,
    mockDrsObjectMainTrail
} from '../../../../../../resources/MockData';
import DrsObjectIndex from '../../../../../../../lib/components/ga4gh/drs/drsobject/pages/DrsObjectIndex';
import { MemoryRouter } from 'react-router';

test('Render <DrsObjectIndex /> component with data', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectIndex
                trail={mockDrsObjectMainTrail}
                drsObjectsList={mockDrsObjectsList}
            />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('DRS Object ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();

    mockDrsObjectsList.forEach((drsObject) => {
        let indexRow = screen.getByRole('row', {name: drsObject.id})
        expect(getByText(indexRow, `${drsObject.id}`)).toBeInTheDocument();
        expect(getByText(indexRow, `${drsObject.name}`)).toBeInTheDocument();
        expect(getByLabelText(indexRow, 'view-button')).toBeInTheDocument();
        expect(getByLabelText(indexRow, 'edit-button')).toBeInTheDocument();
    });
});

test('Render <DrsObjectIndex /> component without data', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectIndex
                trail={mockDrsObjectMainTrail}
                drsObjectsList={[]}
            />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('DRS Object ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.queryByLabelText('view-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('edit-button')).not.toBeInTheDocument();
});