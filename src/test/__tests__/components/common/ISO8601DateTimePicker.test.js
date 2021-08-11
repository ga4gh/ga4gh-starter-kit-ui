import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../resources/MockFunctions';
import ISO8601DateTimePicker from '../../../../lib/components/common/ISO8601DateTimePicker';

let dateTimePickerProps = null;

beforeEach(() => {
    dateTimePickerProps = {
        id: 'test_date_time_picker',
        label: 'Test Date Time Picker',
        name: 'test_date_time_picker',
        helperText: 'This is a description of a date time picker.',
        setFunction: mockUpdateScalar
    }
});

afterEach(() => {
    mockUpdateScalar.mockClear();
});

test('SHOW <ISO8601DateTimePicker /> should handle any date and time in EDT timezone', () => {
    let {container} = render(
        <ISO8601DateTimePicker readOnly={true} value='2021-07-22T13:00:00Z' {...dateTimePickerProps} />
    );
    let dateTimeField = screen.getByRole('textbox');
    expect(dateTimeField).toBeInTheDocument();
    expect(screen.getByLabelText(dateTimePickerProps.label)).toBeInTheDocument();
    expect(screen.getByText(dateTimePickerProps.helperText)).toBeInTheDocument();
    expect(dateTimeField).toHaveValue('2021-07-22 13:00:00 GMT+00:00');
    expect(dateTimeField).toHaveAttribute('readonly');
    userEvent.click(dateTimeField);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('NEW and EDIT <ISO8601DateTimePicker /> should handle any date and time in EDT timezone', () => {
    let {container} = render(
        <ISO8601DateTimePicker readOnly={false} value='2021-07-22T13:00:00Z' {...dateTimePickerProps} />
    );
    let dateTimeField = screen.getByRole('textbox');
    expect(dateTimeField).toBeInTheDocument();
    expect(screen.getByLabelText(dateTimePickerProps.label)).toBeInTheDocument();
    expect(screen.getByText(dateTimePickerProps.helperText)).toBeInTheDocument();
    expect(dateTimeField).toHaveValue('2021-07-22 13:00:00 GMT+00:00');
    expect(dateTimeField).toHaveAttribute('readonly');
    userEvent.click(dateTimeField);
    let dateTimePicker = screen.getAllByRole('dialog')[0];
    expect(dateTimePicker).toBeInTheDocument();
    expect(dateTimePicker).toBeVisible();

    // date selection via date time picker
    userEvent.click(screen.getByRole('button', {name: '17'}));
    userEvent.click(screen.getByText('OK'));
    expect(mockUpdateScalar).toHaveBeenCalledWith('2021-07-17T13:00:00Z');
    mockUpdateScalar.mockClear();

    //verify that value cannot be updated by typing
    userEvent.type(dateTimeField, 'test date time value');
    expect(mockUpdateScalar).not.toHaveBeenCalled();
});