import React from 'react';
import renderer from 'react-test-renderer';
import {queryByRole, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsObjectParents from '../../../../../lib/components/drs/formComponents/DrsObjectParents';
import { MemoryRouter } from 'react-router';
import {
    mockAddObjectToList, 
    mockRemoveListItem, 
    mockUpdateListObjectProperty,
    mockResetListObjectProperty
} from '../../../../resources/MockFunctions';

let zeroParents = null;
let multipleParents = null;
let parentProps = null;
let showForm = null;
let newForm = null;
let editForm = null;
let sectionDescription = 'The following listing displays all "Parent" DRS Bundles, that is, all bundles that contain the current DRS Object as one of its Children.'

beforeEach(() => {
    zeroParents={drs_object_parents: []};
    multipleParents={
        drs_object_parents: [
            {id: 'id1', name: 'name1'},
            {id: 'id2', name: 'name2'},
            {id: 'id3', name: 'name3'}
        ]
    };
    parentProps = {
        id: '1234567890',
        addParent: mockAddObjectToList,
        setParentId: mockUpdateListObjectProperty,
        setParentName: mockUpdateListObjectProperty,
        setParentValid: mockResetListObjectProperty,
        setParentInvalid: mockResetListObjectProperty,
        unsetParentValidity: mockResetListObjectProperty,
        removeParent: mockRemoveListItem
    };
    showForm = {readOnly: true, formViewType: 'SHOW'};
    newForm = {readOnly: false, formViewType: 'NEW'};
    editForm = {readOnly: false, formViewType: 'EDIT'}; 
});

afterEach(() => {
    mockAddObjectToList.mockClear(); 
    mockRemoveListItem.mockClear(); 
    mockUpdateListObjectProperty.mockClear(); 
    mockResetListObjectProperty.mockClear();
});

test('SHOW <DrsObjectParents /> should handle multiple parent objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectParents {...showForm} {...multipleParents} {...parentProps} />
        </MemoryRouter>
        );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Parent Bundles');
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

    // add and remove item buttons should not be displayed
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let viewButtons = screen.getAllByLabelText('view-relative');
    
    // ID fields, name fields, and "View" buttons should be displayed for each child DRS Object
    multipleParents.drs_object_parents.forEach((parentObject, index) => {
        expect(idFields[index]).toHaveValue(parentObject.id);
        expect(idFields[index]).toHaveAttribute('readonly');
        expect(nameFields[index]).toHaveValue(parentObject.name)
        expect(nameFields[index]).toHaveAttribute('readonly');
        expect(viewButtons[index]).toBeInTheDocument();
    });
});

test('NEW <DrsObjectParents /> should handle zero parent objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectParents {...newForm} {...zeroParents} {...parentProps} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Parent Bundles');
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

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

test('NEW <DrsObjectParents /> should handle multiple parent objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectParents {...newForm} {...multipleParents }{...parentProps} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Parent Bundles');
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-item-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let removeRelativeButtons = screen.getAllByLabelText('remove-item-button');
    let verifyIdButtons = screen.getAllByLabelText('verify-id');
    // ID fields, name fields, remove buttons, and "Verify ID" buttons should be 
    // displayed for each child object
    multipleParents.drs_object_parents.forEach((parentObject, index) => {
        expect(idFields[index]).toHaveValue(parentObject.id);
        expect(nameFields[index]).toHaveValue(parentObject.name);
        expect(removeRelativeButtons[index]).toBeInTheDocument();
        expect(verifyIdButtons[index]).toBeInTheDocument();
    });

    // "View" buttons should not be displayed
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});

test('EDIT <DrsObjectParents /> should handle zero parent objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectParents {...editForm} {...zeroParents} {...parentProps} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Parent Bundles');
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Parent Bundles');
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

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

test('EDIT <DrsObjectParents /> should handle multiple parent objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectParents {...editForm} {...multipleParents} {...parentProps} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Parent Bundles');
    expect(screen.getByText(sectionDescription)).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-item-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let removeRelativeButtons = screen.getAllByLabelText('remove-item-button');
    let verifyIdButtons = screen.getAllByLabelText('verify-id');
    // ID fields, name fields, remove buttons, and "Verify ID" buttons should be 
    // displayed for each child object
    multipleParents.drs_object_parents.forEach((parentObject, index) => {
        expect(idFields[index]).toHaveValue(parentObject.id);
        expect(nameFields[index]).toHaveValue(parentObject.name);
        expect(removeRelativeButtons[index]).toBeInTheDocument();
        expect(verifyIdButtons[index]).toBeInTheDocument();
    });

    // "View" buttons should not be displayed
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});