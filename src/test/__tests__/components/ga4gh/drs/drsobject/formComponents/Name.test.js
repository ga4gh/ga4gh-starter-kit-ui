import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../../../resources/MockFunctions';
import Name from '../../../../../../../lib/components/ga4gh/drs/drsobject/formComponents/Name';

afterEach(() => {
    mockUpdateScalar.mockClear();
})

test('SHOW <Name /> should handle populated field', () => {
    let {container} = render(
        <Name readOnly={true} name='test name' setName={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    let nameField = screen.getByRole('textbox');
    expect(nameField).toHaveValue('test name');

    // name field is read only and cannot be edited
    expect(nameField).toHaveAttribute('readonly');
    userEvent.type(nameField, 'new value');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW and EDIT <Name /> should handle empty field', () => {
    let {container} = render(
        <Name readOnly={false} name='' setName={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    let nameField = screen.getByRole('textbox');
    expect(nameField).toHaveValue('');
    userEvent.type(nameField, 'new value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});

test('NEW and EDIT <Name /> should handle populated field', () => {
    let {container} = render(
        <Name readOnly={false} name='test name' setName={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    let nameField = screen.getByRole('textbox');
    expect(nameField).toHaveValue('test name');
    userEvent.type(nameField, 'new value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});