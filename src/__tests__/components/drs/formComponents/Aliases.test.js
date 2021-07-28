import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Aliases from '../../../../lib/components/drs/formComponents/Aliases';

let zeroAliases = null;
let multipleAliases = null;
const mockAddAlias = jest.fn();
const mockRemoveAlias = jest.fn(index => {
    return index;
});

beforeEach(() => {
    zeroAliases=[];
    multipleAliases=['alias1', 'alias2', 'alias3'];
});

test('SHOW should handle multiple aliases', () => {
    let {container} = render(
        <Aliases readOnly={true} aliases={multipleAliases} 
        addAlias={mockAddAlias} removeAlias={mockRemoveAlias} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Aliases');
    expect(screen.getByText('A list of aliases that can be used to identify the DRS Object by additional names.')).toBeInTheDocument();
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockAddAlias.mock.calls.length).toBe(0);
    expect(mockRemoveAlias.mock.calls.length).toBe(0);
    screen.getAllByRole('textbox').forEach((alias, index) => {
        expect(alias).toHaveValue(multipleAliases[index]);
    })
});

test('NEW and EDIT should handle zero aliases', () => {
    let {container} = render(
        <Aliases readOnly={false} aliases={zeroAliases} 
        addAlias={mockAddAlias} removeAlias={mockRemoveAlias} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Aliases');
    expect(screen.getByText('A list of aliases that can be used to identify the DRS Object by additional names.')).toBeInTheDocument();
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddAlias.mock.calls.length).toBe(1);
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});

test('NEW and EDIT should handle multiple aliases', () => {
    let {container} = render(
        <Aliases readOnly={false} aliases={multipleAliases} 
        addAlias={mockAddAlias} removeAlias={mockRemoveAlias} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Aliases');
    expect(screen.getByText('A list of aliases that can be used to identify the DRS Object by additional names.')).toBeInTheDocument();
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    const removeItemButtons = screen.getAllByLabelText('remove-item-button');
    removeItemButtons.forEach((removeItemButton, index) => {
        expect(removeItemButton).toBeInTheDocument();
        userEvent.click(removeItemButton);
        //each removeItemButton should pass the correct index to the callback function
        expect(mockRemoveAlias.mock.calls[index][0]).toBe(index);
        expect(mockRemoveAlias.mock.results[index].value).toBe(index);
    });
    expect(mockRemoveAlias.mock.calls.length).toBe(removeItemButtons.length);
});