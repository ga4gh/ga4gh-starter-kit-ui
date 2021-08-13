import React from 'react';
import renderer from 'react-test-renderer';
import {queryByRole, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsObjectChildren from '../../../../../../../lib/components/ga4gh/drs/drsobject/formComponents/DrsObjectChildren';
import { MemoryRouter } from 'react-router';
import {
    mockAddObjectToList, 
    mockRemoveListItem, 
    mockUpdateListObjectProperty,
    mockResetListObjectProperty
} from '../../../../../../resources/MockFunctions';

let zeroChildren = null;
let multipleChildren = null;
let childrenProps = null;
let showForm = null;
let newForm = null;
let editForm = null;
let sectionDescriptions = [
    'This DRS Object is currently acting as a DRS Bundle. Bundles contain references to multiple Child objects (single-blob DRS Objects and/or DRS Bundles), enabling multiple DRS Objects to be logically grouped in a nested structure. Only DRS Bundles may have children, single-blob DRS Objects do not have children.',
    'The following listing displays all children for the current DRS Bundle.'
]

beforeEach(() => {
    zeroChildren={drs_object_children: []};
    multipleChildren={
        drs_object_children: [
            {id: 'id1', name: 'name1'},
            {id: 'id2', name: 'name2'},
            {id: 'id3', name: 'name3'}
        ]
    };
    childrenProps = {
        id: '1234567890',
        addChild: mockAddObjectToList,
        setChildId: mockUpdateListObjectProperty,
        setChildName: mockUpdateListObjectProperty,
        setChildValid: mockResetListObjectProperty,
        setChildInvalid: mockResetListObjectProperty,
        unsetChildValidity: mockResetListObjectProperty,
        removeChild: mockRemoveListItem
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


test('SHOW <DrsObjectChildren /> should handle multiple child objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectChildren {...showForm} {...multipleChildren} {...childrenProps} />    
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Bundle Children');
    expect(screen.getByText(sectionDescriptions[0])).toBeInTheDocument();
    expect(screen.getByText(sectionDescriptions[1])).toBeInTheDocument();

    // add and remove item buttons should not be displayed
    expect(screen.queryByLabelText('add-child-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-child-button')).not.toBeInTheDocument();

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let viewButtons = screen.getAllByLabelText('view-relative');
    
    // ID fields, name fields, and "View" buttons should be displayed for each child DRS Object
    multipleChildren.drs_object_children.forEach((childObject, index) => {
        expect(idFields[index]).toHaveValue(childObject.id);
        expect(idFields[index]).toHaveAttribute('readonly');
        expect(nameFields[index]).toHaveValue(childObject.name)
        expect(nameFields[index]).toHaveAttribute('readonly');
        expect(viewButtons[index]).toBeInTheDocument();
    });
});

test('NEW <DrsObjectChildren /> should handle zero child objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectChildren {...newForm} {...zeroChildren} {...childrenProps} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Bundle Children');
    expect(screen.getByText(sectionDescriptions[0])).toBeInTheDocument();
    expect(screen.getByText(sectionDescriptions[1])).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-child-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    // ID fields, name fields, remove buttons, "View" buttons, and "Verify ID" buttons should not be displayed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-child-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('verify-id')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});

test('NEW <DrsObjectChildren /> should handle multiple child objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectChildren {...newForm} {...multipleChildren} {...childrenProps} />   
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Bundle Children');
    expect(screen.getByText(sectionDescriptions[0])).toBeInTheDocument();
    expect(screen.getByText(sectionDescriptions[1])).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-child-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let removeRelativeButtons = screen.getAllByLabelText('remove-child-button');
    let verifyIdButtons = screen.getAllByLabelText('verify-id');
    // ID fields, name fields, remove buttons, and "Verify ID" buttons should be 
    // displayed for each child object
    multipleChildren.drs_object_children.forEach((childObject, index) => {
        expect(idFields[index]).toHaveValue(childObject.id);
        expect(nameFields[index]).toHaveValue(childObject.name);
        expect(removeRelativeButtons[index]).toBeInTheDocument();
        expect(verifyIdButtons[index]).toBeInTheDocument();
    });

    // "View" buttons should not be displayed
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});

test('EDIT <DrsObjectChildren /> should handle zero child objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectChildren {...editForm} {...zeroChildren} {...childrenProps} />   
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Bundle Children');
    expect(screen.getByText(sectionDescriptions[0])).toBeInTheDocument();
    expect(screen.getByText(sectionDescriptions[1])).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-child-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    // ID fields, name fields, remove buttons, "View" buttons, and "Verify ID" buttons should not be displayed
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-child-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('verify-id')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});

test('EDIT <DrsObjectChildren /> should handle multiple child objects', () => {
    let {container} = render(
        <MemoryRouter>
            <DrsObjectChildren {...editForm} {...multipleChildren} {...childrenProps} />    
        </MemoryRouter>
        );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Bundle Children');
    expect(screen.getByText(sectionDescriptions[0])).toBeInTheDocument();
    expect(screen.getByText(sectionDescriptions[1])).toBeInTheDocument();

    // clickable add button should be displayed
    let addRelativeButton = screen.getByLabelText('add-child-button');
    expect(addRelativeButton).toBeInTheDocument();
    userEvent.click(addRelativeButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1); 

    let idFields = screen.getAllByLabelText('Id');
    let nameFields = screen.getAllByLabelText('Name');
    let removeRelativeButtons = screen.getAllByLabelText('remove-child-button');
    let verifyIdButtons = screen.getAllByLabelText('verify-id');
    // ID fields, name fields, remove buttons, and "Verify ID" buttons should be 
    // displayed for each child object
    multipleChildren.drs_object_children.forEach((childObject, index) => {
        expect(idFields[index]).toHaveValue(childObject.id);
        expect(nameFields[index]).toHaveValue(childObject.name);
        expect(removeRelativeButtons[index]).toBeInTheDocument();
        expect(verifyIdButtons[index]).toBeInTheDocument();
    });

    // "View" buttons should not be displayed
    expect(screen.queryByLabelText('view-relative')).not.toBeInTheDocument();
});