import React from 'react';
import renderer from 'react-test-renderer';
import { 
    SpaceDivider, 
    AddPropertyButton, 
    RemovePropertyButton, 
    BundleBlobRadio, 
    GenerateIdButton, 
    Id, 
    SimpleTextField, 
    DateTimeField, 
    MimeType, 
    Size, 
    Aliases, 
    Checksums, 
    VerifyIdButton, 
    RelatedDrsObjectButton, 
    RelatedDrsObject, 
    AccessPoints, 
    FileAccessObjects, 
    AwsS3AccessObjects, 
    ErrorMessage, 
    InvalidDrsObjectMessage, 
    SubmitButton, 
    DrsObjectForm
} from './DrsObjectForm';

test('<SpaceDivider />', () => {
    const spaceDivider = renderer
    .create(<SpaceDivider />)
    .toJSON();
    expect(spaceDivider).toMatchSnapshot();
});

/* SHOW Form Snapshot Tests */

test('SHOW <AddPropertyButton />', () => {
    const addPropertyButton = renderer
    .create(<AddPropertyButton readOnlyForm={true} objectName={'snapshot test'} />)
    .toJSON();
    expect(addPropertyButton).toMatchSnapshot();
});

test('SHOW <RemovePropertyButton />', () => {
    const removePropertyButton = renderer
    .create(<RemovePropertyButton readOnlyForm={true} objectName={'snapshot test'} />)
    .toJSON();
    expect(removePropertyButton).toMatchSnapshot();
});

test('SHOW <BundleBlobRadio /> should handle blob selection', () => {
    const bundleBlobRadio = renderer
    .create(<BundleBlobRadio isBundle={false} readOnlyForm={true} />)
    .toJSON();
    expect(bundleBlobRadio).toMatchSnapshot();
});

test('SHOW <BundleBlobRadio /> should handle bundle selection', () => {
    const bundleBlobRadio = renderer
    .create(<BundleBlobRadio isBundle={true} readOnlyForm={true} />)
    .toJSON();
    expect(bundleBlobRadio).toMatchSnapshot();
});

test('SHOW <GenerateIdButton />', () => {
    const generateIdButton = renderer
    .create(<GenerateIdButton readOnlyForm={true} />)
    .toJSON();
    expect(generateIdButton).toMatchSnapshot();
});

test('SHOW <Id /> should handle empty id field', () => {
    const id = renderer.create(<Id readOnlyId={true} activeDrsObject={{id: ''}} />)
    .toJSON();
    expect(id).toMatchSnapshot();
});

test('SHOW <Id /> should handle populated id field', () => {
    const id = renderer.create(<Id readOnlyId={true} activeDrsObject={{id: '1234567890'}} />)
    .toJSON();
    expect(id).toMatchSnapshot();
});

test('SHOW <SimpleTextField />', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField 
        readOnlyForm={true} 
        property='snapshot_test' 
        propertyName='Snapshot Test' 
        label='Snapshot Test'
        description='This is a description for a snapshot test.' />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
});

//will need to use mock functions to test different timezones, morning, evening, current time, etc.
test('SHOW <DateTimeField /> should handle any date and time', () => {
    const dateTimeField = renderer.create(<DateTimeField 
        readOnlyForm={true}
        value='2021-07-22T13:00:00Z'
        propertyName='Date-Time Snapshot Test'
        label='Date-Time Snapshot Test'
        description='This is a date-time field description for a snapshot test.' />)
    .toJSON();
    expect(dateTimeField).toMatchSnapshot();
})

test('SHOW <MimeType /> should handle blobs', () => {
    const mimeType = renderer
    .create(<MimeType 
        readOnlyForm={true} 
        isBundle={false} 
        mimeType='test blob MIME Type' />)
    .toJSON();
    expect(mimeType).toMatchSnapshot();
});

test('SHOW <MimeType /> should handle bundles', () => {
    const mimeType = renderer
    .create(<MimeType 
        readOnlyForm={true} 
        isBundle={true} 
        mimeType='test bundle MIME Type' />)
    .toJSON();
    expect(mimeType).toMatchSnapshot();
});

