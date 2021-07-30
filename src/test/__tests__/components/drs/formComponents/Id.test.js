import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import Id from '../../../../../lib/components/drs/formComponents/Id';

afterEach(() => {
    mockUpdateScalar.mockClear();
})

test('SHOW and EDIT <Id /> should handle populated id field', () => {
    let {container} = render(<Id readOnly={true} id='1234567890' setId={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Id')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('1234567890');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('NEW <Id /> should handle empty id field', () => {
    let {container} = render(<Id readOnly={false} id='' setId={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Id')).toBeInTheDocument();
    let idField = screen.getByRole('textbox');
    expect(idField).toHaveValue('');
    let generateIdButton = screen.getByRole('button');
    expect(generateIdButton).toBeInTheDocument();
    userEvent.click(generateIdButton);
    expect(mockUpdateScalar.mock.calls.length).toBe(1);
    mockUpdateScalar.mockClear();
    userEvent.type(idField, 'abc123');
    expect(mockUpdateScalar).toHaveBeenCalled();
});

test('NEW <Id /> should handle populated id field', () => {
    let {container} = render(<Id readOnly={false} id='1234567890' setId={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Id')).toBeInTheDocument();
    let idField = screen.getByRole('textbox');
    expect(idField).toHaveValue('1234567890');
    let generateIdButton = screen.getByRole('button');
    expect(generateIdButton).toBeInTheDocument();
    userEvent.click(generateIdButton);
    expect(mockUpdateScalar.mock.calls.length).toBe(1);
    mockUpdateScalar.mockClear();
    userEvent.type(idField, 'abc123');
    expect(mockUpdateScalar).toHaveBeenCalled();
});