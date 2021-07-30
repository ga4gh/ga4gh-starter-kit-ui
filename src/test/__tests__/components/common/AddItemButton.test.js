import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockAddObjectToList} from '../../../resources/MockFunctions';
import AddItemButton from '../../../../lib/components/common/AddItemButton';

afterEach(() => {
    mockAddObjectToList.mockClear();
})

test('<AddItemButton /> is displayed', () => {
    let {container} = render(
        <AddItemButton display={true} objectName={'test button'} disabled={false}
        handleClick={mockAddObjectToList} />
    );
    expect(container.firstChild).toMatchSnapshot();
    const addItemButton = screen.getByRole('button');
    expect(addItemButton).toBeInTheDocument();
    expect(screen.getByTitle('Add test button.')).toBeInTheDocument();
    expect(screen.getByTestId('add-item-button-tooltip')).toBeInTheDocument();
    userEvent.hover(addItemButton);
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);
    userEvent.unhover(addItemButton);
});

test('<AddItemButton /> is hidden', () => {
    let {container} = render(
        <AddItemButton display={false} objectName={'AddItemButton test'} disabled={false}
        handleClick={mockAddObjectToList} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(mockAddObjectToList.mock.calls.length).toBe(0);
});

test('<AddItemButton /> is disabled', () => {
    let {container} = render(
        <AddItemButton display={true} objectName={'AddItemButton test'} disabled={true}
        handleClick={mockAddObjectToList} />
    );
    expect(container.firstChild).toMatchSnapshot();
    const addItemButton = screen.getByRole('button');
    expect(addItemButton).toBeInTheDocument();
    expect(addItemButton).toBeDisabled();
    expect(mockAddObjectToList.mock.calls.length).toBe(0);
});