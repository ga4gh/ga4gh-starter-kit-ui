import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AwsS3AccessObjects from '../../../../../lib/components/drs/formComponents/AwsS3AccessObjects';
import {
    mockAddObjectToList, 
    mockRemoveListItem,
    mockUpdateListObjectProperty
} from '../../../../resources/MockFunctions';

let emptyListOfAwsS3AccessObjects = null;
let populatedListOfAwsS3AccessObjects = null;
let callbackFunctions = null;

beforeEach(() => {
    emptyListOfAwsS3AccessObjects = [];
    populatedListOfAwsS3AccessObjects = [
        {region: 'region1', bucket: 'bucket1', key: 'key1'}, 
        {region: '', bucket: 'bucket2', key: 'key2'}, 
        {region: 'region3', bucket: '', key: 'key3'}, 
        {region: 'region4', bucket: 'bucket4', key: ''}
    ];
    callbackFunctions = {
        setAwsS3AccessObjectRegion: mockUpdateListObjectProperty,
        setAwsS3AccessObjectBucket: mockUpdateListObjectProperty,
        setAwsS3AccessObjectKey: mockUpdateListObjectProperty,
        removeAwsS3AccessObject: mockRemoveListItem,
        addAwsS3AccessObject: mockAddObjectToList
    }
});

afterEach(() => {
    mockUpdateListObjectProperty.mockClear();
    mockRemoveListItem.mockClear();
    mockAddObjectToList.mockClear();
})

test('SHOW <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    let {container} = render(
        <AwsS3AccessObjects readOnly={true} {...callbackFunctions} 
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('AWS S3 Access Points')).toBeInTheDocument();
    expect(screen.getByText('Represents objects stored in AWS S3 containing DRS Object bytes.')).toBeInTheDocument();

    // add and remove buttons should not be displayed, callback functions should not be called
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockAddObjectToList.mock.calls.length).toBe(0);
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);

    // each parameter field should display the correct value and should be read only
    let regionFields = screen.getAllByLabelText('Region');
    regionFields.forEach((region, index) => {
        expect(region).toHaveValue(populatedListOfAwsS3AccessObjects[index].region);
        expect(region).toHaveAttribute('readonly');
        userEvent.type(region, 'test value');
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
    let bucketFields = screen.getAllByLabelText('Bucket');
    bucketFields.forEach((bucket, index) => {
        expect(bucket).toHaveValue(populatedListOfAwsS3AccessObjects[index].bucket);
        expect(bucket).toHaveAttribute('readonly');
        userEvent.type(bucket, 'test value');
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
    let keyFields = screen.getAllByLabelText('Key');
    keyFields.forEach((key, index) => {
        expect(key).toHaveValue(populatedListOfAwsS3AccessObjects[index].key);
        expect(key).toHaveAttribute('readonly');
        userEvent.type(key, 'test value');
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle zero AWS S3 access objects', () => {
    let {container} = render(
        <AwsS3AccessObjects readOnly={false} {...callbackFunctions}
        aws_s3_access_objects={emptyListOfAwsS3AccessObjects} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('AWS S3 Access Points')).toBeInTheDocument();
    expect(screen.getByText('Represents objects stored in AWS S3 containing DRS Object bytes.')).toBeInTheDocument();

    // clickable add item button should be displayed
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);

    // remove item buttons and parameter text fields should not be displayed
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    let {container} = render(
        <AwsS3AccessObjects readOnly={false} {...callbackFunctions}
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('AWS S3 Access Points')).toBeInTheDocument();
    expect(screen.getByText('Represents objects stored in AWS S3 containing DRS Object bytes.')).toBeInTheDocument();

    // clickable add item button should be displayed
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);

    // each field should display the correct value
    let regionFields = screen.getAllByLabelText('Region');
    regionFields.forEach((region, index) => {
        expect(region).toHaveValue(populatedListOfAwsS3AccessObjects[index].region);
    });
    let bucketFields = screen.getAllByLabelText('Bucket');
    bucketFields.forEach((bucket, index) => {
        expect(bucket).toHaveValue(populatedListOfAwsS3AccessObjects[index].bucket);
    });
    let keyFields = screen.getAllByLabelText('Key');
    keyFields.forEach((key, index) => {
        expect(key).toHaveValue(populatedListOfAwsS3AccessObjects[index].key);
    });

    // each parameter field can be edited and passes the correct index to the callback
    userEvent.type(regionFields[1], 'new region');
    expect(mockUpdateListObjectProperty).toHaveBeenCalled();
    expect(mockUpdateListObjectProperty.mock.results[0].value).toBe(1);
    mockUpdateListObjectProperty.mockClear();
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);

    userEvent.type(bucketFields[2], 'new bucket');
    expect(mockUpdateListObjectProperty).toHaveBeenCalled();
    expect(mockUpdateListObjectProperty.mock.results[0].value).toBe(2);
    mockUpdateListObjectProperty.mockClear();    
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);

    userEvent.type(keyFields[3], 'new key');
    expect(mockUpdateListObjectProperty).toHaveBeenCalled();
    expect(mockUpdateListObjectProperty.mock.results[0].value).toBe(3);
    mockUpdateListObjectProperty.mockClear();    
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    
    //each AwsS3AccessObject instance should display a remove item button
    const removeItemButtons = screen.getAllByLabelText('remove-item-button');
    removeItemButtons.forEach((removeItemButton, index) => {
        expect(removeItemButton).toBeInTheDocument();
        userEvent.click(removeItemButton);
        //each removeItemButton should pass the correct index to the callback function
        expect(mockRemoveListItem.mock.calls[index][0]).toBe(index);
        expect(mockRemoveListItem.mock.results[index].value).toBe(index);
    });
    expect(mockRemoveListItem.mock.calls.length).toBe(removeItemButtons.length);
});