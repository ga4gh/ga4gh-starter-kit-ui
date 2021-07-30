import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import Version from '../../../../../lib/components/drs/formComponents/Version';

test('SHOW <Version /> should handle populated field', () => {
    let {container} = render(
        <Version readOnly={true} version='1.0.0' setVersion={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Version')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('1.0.0');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW and EDIT <Version /> should handle empty field', () => {
    let {container} = render(
        <Version readOnly={false} version='' setVersion={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Version')).toBeInTheDocument();
    let versionField = screen.getByRole('textbox');
    expect(versionField).toHaveValue('');
    userEvent.type(versionField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});

test('NEW and EDIT <Version /> should handle populated field', () => {
    let {container} = render(
        <Version readOnly={false} version='1.0.0' setVersion={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Version')).toBeInTheDocument();
    let versionField = screen.getByRole('textbox');
    expect(versionField).toHaveValue('1.0.0');
    userEvent.type(versionField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});