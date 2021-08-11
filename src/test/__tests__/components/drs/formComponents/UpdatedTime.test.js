import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import UpdatedTime from '../../../../../lib/components/drs/formComponents/UpdatedTime';

afterEach(() => {
    mockUpdateScalar.mockClear();
});

test('SHOW <UpdatedTime /> ', () => {
    let {container} = render(<UpdatedTime readOnly={true} updated_time='2021-07-22T13:00:00Z' setUpdatedTime={mockUpdateScalar} />);
    //expect(container.firstChild).toMatchSnapshot();
    let dateTimeField = screen.getByRole('textbox');
    expect(dateTimeField).toBeInTheDocument();
    expect(screen.getByLabelText('Updated Time')).toBeInTheDocument();
    expect(screen.getByText('Timestamp of when the DRS Object was most recently updated in ISO 8601 format.')).toBeInTheDocument();
    expect(dateTimeField).toHaveValue('2021-07-22 13:00:00 GMT+00:00');
    expect(dateTimeField).toHaveAttribute('readonly');
    userEvent.click(dateTimeField);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('NEW and EDIT <UpdatedTime />', () => {
    let {container} = render(<UpdatedTime readOnly={false} updated_time='2021-07-22T13:00:00Z' setUpdatedTime={mockUpdateScalar} />);
    //expect(container.firstChild).toMatchSnapshot();
    let dateTimeField = screen.getByRole('textbox');
    expect(dateTimeField).toBeInTheDocument();
    expect(screen.getByLabelText('Updated Time')).toBeInTheDocument();
    expect(screen.getByText('Timestamp of when the DRS Object was most recently updated in ISO 8601 format.')).toBeInTheDocument();
    expect(dateTimeField).toHaveValue('2021-07-22 13:00:00 GMT+00:00');
    expect(dateTimeField).toHaveAttribute('readonly');
    userEvent.click(dateTimeField);
    expect(screen.getAllByRole('dialog')[0]).toBeInTheDocument();
});