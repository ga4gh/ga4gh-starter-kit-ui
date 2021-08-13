import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockRemoveListItem} from '../../../../resources/MockFunctions';
import RemoveItemButton from '../../../../../lib/components/common/form/RemoveItemButton';

afterEach(() => {
    mockRemoveListItem.mockClear();
})

test('<RemoveItemButton /> is displayed', () => {
    let {container} = render(
        <RemoveItemButton display={true} objectName={'test button'} 
        handleClick={mockRemoveListItem} />
    );
    expect(container.firstChild).toMatchSnapshot();
    const removeItemButton = screen.getByRole('button');
    expect(removeItemButton).toBeInTheDocument();
    expect(screen.getByTitle('Remove this test button.')).toBeInTheDocument();
    expect(screen.getByTestId('remove-item-button-tooltip')).toBeInTheDocument();
    userEvent.click(removeItemButton);
    expect(mockRemoveListItem.mock.calls.length).toBe(1);
    userEvent.unhover(removeItemButton);
});

test('<RemoveItemButton /> is hidden', () => {
    let {container} = render(
        <RemoveItemButton display={false} objectName={'test button'} 
        handleClick={mockRemoveListItem} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.queryByLabelText('remove-test button-button')).not.toBeInTheDocument();
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
});