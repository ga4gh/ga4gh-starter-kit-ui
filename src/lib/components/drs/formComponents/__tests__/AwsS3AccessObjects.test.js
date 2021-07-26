import React from 'react';
import renderer from 'react-test-renderer';
import AwsS3AccessObjects from '../AwsS3AccessObjects';

let emptyListOfAwsS3AccessObjects = [];
let populatedListOfAwsS3AccessObjects = [
    {region: 'region1', bucket: 'bucket1', key: 'key1'}, 
    {region: 'region2', bucket: 'bucket2', key: 'key2'}, 
    {region: 'region3', bucket: 'bucket3', key: 'key3'}
];

test('SHOW <AwsS3AccessObjects /> should handle 0 AWS S3 access objects', () => {
    const awsS3AccessObjects = renderer
    .create(<AwsS3AccessObjects 
        readOnly={true}
        aws_s3_access_objects={emptyListOfAwsS3AccessObjects}/>)
    .toJSON();
    expect(awsS3AccessObjects).toMatchSnapshot();
});

test('SHOW <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    const awsS3AccessObjects = renderer
    .create(<AwsS3AccessObjects 
        readOnly={true}
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects}/>)
    .toJSON();
    expect(awsS3AccessObjects).toMatchSnapshot();
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle 0 AWS S3 access objects', () => {
    const awsS3AccessObjects = renderer
    .create(<AwsS3AccessObjects 
        readOnly={false}
        aws_s3_access_objects={emptyListOfAwsS3AccessObjects}/>)
    .toJSON();
    expect(awsS3AccessObjects).toMatchSnapshot();
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    const awsS3AccessObjects = renderer
    .create(<AwsS3AccessObjects 
        readOnly={false}
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects}/>)
    .toJSON();
    expect(awsS3AccessObjects).toMatchSnapshot();
});