import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import Size from '../../../../../lib/components/drs/formComponents/Size';

afterEach(() => {
    mockUpdateScalar.mockClear();
})

test('SHOW <Size /> should handle populated field', () => {
    let {container} = render(<Size readOnly={true} size={1000} setSize={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    let sizeField = screen.getByLabelText('Size');
    expect(sizeField).toBeInTheDocument();
    expect(sizeField).toHaveValue(1000);

    // size field is read only and cannot be edited
    expect(sizeField).toHaveAttribute('readonly');
    userEvent.type(sizeField, 'test value 12345');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW and EDIT <Size /> should handle empty field', () => {
    let {container} = render(<Size readOnly={false} size='' setSize={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    let sizeField = screen.getByLabelText('Size');
    expect(sizeField).toBeInTheDocument();
    expect(sizeField).toHaveValue(null);

    //size field does not accept text entry
    userEvent.type(sizeField, 'abc');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);

    //size field does accept numeric entry
    userEvent.type(sizeField, '12345');
    expect(mockUpdateScalar).toHaveBeenCalled();
});

test('NEW and EDIT <Size /> should handle populated field', () => {
    let {container} = render(<Size readOnly={false} size={1000} setSize={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    let sizeField = screen.getByLabelText('Size');
    expect(sizeField).toBeInTheDocument();
    expect(sizeField).toHaveValue(1000);

    //size field does not accept text entry
    userEvent.type(sizeField, 'abc');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);

    //size field does accept numeric entry
    userEvent.type(sizeField, '12345');
    expect(mockUpdateScalar).toHaveBeenCalled();
});