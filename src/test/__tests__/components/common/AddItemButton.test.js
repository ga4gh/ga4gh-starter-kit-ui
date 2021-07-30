import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AddItemButton from '../../../../lib/components/common/AddItemButton';

const mockHandleClick = jest.fn();

test('<AddItemButton /> is displayed', () => {
    let {container} = render(
        <AddItemButton display={true} objectName={'test button'} disabled={false}
        handleClick={mockHandleClick} />
    );
    expect(container.firstChild).toMatchSnapshot();
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    expect(screen.getByTitle('Add test button.')).toBeInTheDocument();
    userEvent.hover(addItemButton);
    //expect(screen.getByText('Add test button.')).toBeInTheDocument();
    userEvent.click(addItemButton);
    userEvent.unhover(addItemButton);
    expect(screen.queryByText('Add Item Button')).not.toBeInTheDocument();
    expect(mockHandleClick.mock.calls.length).toBe(1);
});

test('<AddItemButton /> is hidden', () => {
    let {container} = render(
        <AddItemButton display={false} objectName={'AddItemButton test'} disabled={false}
        handleClick={mockHandleClick} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(mockHandleClick.mock.calls.length).toBe(1);
});

test('<AddItemButton /> is disabled', () => {
    let {container} = render(
        <AddItemButton display={true} objectName={'AddItemButton test'} disabled={true}
        handleClick={mockHandleClick} />
    );
    expect(container.firstChild).toMatchSnapshot();
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    expect(mockHandleClick.mock.calls.length).toBe(1);
});