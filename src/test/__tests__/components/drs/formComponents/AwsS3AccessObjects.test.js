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
/* const mockSetRegion = jest.fn((index, newRegion) => {
    populatedListOfAwsS3AccessObjects[index].region = populatedListOfAwsS3AccessObjects[index].region.concat(newRegion);
});
const mockSetBucket = jest.fn((index, newBucket) => {
    populatedListOfAwsS3AccessObjects[index].bucket = populatedListOfAwsS3AccessObjects[index].bucket.concat(newBucket);
});
const mockSetKey = jest.fn((index, newKey) => {
    populatedListOfAwsS3AccessObjects[index].key = populatedListOfAwsS3AccessObjects[index].key.concat(newKey);
}); */

beforeEach(() => {
    emptyListOfAwsS3AccessObjects = [];
    populatedListOfAwsS3AccessObjects = [
        {region: 'region1', bucket: 'bucket1', key: 'key1'}, 
        {region: 'region2', bucket: 'bucket2', key: 'key2'}, 
        {region: 'region3', bucket: 'bucket3', key: 'key3'}, 
        {region: '', bucket: '', key: ''}
    ];
});

test('SHOW <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    let {container} = render(
        <AwsS3AccessObjects 
        readOnly={true}
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects}
        setAwsS3AccessObjectRegion={mockUpdateListObjectProperty}
        setAwsS3AccessObjectBucket={mockUpdateListObjectProperty}
        setAwsS3AccessObjectKey={mockUpdateListObjectProperty}
        removeAwsS3AccessObject={mockRemoveListItem}
        addAwsS3AccessObject={mockAddObjectToList} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('AWS S3 Access Points')).toBeInTheDocument();
    expect(screen.getByText('Represents objects stored in AWS S3 containing DRS Object bytes.')).toBeInTheDocument();
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockAddObjectToList.mock.calls.length).toBe(0);
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
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
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle zero AWS S3 access objects', () => {
    let {container} = render(
        <AwsS3AccessObjects 
        readOnly={false}
        aws_s3_access_objects={emptyListOfAwsS3AccessObjects}
        setAwsS3AccessObjectRegion={mockUpdateListObjectProperty}
        setAwsS3AccessObjectBucket={mockUpdateListObjectProperty}
        setAwsS3AccessObjectKey={mockUpdateListObjectProperty}
        removeAwsS3AccessObject={mockRemoveListItem}
        addAwsS3AccessObject={mockAddObjectToList} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('AWS S3 Access Points')).toBeInTheDocument();
    expect(screen.getByText('Represents objects stored in AWS S3 containing DRS Object bytes.')).toBeInTheDocument();
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    let {container} = render(
        <AwsS3AccessObjects 
        readOnly={false}
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects}
        setAwsS3AccessObjectRegion={mockUpdateListObjectProperty}
        setAwsS3AccessObjectBucket={mockUpdateListObjectProperty}
        setAwsS3AccessObjectKey={mockUpdateListObjectProperty}
        removeAwsS3AccessObject={mockRemoveListItem}
        addAwsS3AccessObject={mockAddObjectToList} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('AWS S3 Access Points')).toBeInTheDocument();
    expect(screen.getByText('Represents objects stored in AWS S3 containing DRS Object bytes.')).toBeInTheDocument();
    //one <AddItemButton /> component should be displayed
    const addItemButton = screen.getByLabelText('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    userEvent.click(addItemButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(2);
    //each field should display a value which can be edited
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
    userEvent.type(regionFields[3], 'new region');
    expect(mockUpdateListObjectProperty).toHaveBeenCalled();
    expect(mockUpdateListObjectProperty.mock.results[0].value).toBe(3);
    //each AwsS3AccessObject instance should display a <RemoveItemButton /> component
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