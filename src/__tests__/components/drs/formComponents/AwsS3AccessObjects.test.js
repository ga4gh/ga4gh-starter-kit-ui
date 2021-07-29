import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AwsS3AccessObjects from '../../../../lib/components/drs/formComponents/AwsS3AccessObjects';

let emptyListOfAwsS3AccessObjects = null;
let populatedListOfAwsS3AccessObjects = null;
beforeEach(() => {
    emptyListOfAwsS3AccessObjects = [];
    populatedListOfAwsS3AccessObjects = [
        {region: 'region1', bucket: 'bucket1', key: 'key1'}, 
        {region: 'region2', bucket: 'bucket2', key: 'key2'}, 
        {region: 'region3', bucket: 'bucket3', key: 'key3'}
    ];
});

test('SHOW <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    let {container} = render(
        <AwsS3AccessObjects readOnly={true}
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects}/>
    );
    expect(container.firstChild).toMatchSnapshot();
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle 0 AWS S3 access objects', () => {
    let {container} = render(<AwsS3AccessObjects 
        readOnly={false}
        aws_s3_access_objects={emptyListOfAwsS3AccessObjects}/>
    );
    expect(container.firstChild).toMatchSnapshot();
});

test('NEW and EDIT <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    let {container} = render(<AwsS3AccessObjects 
        readOnly={false}
        aws_s3_access_objects={populatedListOfAwsS3AccessObjects}/>
    );
    expect(container.firstChild).toMatchSnapshot();
});