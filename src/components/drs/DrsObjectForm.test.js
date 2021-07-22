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

test('SHOW <Id />', () => {
    const id = renderer.create(<Id readOnlyId={true} activeDrsObject={{id: ''}} />)
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

//DateTimeField

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
        md5: {
        disabled: false
        },
        sha1: {
            disabled: false
        },
        sha256: {
            disabled: false
        }
    }} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with all types enabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnlyForm={true} 
    isBundle={false}
    checksumTypes={{
        md5: {
            disabled: false
        },
        sha1: {
            disabled: false
        },
        sha256: {
            disabled: false
        }
    }} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with all types disabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnlyForm={true} 
    isBundle={false}
    checksumTypes={{
        md5: {
            disabled: true
        },
        sha1: {
            disabled: true
        },
        sha256: {
            disabled: true
        }
    }} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with some types disabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnlyForm={true} 
    isBundle={false}
    checksumTypes={{
        md5: {
            disabled: true
        },
        sha1: {
            disabled: false
        },
        sha256: {
            disabled: true
        }
    }} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

//VerifyIdButton

//RelatedDrsObjectButton

/* test('SHOW <RelatedDrsObject /> should handle blobs with children', () => {
    const relatedDrsObjects = renderer
    .create(<RelatedDrsObject />)
    .toJSON();
    expect(relatedDrsObjects).toMatchSnapshot();
}); */

//AccessPoints

/* test('FileAccessObjectsSnapshot', () => {
    const fileAccessObjects = renderer
    .create(<FileAccessObjects />)
    .toJSON();
    expect(fileAccessObjects).toMatchSnapshot();
});

test('AwsS3AccessObjectsSnapshot', () => {
    const awsS3AccessObjects = renderer
    .create(<AwsS3AccessObjects />)
    .toJSON();
    expect(awsS3AccessObjects).toMatchSnapshot();
}); */

//SubmitButton

//DrsObjectForm