import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import CreatedTime from '../../../../../lib/components/drs/formComponents/CreatedTime';

afterEach(() => {
    mockUpdateScalar.mockClear();
});

test('SHOW <CreatedTime /> ', () => {
    let {container} = render(<CreatedTime readOnly={true} created_time='2021-07-22T13:00:00Z' setCreatedTime={mockUpdateScalar} />);
    //expect(container.firstChild).toMatchSnapshot();
    let dateTimeField = screen.getByRole('textbox');
    expect(dateTimeField).toBeInTheDocument();
    expect(screen.getByLabelText('Created Time')).toBeInTheDocument();
    expect(screen.getByText('Timestamp of DRS Object creation in ISO 8601 format.')).toBeInTheDocument();
    expect(dateTimeField).toHaveValue('2021-07-22 13:00:00 GMT+00:00');
    expect(dateTimeField).toHaveAttribute('readonly');
    userEvent.click(dateTimeField);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('NEW and EDIT <CreatedTime />', () => {
    let {container} = render (<CreatedTime readOnly={false} created_time='2021-07-22T13:00:00Z' setCreatedTime={mockUpdateScalar} />);
    //expect(container.firstChild).toMatchSnapshot();
    let dateTimeField = screen.getByRole('textbox');
    expect(dateTimeField).toBeInTheDocument();
    expect(screen.getByLabelText('Created Time')).toBeInTheDocument();
    expect(screen.getByText('Timestamp of DRS Object creation in ISO 8601 format.')).toBeInTheDocument();
    expect(dateTimeField).toHaveValue('2021-07-22 13:00:00 GMT+00:00');
    expect(dateTimeField).toHaveAttribute('readonly');
    userEvent.click(dateTimeField);
    expect(screen.getAllByRole('dialog')[0]).toBeInTheDocument();
});