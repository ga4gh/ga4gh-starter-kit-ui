import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import Name from '../../../../../lib/components/drs/formComponents/Name';

test('SHOW <Name /> should handle populated field', () => {
    let {container} = render(
        <Name readOnly={true} name='snapshot test' setName={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('snapshot test');
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
    userEvent.type(nameField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});

test('NEW and EDIT <Name /> should handle populated field', () => {
    let {container} = render(
        <Name readOnly={false} name='snapshot test' setName={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    let nameField = screen.getByRole('textbox');
    expect(nameField).toHaveValue('snapshot test');
    userEvent.type(nameField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});