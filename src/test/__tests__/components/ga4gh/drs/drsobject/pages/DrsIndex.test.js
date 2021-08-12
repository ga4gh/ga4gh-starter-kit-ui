import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, getByRole, queryByRole, getByLabelText, waitFor, logRoles, getByText} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {
    mockDrsObjectsList
} from '../../../../../../resources/MockData';
import DrsIndex from '../../../../../lib/components/drs/pages/DrsIndex';
import { MemoryRouter } from 'react-router';

test('Render <DrsIndex /> component with data', () => {
    let drsObjectsList = mockDrsObjectsList
    let {container} = render(
        <MemoryRouter>
            <DrsIndex drsObjectsList={drsObjectsList} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Welcome to DRS Starter Kit');
    expect(screen.getByRole('heading', {name: 'DRS Object ID'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Name'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'View Details'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Edit'})).toBeInTheDocument();

    drsObjectsList.forEach((drsObject) => {
        let indexRow = screen.getByRole('row', {name: `${drsObject.id} ${drsObject.name} View Details`})
        expect(getByText(indexRow, `${drsObject.id}`)).toBeInTheDocument();
        expect(getByText(indexRow, `${drsObject.name}`)).toBeInTheDocument();
        expect(getByLabelText(indexRow, 'view-details-button')).toBeInTheDocument();
        expect(getByLabelText(indexRow, 'edit-button')).toBeInTheDocument();
    });
});

test('Render <DrsIndex /> component without data', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsIndex drsObjectsList={null} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Welcome to DRS Starter Kit');
    expect(screen.getByText('DRS Object ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.queryByLabelText('view-details-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('edit-button')).not.toBeInTheDocument();
});