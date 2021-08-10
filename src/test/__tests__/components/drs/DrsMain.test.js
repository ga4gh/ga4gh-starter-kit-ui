import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, getByRole, queryByRole, getByLabelText, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DrsMain from '../../../../lib/components/drs/DrsMain';
import {
    mockBundleDrsObject
} from '../../../resources/MockData';
import {MemoryRouter} from 'react-router-dom';

test('DrsMain default Index render', async () => {
    let {container} = render(
        <MemoryRouter initialEntries={["/drs"]}>
            <DrsMain />
        </MemoryRouter>
    );
    await(waitFor(() => expect(screen.getByText(`a1dd4ae2-8d26-43b0-a199-342b64c7dff6`)).toBeInTheDocument()));
    expect(container.firstChild).toMatchSnapshot();
    /* expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText(`a1dd4ae2-8d26-43b0-a199-342b64c7dff6`)).toBeInTheDocument(); */
    //screen.debug();                 
});

test('DrsMain default NEW form render', async () => {
    let {container} = render(
        <MemoryRouter initialEntries={["/drs/new"]}>
            <DrsMain />
        </MemoryRouter>
    );
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

    // created time can be updated

    // updated time can be updated

    // version can be updated
    let version = screen.getByRole('textbox', {name: 'Version'});
    expect(version).toHaveTextContent('');
    userEvent.type(version, 'abc123');
    expect(version).toHaveValue('abc123');

    // bundle blob radio can be updated

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
    // verifying an invalid id displays correct validation
    userEvent.type(parentIdField, 'abc123');
    expect(parentIdField).toHaveValue('a1dd4ae2-8d26-43b0-a199-342b64c7dff6abc123');
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
    //userEvent.type(id, {backspace});
    expect(id).toHaveValue('');
    let submitButton = screen.getByRole('button', {name: 'Submit'});
    userEvent.click(submitButton);
    let errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeVisible();
    userEvent.click(getByLabelText(errorMessage, 'Close'));
    expect(errorMessage).not.toBeVisible;
    userEvent.type(id, '1234567890');
    userEvent.click(submitButton);
    expect(screen.queryByRole('alert')).not.toBeVisible();
});

test('DrsMain SHOW form render', async () => {
    let {container} = render( 
        <MemoryRouter initialEntries={['/drs/1a570e4e-2489-4218-9333-f65549495872']}> 
            <DrsMain />
        </MemoryRouter>
    );
    await(waitFor(() => expect(screen.getByText('View DrsObject: 1a570e4e-2489-4218-9333-f65549495872')).toBeInTheDocument()));
    //expect(container.firstChild).toMatchSnapshot();
    //screen.debug();     
});