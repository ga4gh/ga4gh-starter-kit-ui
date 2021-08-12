import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../../../resources/MockFunctions';
import Id from '../../../../../../../lib/components/ga4gh/drs/drsobject/formComponents/Id';

afterEach(() => {
    mockUpdateScalar.mockClear();
})

test('SHOW and EDIT <Id /> should handle populated id field', () => {
    let {container} = render(<Id readOnly={true} id='1234567890' setId={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Id')).toBeInTheDocument();
    let idField = screen.getByRole('textbox');
    expect(idField).toHaveValue('1234567890');
    // id field is not editable and "Generate UUID" button is not displayed
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(idField).toHaveAttribute('readOnly');
    userEvent.type(idField, 'new test value');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW <Id /> should handle empty id field', () => {
    let {container} = render(<Id readOnly={false} id='' setId={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Id')).toBeInTheDocument();
    let idField = screen.getByRole('textbox');
    expect(idField).toHaveValue('');
    // id field is editable and can be populated using "Generate UUID" button
    userEvent.type(idField, 'abc123');
    expect(mockUpdateScalar).toHaveBeenCalled();
    mockUpdateScalar.mockClear();
    let generateIdButton = screen.getByRole('button');
    expect(generateIdButton).toBeInTheDocument();
    userEvent.click(generateIdButton);
    expect(mockUpdateScalar.mock.calls.length).toBe(1);
});

test('NEW <Id /> should handle populated id field', () => {
    let {container} = render(<Id readOnly={false} id='1234567890' setId={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Id')).toBeInTheDocument();
    let idField = screen.getByRole('textbox');
    expect(idField).toHaveValue('1234567890');
    // id field is editable and can be populated using "Generate UUID" button
    userEvent.type(idField, 'abc123');
    expect(mockUpdateScalar).toHaveBeenCalled();
    mockUpdateScalar.mockClear();
    let generateIdButton = screen.getByRole('button');
    expect(generateIdButton).toBeInTheDocument();
    userEvent.click(generateIdButton);
    expect(mockUpdateScalar.mock.calls.length).toBe(1);
});