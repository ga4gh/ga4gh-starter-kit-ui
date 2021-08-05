import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Aliases from '../../../../../lib/components/drs/formComponents/Aliases';
import {
    mockAddObjectToList, 
    mockRemoveListItem,
    mockUpdateListString
} from '../../../../resources/MockFunctions';

let zeroAliases = null;
let multipleAliases = null;

beforeEach(() => {
    zeroAliases=[];
    multipleAliases=['alias1', 'alias2', 'alias3', ''];
});

afterEach(() => {
    mockAddObjectToList.mockClear();
    mockRemoveListItem.mockClear();
    mockUpdateListString.mockClear();
})

test('SHOW should handle multiple aliases', () => {
    let {container} = render(
        <Aliases readOnly={true} aliases={multipleAliases} 
        addAlias={mockAddObjectToList} removeAlias={mockRemoveListItem} setAlias={mockUpdateListString} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Aliases');
    expect(screen.getByText('A list of aliases that can be used to identify the DRS Object by additional names.')).toBeInTheDocument();

    // add and remove buttons should not be displayed and callback functions should not be called
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockAddObjectToList.mock.calls.length).toBe(0);
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(mockUpdateListString.mock.calls.length).toBe(0);

    // read only alias fields should be displayed for each alias
    screen.getAllByRole('textbox').forEach((alias, index) => {
        expect(alias).toHaveValue(multipleAliases[index]);
        expect(alias).toHaveAttribute('readonly');
        userEvent.type(alias, 'test alias');
        expect(mockUpdateListString.mock.calls.length).toBe(0);
    });
});

test('NEW and EDIT should handle zero aliases', () => {
    let {container} = render(
        <Aliases readOnly={false} aliases={zeroAliases} 
        addAlias={mockAddObjectToList} removeAlias={mockRemoveListItem} setAlias={mockUpdateListString} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Aliases');
    expect(screen.getByText('A list of aliases that can be used to identify the DRS Object by additional names.')).toBeInTheDocument();

    // one clickable add item button should be displayed
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);

    // remove item button should not be displayed
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockRemoveListItem.mock.calls.length).toBe(0);

    // alias fields should not be displayed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(mockUpdateListString.mock.calls.length).toBe(0);
});

test('NEW and EDIT should handle multiple aliases', () => {
    let {container} = render(
        <Aliases readOnly={false} aliases={multipleAliases} 
        addAlias={mockAddObjectToList} removeAlias={mockRemoveListItem} setAlias={mockUpdateListString} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Aliases');
    expect(screen.getByText('A list of aliases that can be used to identify the DRS Object by additional names.')).toBeInTheDocument();

    // one clickable add item button should be displayed 
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);

    // each alias field should display an alias value which can be edited
    let aliasFields = screen.getAllByRole('textbox');
    aliasFields.forEach((alias, index) => {
        expect(alias).toHaveValue(multipleAliases[index]);
    });
    userEvent.type(aliasFields[3], 'new alias test value');
    expect(mockUpdateListString).toHaveBeenCalled();
    expect(mockUpdateListString.mock.results[0].value).toBe(3);

    // each alias field should display a remove item button which can be clicked
    const removeItemButtons = screen.getAllByLabelText('remove-item-button');
    removeItemButtons.forEach((removeItemButton, index) => {
        expect(removeItemButton).toBeInTheDocument();
        userEvent.click(removeItemButton);
        //each removeItemButton should pass the correct index to the callback function
        expect(mockRemoveListItem.mock.calls[index][0]).toBe(index);
        expect(mockRemoveListItem.mock.results[index].value).toBe(index);
    });
    expect(mockRemoveListItem.mock.calls.length).toBe(multipleAliases.length);
});