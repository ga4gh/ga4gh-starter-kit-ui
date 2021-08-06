import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsObjectRelatives from '../../../../../lib/components/drs/formComponents/DrsObjectRelatives';
import {MemoryRouter} from 'react-router-dom';
import {
    mockAddObjectToList, 
    mockRemoveListItem, 
    mockUpdateListObjectProperty,
    mockResetListObjectProperty
} from '../../../../resources/MockFunctions';

let zeroRelatives = null;
let multipleNewRelatives = null;
let multipleRelatives = null;
let showForm = null;
let newForm = null;
let editForm = null;
let relativeProps = null;

beforeEach(() => {
    zeroRelatives = {relatives: []};
    multipleNewRelatives = {
        relatives: [{id: 'id1'}, {id: 'id2'}, {id: 'id3'} ]
    }
    multipleRelatives = {
        relatives: [
            {id: 'id1', name: 'name1'},
            {id: 'id2', name: 'name2'},
            {id: 'id3', name: 'name3'}
        ]
    };
    showForm = {readOnly: true, formViewType: 'SHOW'};
    newForm = {readOnly: false, formViewType: 'NEW'};
    editForm = {readOnly: false, formViewType: 'EDIT'} ; 
    relativeProps = {
        header: 'Related DRS Objects',
        sectionDescription: 'This is a description for testing.',
        activeDrsObjectId: '1234567890',
        relationship: 'related_drs_object',
        objectName: 'relative',
        setRelativeId: mockUpdateListObjectProperty,
        unsetRelativeValidity: mockResetListObjectProperty,
        setRelativeName: mockUpdateListObjectProperty,
        setRelativeValid: mockResetListObjectProperty,
        setRelativeInvalid: mockResetListObjectProperty,
        removeRelative: mockRemoveListItem,
        addRelative: mockAddObjectToList
    };
});

afterEach(() => {
    mockAddObjectToList.mockClear(); 
    mockRemoveListItem.mockClear(); 
    mockUpdateListObjectProperty.mockClear(); 
    mockResetListObjectProperty.mockClear(); 
});

test('SHOW <DrsObjectRelatives/> should handle multiple relatives', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectRelatives {...showForm} {...relativeProps} {...multipleRelatives} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent(relativeProps.header);
    expect(screen.getByText(relativeProps.sectionDescription)).toBeInTheDocument();

    // add and remove buttons should not be displayed and callback functions should not be called
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(mockAddObjectToList.mock.calls.length).toBe(0);

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let viewButtons = screen.getAllByLabelText('view-relative');

    multipleRelatives.relatives.forEach((relative, index) => {
        // ID fields should be displayed for each related object
        expect(idFields[index]).toHaveValue(relative.id);
        expect(idFields[index]).toHaveAttribute('readonly');
        userEvent.type(idFields[index], 'new test ID value');
        // ID fields should not have "Verify ID" buttons
        expect(screen.queryByLabelText('verify-id')).not.toBeInTheDocument();

        // Name fields should be displayed for each related object
        expect(nameFields[index]).toHaveValue(relative.name);
        expect(nameFields[index]).toHaveAttribute('readonly');
        userEvent.type(nameFields[index], 'new test name value');

        // "View" buttons should be displayed for each related object
        // clicking the button should update the route
        expect(viewButtons[index]).toBeInTheDocument();
        userEvent.click(viewButtons[index]);
        // TODO: test that route changes on button click
    });
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
});

test('NEW <DrsObjectRelatives/> should handle zero relatives', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectRelatives {...newForm} {...relativeProps} {...zeroRelatives} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent(relativeProps.header);
    expect(screen.getByText(relativeProps.sectionDescription)).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-item-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    // ID fields, name fields, remove buttons, "View" buttons, and "Verify ID" buttons should not be displayed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('verify-id')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});

test('NEW <DrsObjectRelatives/> should handle multiple relatives', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectRelatives  {...newForm} {...relativeProps} {...multipleNewRelatives} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent(relativeProps.header);
    expect(screen.getByText(relativeProps.sectionDescription)).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-item-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let removeRelativeButtons = screen.getAllByLabelText('remove-item-button');
    let verifyIdButtons = screen.getAllByLabelText('verify-id');

    multipleNewRelatives.relatives.forEach((relative, index) => {
        // editable ID fields should be displayed for each relative
        expect(idFields[index]).toHaveValue(relative.id);
        userEvent.type(idFields[index], 'new test id value');
        expect(mockUpdateListObjectProperty).toHaveBeenCalled();
        expect(mockUpdateListObjectProperty.mock.calls[0][0]).toBe(index);
        mockUpdateListObjectProperty.mockClear();

        // readonly name fields should be displayed for each relative
        expect(nameFields[index]).toHaveValue('');
        expect(nameFields[index]).toHaveAttribute('readonly');
        userEvent.type(nameFields[index], 'new test name value');
        expect(mockUpdateListObjectProperty).not.toHaveBeenCalled();
        mockUpdateListObjectProperty.mockClear();

        // clickable remove buttons should be displayed for each relative
        userEvent.click(removeRelativeButtons[index]);
        expect(mockRemoveListItem).toHaveBeenCalledWith(index);

        // clickable "Verify ID" buttons should be displayed for each ID field
        userEvent.click(verifyIdButtons[index]);
        expect(mockResetListObjectProperty).toHaveBeenCalledWith(index);
    });
});

test('EDIT <DrsObjectRelatives/> should handle zero relatives', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectRelatives {...editForm} {...relativeProps} {...zeroRelatives} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent(relativeProps.header);
    expect(screen.getByText(relativeProps.sectionDescription)).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-item-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    // ID fields, name fields, remove buttons, "View" buttons, and "Verify ID" buttons should not be displayed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('verify-id')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});

test('EDIT <DrsObjectRelatives/> should handle multiple relatives', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectRelatives  {...editForm} {...relativeProps} {...multipleRelatives} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent(relativeProps.header);
    expect(screen.getByText(relativeProps.sectionDescription)).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-item-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let removeRelativeButtons = screen.getAllByLabelText('remove-item-button');
    let verifyIdButtons = screen.getAllByLabelText('verify-id');

    multipleRelatives.relatives.forEach((relative, index) => {
        // editable ID fields should be displayed for each relative
        expect(idFields[index]).toHaveValue(relative.id);
        userEvent.type(idFields[index], 'new test id value');
        expect(mockUpdateListObjectProperty).toHaveBeenCalled();
        expect(mockUpdateListObjectProperty.mock.calls[0][0]).toBe(index);
        mockUpdateListObjectProperty.mockClear();

        // readonly name fields should be displayed for each relative
        expect(nameFields[index]).toHaveValue(relative.name);
        expect(nameFields[index]).toHaveAttribute('readonly');
        userEvent.type(nameFields[index], 'new test name value');
        expect(mockUpdateListObjectProperty).not.toHaveBeenCalled();
        mockUpdateListObjectProperty.mockClear();

        // clickable remove buttons should be displayed for each relative
        userEvent.click(removeRelativeButtons[index]);
        expect(mockRemoveListItem).toHaveBeenCalledWith(index);

        // clickable "Verify ID" buttons should be displayed for each ID field
        userEvent.click(verifyIdButtons[index]);
        expect(mockResetListObjectProperty).toHaveBeenCalledWith(index);
    });
});