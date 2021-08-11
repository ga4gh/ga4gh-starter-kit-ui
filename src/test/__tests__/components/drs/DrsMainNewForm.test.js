import React from 'react';
import renderer from 'react-test-renderer';
import {
    render, 
    screen, 
    getByRole, 
    queryByRole, 
    getByLabelText, 
    waitFor, 
    getByTitle, 
    queryByTitle
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsMain from '../../../../lib/components/drs/DrsMain';
import {
    mockBlobDrsObject,
    mockBundleDrsObject
} from '../../../resources/MockData';
import {MemoryRouter} from 'react-router-dom';

test('DrsMain render NEW form and submit blob', async () => {
    let {container} = render(
        <MemoryRouter initialEntries={["/drs/new"]}>
            <DrsMain />
        </MemoryRouter>
    );

    // verify that correct text and buttons are displayed
    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Create New DrsObject');
    expect(screen.getByLabelText('drs-index-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('delete-drs-object-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('edit-drs-object-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('cancel-editing-drs-object-button')).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();

    // id field can be updated
    let id = screen.getByRole('textbox', {name: 'Id'});
    expect(id).toHaveTextContent('');
    userEvent.type(id, 'abc123');
    expect(id).toHaveValue('abc123');
    userEvent.click(screen.getByLabelText('generate-id-button'));
    expect(id).not.toHaveValue('abc123');
    expect(id).not.toHaveValue('');

    // name field can be updated
    let name = screen.getByRole('textbox', {name: 'Name'});
    expect(name).toHaveTextContent('');
    userEvent.type(name, 'abc123');
    expect(name).toHaveValue('abc123');

    // description field can be updated
    let description = screen.getByRole('textbox', {name: 'Description'});
    expect(description).toHaveTextContent('');
    userEvent.type(description, 'abc123');
    expect(description).toHaveValue('abc123');

    // version can be updated
    let version = screen.getByRole('textbox', {name: 'Version'});
    expect(version).toHaveTextContent('');
    userEvent.type(version, 'abc123');
    expect(version).toHaveValue('abc123');

    // bundle blob radio can be updated
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    let blobRadio = screen.getByLabelText('Blob');
    let bundleRadio = screen.getByLabelText('Bundle');
    expect(blobRadio).toBeChecked();
    expect(bundleRadio).not.toBeChecked();
    userEvent.click(bundleRadio);
    expect(blobRadio).not.toBeChecked();
    expect(bundleRadio).toBeChecked();
    userEvent.click(blobRadio);

    // MIME type can be updated
    let mimeType = screen.getByRole('textbox', {name: 'MIME Type'});
    expect(mimeType).toHaveTextContent('');
    userEvent.type(mimeType, 'abc123');
    expect(mimeType).toHaveValue('abc123');

    // size can be updated
    let size = screen.getByRole('spinbutton', {name: 'Size'});
    expect(size).toHaveTextContent('');
    userEvent.type(size, 'abc123');
    expect(size).toHaveValue(123);

    // aliases can be updated, added, and removed
    expect(screen.queryByRole('textbox', {name: 'Alias'})).not.toBeInTheDocument();
    let addAliasButton = screen.getByLabelText('add-alias-button');
    // add new alias
    userEvent.click(addAliasButton);
    let alias = screen.getByRole('textbox', {name: 'Alias'});
    expect(alias).toBeInTheDocument();
    expect(alias).toHaveValue('');
    // update alias
    userEvent.type(alias, 'alias1');
    expect(alias).toHaveValue('alias1');
    userEvent.click(addAliasButton);
    let aliases = screen.getAllByRole('textbox', {name: 'Alias'});
    expect(aliases[0]).toHaveValue('alias1');
    expect(aliases[1]).toHaveValue('');
    //remove alias
    let removeAliasButtons = screen.getAllByLabelText('remove-alias-button');
    userEvent.click(removeAliasButtons[0]);
    aliases = screen.getAllByRole('textbox', {name: 'Alias'});
    expect(aliases[0]).toHaveValue('');
    userEvent.click(removeAliasButtons[0]);

    // checksums can be updated, added, and removed
    expect(screen.queryByLabelText('Type')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', {name: 'Checksum'})).not.toBeInTheDocument();
    let addChecksumButton = screen.getByLabelText('add-checksum-button');
    // add new checksum
    userEvent.click(addChecksumButton);
    let type = screen.getByLabelText('Type');
    expect(type).not.toHaveValue();
    let checksum = screen.getByRole('textbox', {name: 'Checksum'});
    expect(checksum).toBeInTheDocument();
    expect(checksum).toHaveValue('');
    userEvent.click(addChecksumButton);
    // update type field
    let types = screen.getAllByLabelText('Type');
    userEvent.click(types[0]);
    let firstTypeSelector = screen.getByRole('listbox');
    expect(getByRole(firstTypeSelector, 'option', {name: 'md5'})).not.toHaveAttribute('aria-selected', 'true');
    expect(getByRole(firstTypeSelector, 'option', {name: 'sha1'})).not.toHaveAttribute('aria-selected', 'true');
    expect(getByRole(firstTypeSelector, 'option', {name: 'sha256'})).not.toHaveAttribute('aria-selected', 'true');
    userEvent.click(getByRole(firstTypeSelector, 'option', {name: 'md5'}));
    expect(types[0]).toHaveTextContent('md5');
    // second type selector should be updated based on option chosen previously
    userEvent.click(types[1]);
    let secondTypeSelector = screen.getByRole('listbox');
    expect(queryByRole(secondTypeSelector, 'option', {name: 'md5'})).not.toBeInTheDocument();;
    expect(getByRole(secondTypeSelector, 'option', {name: 'sha1'})).not.toHaveAttribute('aria-selected', 'true');
    expect(getByRole(secondTypeSelector, 'option', {name: 'sha256'})).not.toHaveAttribute('aria-selected', 'true');
    userEvent.click(getByRole(secondTypeSelector, 'option', {name: 'sha256'}));
    expect(types[1]).toHaveTextContent('sha256');
    // update checksum field
    userEvent.type(checksum, 'abc123');
    expect(checksum).toHaveValue('abc123');
    //remove checksums
    let removeChecksumButtons = screen.getAllByLabelText('remove-checksum-button');
    userEvent.click(removeChecksumButtons[1]);
    userEvent.click(removeChecksumButtons[0]);
    expect(screen.queryByLabelText('Type')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', {name: 'Checksum'})).not.toBeInTheDocument();

    // parent bundles can be updated, added, and removed
    expect(screen.queryByLabelText('ID_parents0')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Name_parents0')).not.toBeInTheDocument();
    let addParentButton = screen.getByLabelText('add-parent-button');
    // add new parent
    userEvent.click(addParentButton);
    let parentId = screen.queryByLabelText('ID_parents0');
    let parentIdField = getByRole(parentId, 'textbox');
    expect(parentIdField).toBeInTheDocument();
    expect(parentIdField).toHaveValue('');
    let parentName = screen.queryByLabelText('Name_parents0');
    let parentNameField = getByRole(parentName, 'textbox');
    expect(parentNameField).toBeInTheDocument();
    expect(parentNameField).toHaveValue('');
    // update fields
    userEvent.type(parentIdField, mockBundleDrsObject.id);
    expect(parentIdField).toHaveValue('a1dd4ae2-8d26-43b0-a199-342b64c7dff6');
    userEvent.type(parentNameField, 'test parent name value');
    expect(parentNameField).toHaveValue('');
    // validate parent
    // verifying a valid id displays correct validation
    userEvent.click(getByRole(parentId, 'button', {name: 'verify-id'}));
    await waitFor(() => expect(screen.getByTitle('This is a valid ID.')).toBeInTheDocument());
    expect(screen.queryByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).not.toBeInTheDocument();
    expect(parentNameField).toHaveValue(mockBundleDrsObject.name);
    //attempt to set a blob as a parent drs object
    // verifying an invalid id displays correct validation
    userEvent.type(parentIdField, `{selectall}{backspace}${mockBlobDrsObject.id}`);
    expect(parentIdField).toHaveValue('1a570e4e-2489-4218-9333-f65549495872');
    expect(screen.queryByTitle('This is a valid ID.')).not.toBeInTheDocument();
    expect(parentNameField).toHaveValue('');
    userEvent.click(getByRole(parentId, 'button', {name: 'verify-id'}));
    await waitFor(() => expect(screen.getByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).toBeInTheDocument());
    expect(parentNameField).toHaveValue('');
    //remove parent
    userEvent.click(screen.getByLabelText('remove-parent-button'));
    expect(screen.queryByLabelText('ID_parents0')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Name_parents0')).not.toBeInTheDocument();

    // file access objects can be updated, added, and removed
    expect(screen.queryByRole('textbox', {name: 'Path'})).not.toBeInTheDocument();
    let addFileAccessObjectButton = screen.getByLabelText('add-local file access point-button');
    // add new file access object
    userEvent.click(addFileAccessObjectButton);
    let path = screen.getByRole('textbox', {name: 'Path'});
    expect(path).toBeInTheDocument();
    expect(path).toHaveValue('');
    // update file access object
    userEvent.type(path, 'path1');
    expect(path).toHaveValue('path1');
    userEvent.click(addFileAccessObjectButton);
    let paths = screen.getAllByRole('textbox', {name: 'Path'});
    expect(paths[0]).toHaveValue('path1');
    expect(paths[1]).toHaveValue('');
    //remove file access object
    let removeFileAccessObjectButtons = screen.getAllByLabelText('remove-local file access point-button');
    userEvent.click(removeFileAccessObjectButtons[0]);
    paths = screen.getAllByRole('textbox', {name: 'Path'});
    expect(paths[0]).toHaveValue('');
    userEvent.click(removeFileAccessObjectButtons[0]);

    // aws s3 access points can be updated, added, and removed
    expect(screen.queryByRole('textbox', {name: 'Region'})).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', {name: 'Bucket'})).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', {name: 'Key'})).not.toBeInTheDocument();
    let addAwsS3AccessObjectButton = screen.getByLabelText('add-AWS S3 access point-button');
    // add new aws s3 access point
    userEvent.click(addAwsS3AccessObjectButton);
    let region = screen.getByRole('textbox', {name: 'Region'});
    expect(region).toBeInTheDocument();
    expect(region).toHaveValue('');
    let bucket = screen.getByRole('textbox', {name: 'Bucket'});
    expect(bucket).toBeInTheDocument();
    expect(bucket).toHaveValue('');
    let key = screen.getByRole('textbox', {name: 'Key'});
    expect(key).toBeInTheDocument();
    expect(key).toHaveValue('');
    // update fields
    userEvent.type(region, 'region1');
    expect(region).toHaveValue('region1');
    userEvent.type(bucket, 'bucket1');
    expect(bucket).toHaveValue('bucket1');
    userEvent.type(key, 'key1');
    expect(key).toHaveValue('key1');
    //remove aws s3 access point
    userEvent.click(screen.getByLabelText('remove-AWS S3 access point-button'));
    expect(screen.queryByRole('textbox', {name: 'Region'})).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', {name: 'Bucket'})).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', {name: 'Key'})).not.toBeInTheDocument();

    // attempt to submit new object with invalid id
    // error message should be displayed
    userEvent.type(id, '{selectall}{backspace}');
    expect(id).toHaveValue('');
    let submitButton = screen.getByRole('button', {name: 'Submit'});
    userEvent.click(submitButton);
    let errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeVisible();
    userEvent.click(getByLabelText(errorMessage, 'Close'));
    expect(errorMessage).not.toBeVisible;
    userEvent.click(screen.getByLabelText('generate-id-button'));
    userEvent.click(submitButton);
    expect(screen.queryByRole('alert')).not.toBeVisible();
});

test('DrsMain render NEW form and submit bundle', async () => {
    let {container} = render(
        <MemoryRouter initialEntries={["/drs/new"]}>
            <DrsMain />
        </MemoryRouter>
    );

    // id field can be updated
    let id = screen.getByRole('textbox', {name: 'Id'});
    userEvent.click(screen.getByLabelText('generate-id-button'));

    // name field can be updated
    let name = screen.getByRole('textbox', {name: 'Name'});
    userEvent.type(name, 'abc123');

    // bundle blob radio can be updated
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    let blobRadio = screen.getByLabelText('Blob');
    let bundleRadio = screen.getByLabelText('Bundle');
    expect(blobRadio).toBeChecked();
    expect(bundleRadio).not.toBeChecked();
    userEvent.click(bundleRadio);
    expect(blobRadio).not.toBeChecked();
    expect(bundleRadio).toBeChecked();

    let  addChildButton = screen.getByLabelText('add-child-button');
    // add new child
    userEvent.click(addChildButton);
    let childId = screen.queryByLabelText('ID_children0');
    let childIdField = getByRole(childId, 'textbox');
    expect(childIdField).toHaveValue('');
    let childName = screen.queryByLabelText('Name_children0');
    let childNameField = getByRole(childName, 'textbox');
    expect(childNameField).toHaveValue('');
    // update fields
    userEvent.type(childIdField, '1a570e4e-2489-4218-9333-f65549495872');
    expect(childIdField).toHaveValue(mockBlobDrsObject.id);
    userEvent.type(childNameField, 'test child name value');
    expect(childNameField).toHaveValue('');
    // validate child
    // verifying a valid id displays correct validation
    userEvent.click(getByRole(childId, 'button', {name: 'verify-id'}));
    await waitFor(() => expect(getByTitle(childId, 'This is a valid ID.')).toBeInTheDocument());
    expect(queryByTitle(childId, 'This is an invalid ID. Please enter a valid ID before proceeding.')).not.toBeInTheDocument();
    expect(childNameField).toHaveValue(mockBlobDrsObject.name);
    // verifying an invalid id displays correct validation
    userEvent.type(childIdField, 'abc123');
    expect(childIdField).toHaveValue('1a570e4e-2489-4218-9333-f65549495872abc123');
    expect(queryByTitle(childId, 'This is a valid ID.')).not.toBeInTheDocument();
    expect(childNameField).toHaveValue('');
    userEvent.click(getByRole(childId, 'button', {name: 'verify-id'}));
    await waitFor(() => expect(getByTitle(childId, 'This is an invalid ID. Please enter a valid ID before proceeding.')).toBeInTheDocument());
    //remove child
    userEvent.click(screen.getByLabelText('remove-child-button'));
    expect(screen.queryByLabelText('ID_children4')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Name_children4')).not.toBeInTheDocument();

    // attempt to submit successfully
    userEvent.click(screen.getByRole('button', {name: 'Submit'}));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});