test('SHOW <Size /> should handle blobs', () => {
    const size = renderer
    .create(<Size 
        readOnlyForm={true}
        isBundle={false}
        size={1000} />)
    .toJSON();
    expect(size).toMatchSnapshot();
});

test('SHOW <Size /> should handle bundles', () => {
    const size = renderer
    .create(<Size 
        readOnlyForm={true}
        isBundle={true}
        size={1000} />)
    .toJSON();
    expect(size).toMatchSnapshot();
});

test('SHOW <Size /> should handle empty size prop', () => {
    const size = renderer
    .create(<Size 
        readOnlyForm={true}
        isBundle={false}
        size='' />)
    .toJSON();
    expect(size).toMatchSnapshot();
});

test('SHOW <Aliases /> should handle 0 aliases', () => {
    const aliases = renderer
    .create(<Aliases
        readOnlyForm={true}
        aliases={[]} />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});

test('SHOW <Aliases /> should handle 1 alias', () => {
    const aliases = renderer
    .create(<Aliases
        readOnlyForm={true}
        aliases={['alias1']} />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});

test('SHOW <Aliases /> should handle multiple aliases', () => {
    const aliases = renderer
    .create(<Aliases
        readOnlyForm={true}
        aliases={['alias1', 'alias2', 'alias3']} />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle bundles', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnlyForm={true} 
    isBundle={true}
    checksumTypes={{
        md5: {disabled: false},
        sha1: {disabled: false},
        sha256: {disabled: false}
    }}
    checksums={[]} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with all types enabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnlyForm={true} 
    isBundle={false}
    checksumTypes={{
        md5: {disabled: false},
        sha1: {disabled: false},
        sha256: {disabled: false}
    }}
    checksums={[]} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with all types disabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnlyForm={true} 
    isBundle={false}
    checksumTypes={{
        md5: {disabled: true},
        sha1: {disabled: true},
        sha256: {disabled: true}
    }}
    checksums={[
        {checksum: 123, type: 'md5'}, 
        {checksum: 456, type: 'sha1'},
        {checksum: 789, type: 'sha256'}
    ]} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with some types disabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnlyForm={true} 
    isBundle={false}
    checksumTypes={{
        md5: {disabled: true},
        sha1: {disabled: false},
        sha256: {disabled: true}
    }}
    checksums={[
        {checksum: 123, type: 'md5'},
        {checksum: 789, type: 'sha256'}
    ]} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

//Need to test this component with verification functionality
/* test('SHOW <RelatedDrsObject /> should handle bundles with children', () => {
    const relatedDrsObjects = renderer
    .create(<RelatedDrsObject
        readOnlyForm={true}
        relatedDrsObjects={[
            {id: 'child_drs_1'}, 
            {id: 'child_drs_2'}, 
            {id: 'child_drs_3'}
        ]}
        relationship='drs_object_children'
        isBundle={true}
        sectionDescription='This is a description for a snapshot test.'
        objectName='related drs object snapshot test'
        header='Snapshot Test Header'/>)
    .toJSON();
    expect(relatedDrsObjects).toMatchSnapshot();
}); */

test('SHOW <AccessPoints /> should handle bundles', () => {
    const accessPoints = renderer
    .create(<AccessPoints
        readOnlyForm={true}
        isBundle={true}
        activeDrsObject={{
            file_access_objects: [
                {path: 'path1'}, 
                {path: 'path2'}, 
                {path: 'path3'}
            ],
            aws_s3_access_objects: [
                {
                    region: 'region1',
                    bucket: 'bucket1', 
                    key: 'key1'
                }, 
                {
                    region: 'region2',
                    bucket: 'bucket2', 
                    key: 'key2'
                }, 
                {
                    region: 'region3',
                    bucket: 'bucket3', 
                    key: 'key3'
                }
            ]
        }} />)
    .toJSON();
    expect(accessPoints).toMatchSnapshot();
});

test('SHOW <AccessPoints /> should handle blobs', () => {
    const accessPoints = renderer
    .create(<AccessPoints
        readOnlyForm={true}
        isBundle={false}
        activeDrsObject={{
            file_access_objects: [
                {path: 'path1'}, 
                {path: 'path2'}, 
                {path: 'path3'}
            ],
            aws_s3_access_objects: [
                {
                    region: 'region1',
                    bucket: 'bucket1', 
                    key: 'key1'
                }, 
                {
                    region: 'region2',
                    bucket: 'bucket2', 
                    key: 'key2'
                }, 
                {
                    region: 'region3',
                    bucket: 'bucket3', 
                    key: 'key3'
                }
            ]
        }} />)
    .toJSON();
    expect(accessPoints).toMatchSnapshot();
});

test('SHOW <AccessPoints /> should handle blobs without file_access_objects', () => {
    const accessPoints = renderer
    .create(<AccessPoints
        readOnlyForm={true}
        isBundle={false}
        activeDrsObject={{
            file_access_objects: [],
            aws_s3_access_objects: [
                {
                    region: 'region1',
                    bucket: 'bucket1', 
                    key: 'key1'
                }, 
                {
                    region: 'region2',
                    bucket: 'bucket2', 
                    key: 'key2'
                }, 
                {
                    region: 'region3',
                    bucket: 'bucket3', 
                    key: 'key3'
                }
            ]
        }} />)
    .toJSON();
    expect(accessPoints).toMatchSnapshot();
});

test('SHOW <AccessPoints /> should handle blobs without aws_s3_access_objects', () => {
    const accessPoints = renderer
    .create(<AccessPoints
        readOnlyForm={true}
        isBundle={true}
        activeDrsObject={{
            file_access_objects: [
                {path: 'path1'}, 
                {path: 'path2'}, 
                {path: 'path3'}
            ],
            aws_s3_access_objects: []
        }} />)
    .toJSON();
    expect(accessPoints).toMatchSnapshot();
});

test('SHOW <AccessPoints /> should handle blobs without any access objects', () => {
    const accessPoints = renderer
    .create(<AccessPoints
        readOnlyForm={true}
        isBundle={true}
        activeDrsObject={{
            file_access_objects: [],
            aws_s3_access_objects: []
        }} />)
    .toJSON();
    expect(accessPoints).toMatchSnapshot();
});

test('SHOW <FileAccessObjects /> should handle 0 file access objects', () => {
    const fileAccessObjects = renderer
    .create(<FileAccessObjects readOnlyForm={true} fileAccessObjects={[]} />)
    .toJSON();
    expect(fileAccessObjects).toMatchSnapshot();
});

test('SHOW <FileAccessObjects /> should handle multiple file access objects', () => {
    const fileAccessObjects = renderer
    .create(<FileAccessObjects
         readOnlyForm={true}
         fileAccessObjects={[
            {path: 'path1'}, 
            {path: 'path2'}, 
            {path: 'path3'}
        ]}
         />)
    .toJSON();
    expect(fileAccessObjects).toMatchSnapshot();
});

test('SHOW <AwsS3AccessObjects /> should handle 0 AWS S3 access objects', () => {
    const awsS3AccessObjects = renderer
    .create(<AwsS3AccessObjects readOnlyForm awsS3AccessObjects={[]}/>)
    .toJSON();
    expect(awsS3AccessObjects).toMatchSnapshot();
});

test('SHOW <AwsS3AccessObjects /> should handle multiple AWS S3 access objects', () => {
    const awsS3AccessObjects = renderer
    .create(<AwsS3AccessObjects readOnlyForm awsS3AccessObjects={[
        {
            region: 'region1',
            bucket: 'bucket1', 
            key: 'key1'
        }, 
        {
            region: 'region2',
            bucket: 'bucket2', 
            key: 'key2'
        }, 
        {
            region: 'region3',
            bucket: 'bucket3', 
            key: 'key3'
        }
    ]}/>)
    .toJSON();
    expect(awsS3AccessObjects).toMatchSnapshot();
});