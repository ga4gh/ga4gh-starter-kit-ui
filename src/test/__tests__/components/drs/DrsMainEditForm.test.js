import React from 'react';
import renderer from 'react-test-renderer';
import {
    render, 
    screen, 
    getByRole, 
    waitFor, 
    getByTitle, 
    getByText
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsMain from '../../../../lib/components/drs/DrsMain';
import {
    mockBlobDrsObject,
    mockBundleDrsObject
} from '../../../resources/MockData';
import {MemoryRouter} from 'react-router-dom';

test('DrsMain EDIT form render', async () => {
    let {container} = render( 
        <MemoryRouter initialEntries={[`/drs/a1dd4ae2-8d26-43b0-a199-342b64c7dff6/edit`]}> 
            <DrsMain />
        </MemoryRouter>
    );
    /* await(waitFor(() => {
        mockBundleDrsObject.drs_object_children.forEach((child, index) => {
            let id = screen.getByLabelText(`ID_children${index}`);
            expect(getByTitle(id, 'This is a valid ID.')).toBeInTheDocument();
        });
        mockBundleDrsObject.drs_object_parents.forEach((parent, index) => {
            let id = screen.getByLabelText(`ID_parents${index}`);
            expect(getByTitle(id, 'This is a valid ID.')).toBeInTheDocument();
        });
    })); */

    // verify that correct text and buttons are displayed
    expect(screen.queryByLabelText('drs-index-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('delete-drs-object-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('edit-drs-object-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('cancel-editing-drs-object-button')).toBeInTheDocument();
    let submitButton = screen.getByRole('button', {name: 'Submit'});
    expect(submitButton).toBeInTheDocument();

    /* // id field cannot be updated
    let id = screen.getAllByRole('textbox', {name: 'Id', exact: true})[0];
    expect(id).toHaveValue('a1dd4ae2-8d26-43b0-a199-342b64c7dff6');
    userEvent.type(id, 'abc123');
    expect(id).toHaveValue('a1dd4ae2-8d26-43b0-a199-342b64c7dff6');
    expect(screen.queryByLabelText('generate-id-button')).not.toBeInTheDocument();

    // name field can be updated
    let name = screen.getAllByRole('textbox', {name: 'Name'})[0];
    expect(name).toHaveValue(mockBundleDrsObject.name);
    userEvent.type(name, 'abc123');
    expect(name).toHaveValue(`${mockBundleDrsObject.name}abc123`);

    // description field can be updated
    let description = screen.getByRole('textbox', {name: 'Description'});
    expect(description).toHaveValue(mockBundleDrsObject.description);
    userEvent.type(description, 'abc123');
    expect(description).toHaveValue(`${mockBundleDrsObject.description}abc123`);

    // version can be updated
    let version = screen.getByRole('textbox', {name: 'Version'});
    expect(version).toHaveValue(mockBundleDrsObject.version);
    userEvent.type(version, 'abc123');
    expect(version).toHaveValue(`${mockBundleDrsObject.version}abc123`);

    // bundle blob radio cannot be updated
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    let blobRadio = screen.getByLabelText('Blob');
    let bundleRadio = screen.getByLabelText('Bundle');
    expect(blobRadio).not.toBeChecked();
    expect(bundleRadio).toBeChecked();
    expect(() => {
        userEvent.click(blobRadio);
    }).toThrow();

    // child bundles can be updated, added, and removed
    let  addChildButton = screen.getByLabelText('add-child-button');
    // add new child
    userEvent.click(addChildButton);
    let childId = screen.queryByLabelText('ID_children4');
    let childIdField = getByRole(childId, 'textbox');
    expect(childIdField).toHaveValue('');
    let childName = screen.queryByLabelText('Name_children4');
    let childNameField = getByRole(childName, 'textbox');
    expect(childNameField).toHaveValue('');
    // update fields without verifying
    userEvent.type(childIdField, '1a570e4e-2489-4218-9333-f65549495872');
    expect(childIdField).toHaveValue(mockBlobDrsObject.id);
    userEvent.type(childNameField, 'test child name value');
    expect(childNameField).toHaveValue('');
    //remove child
    userEvent.click(screen.getAllByLabelText('remove-child-button')[4]);
    expect(screen.queryByLabelText('ID_children4')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Name_children4')).not.toBeInTheDocument();

    // created time can be updated
    let createdTime = screen.getByRole('textbox', {name: 'Created Time'});
    expect(createdTime).toHaveValue('2021-03-12 15:00:00 GMT-05:00');
    userEvent.click(createdTime);
    let dateTimeDialogCreated = screen.getAllByRole('dialog')[0];
    expect(dateTimeDialogCreated).toBeInTheDocument();
    userEvent.click(getByRole(dateTimeDialogCreated, 'button', {name: '7'}));
    userEvent.click(getByText(dateTimeDialogCreated, 'OK'));
    expect(createdTime).toHaveValue('2021-03-07 15:00:00 GMT-05:00');
    userEvent.click(getByText(dateTimeDialogCreated, 'Cancel'));

    // updated time can be updated
    let updatedTime = screen.getByLabelText('Updated Time');
    expect(updatedTime).toHaveValue('2021-03-13 07:30:45 GMT-05:00');
    userEvent.click(updatedTime);
    let dateTimeDialogUpdated = screen.getAllByRole('dialog')[0];
    expect(dateTimeDialogUpdated).toBeInTheDocument();
    userEvent.click(getByRole(dateTimeDialogUpdated, 'button', {name: '17'}));
    userEvent.click(getByText(dateTimeDialogUpdated, 'OK'));
    expect(updatedTime).toHaveValue('2021-03-17 07:30:00 GMT-04:00');
    userEvent.click(getByText(dateTimeDialogUpdated, 'Cancel'));

    // attempt to submit successfully
    userEvent.click(submitButton);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(); */
});