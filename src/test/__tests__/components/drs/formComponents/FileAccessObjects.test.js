import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {
    mockAddObjectToList, 
    mockRemoveListItem,
    mockUpdateListObjectProperty
} from '../../../../resources/MockFunctions';
import FileAccessObjects from '../../../../../lib/components/drs/formComponents/FileAccessObjects';

let zeroFileAccessObjects = null;
let multipleFileAccessObjects = null;
let mockFunctions = null;
let sectionDescription = 'Local file access points represent local files available on the same filesystem where the DRS service is running. This can also include files co-located on Network Attached Storage (NAS), such as on a high-performance compute cluster (HPC).'

beforeEach(() => {
    zeroFileAccessObjects = [];
    multipleFileAccessObjects = [
        {path: 'path1'}, 
        {path: 'path2'}, 
        {path: 'path3'}, 
        {path: ''}
    ];
    mockFunctions = {
        setFileAccessObjectPath: mockUpdateListObjectProperty,
        removeFileAccessObject: mockRemoveListItem,
        addFileAccessObject: mockAddObjectToList
    }
})

afterEach(() => {
    mockAddObjectToList.mockClear();
    mockRemoveListItem.mockClear();
    mockUpdateListObjectProperty.mockClear();
})

test('SHOW <FileAccessObjects /> should handle multiple file access objects', () => {
    let {container} = render(
        <FileAccessObjects readOnly={true} {...mockFunctions} 
        file_access_objects={multipleFileAccessObjects} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('Local File Access Points')).toBeInTheDocument();
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

    // add and remove buttons should not be displayed and callback functions should not be called
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockAddObjectToList.mock.calls.length).toBe(0);
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);

    // read only path fields should be displayed for each file access object
    screen.getAllByRole('textbox').forEach((path, index) => {
        expect(path).toHaveValue(multipleFileAccessObjects[index].path);
        expect(path).toHaveAttribute('readonly');
        userEvent.type(path, 'test value');
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
});

test('NEW and EDIT <FileAccessObjects /> should handle zero file access objects', () => {
    let {container} = render(
        <FileAccessObjects readOnly={false} {...mockFunctions}
        file_access_objects={zeroFileAccessObjects} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('Local File Access Points')).toBeInTheDocument();
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

    // one clickable add item button should be displayed
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);

    // remove item buttons should not be displayed
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockRemoveListItem.mock.calls.length).toBe(0);

    // path fields should not be displayed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
});

test('NEW and EDIT <FileAccessObjects /> should handle multiple file access objects', () => {
    let {container} = render(
        <FileAccessObjects readOnly={false} {...mockFunctions}
        file_access_objects={multipleFileAccessObjects} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('Local File Access Points')).toBeInTheDocument();
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

    // one clickable add item button should be displayed 
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);

    // each path field should display a value which can be edited
    let pathFields = screen.getAllByRole('textbox');
    pathFields.forEach((path, index) => {
        expect(path).toHaveValue(multipleFileAccessObjects[index].path);
    });
    userEvent.type(pathFields[3], 'test value');
    expect(mockUpdateListObjectProperty).toHaveBeenCalled();
    expect(mockUpdateListObjectProperty.mock.results[0].value).toBe(3);

    // each path field should display a remove item button which can be clicked
    const removeItemButtons = screen.getAllByLabelText('remove-item-button');
    removeItemButtons.forEach((removeItemButton, index) => {
        expect(removeItemButton).toBeInTheDocument();
        userEvent.click(removeItemButton);
        //each remove item button should pass the correct index to the callback function
        expect(mockRemoveListItem.mock.calls[index][0]).toBe(index);
        expect(mockRemoveListItem.mock.results[index].value).toBe(index);
    });
    expect(mockRemoveListItem.mock.calls.length).toBe(removeItemButtons.length);
});