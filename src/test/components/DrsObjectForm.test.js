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
} from '../../components/drs/DrsObjectForm';

test('SpaceDividerSnapshot', () => {
    const spaceDivider = renderer
    .create(<SpaceDivider />)
    .toJSON();
    expect(spaceDivider).toMatchSnapshot();
});

test('AddPropertyButtonSnapshot', () => {
    const addPropertyButton = renderer
    .create(<AddPropertyButton />)
    .toJSON();
    expect(addPropertyButton).toMatchSnapshot();
});

test('RemovePropertyButtonSnapshot', () => {
    const removePropertyButton = renderer
    .create(<RemovePropertyButton />)
    .toJSON();
    expect(removePropertyButton).toMatchSnapshot();
});

test('BundleBlobRadioSnapshot', () => {
    const bundleBlobRadio = renderer
    .create(<BundleBlobRadio />)
    .toJSON();
    expect(bundleBlobRadio).toMatchSnapshot();
});

test('GenerateIdButtonSnapshot', () => {
    const generateIdButton = renderer
    .create(<GenerateIdButton />)
    .toJSON();
    expect(generateIdButton).toMatchSnapshot();
});

//Id

test('SimpleTextFieldSnapshot', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
});

//DateTimeField

test('MimeTypeSnapshot', () => {
    const mimeType = renderer
    .create(<MimeType />)
    .toJSON();
    expect(mimeType).toMatchSnapshot();
});

test('SizeSnapshot', () => {
    const size = renderer
    .create(<Size />)
    .toJSON();
    expect(size).toMatchSnapshot();
});

test('AliasesSnapshot', () => {
    const aliases = renderer
    .create(<Aliases />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});

test('ChecksumsSnapshot', () => {
    const checksums = renderer
    .create(<Checksums />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

//VerifyIdButton

test('RelatedDrsObjectButtonSnapshot', () => {
    const relatedDrsObjectButton = renderer
    .create(<RelatedDrsObjectButton />)
    .toJSON();
    expect(relatedDrsObjectButton).toMatchSnapshot();
});

test('RelatedDrsObjectSnapshot', () => {
    const relatedDrsObjects = renderer
    .create(<RelatedDrsObject />)
    .toJSON();
    expect(relatedDrsObjects).toMatchSnapshot();
});

//AccessPoints

test('FileAccessObjectsSnapshot', () => {
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
});

test('ErrorMessageSnapshot', () => {
    const errorMessage = renderer
    .create(<ErrorMessage />)
    .toJSON();
    expect(errorMessage).toMatchSnapshot();
});

test('InvalidDrsObjectMessageSnapshot', () => {
    const invalidDrsObjectMessage = renderer
    .create(<InvalidDrsObjectMessage />)
    .toJSON();
    expect(invalidDrsObjectMessage).toMatchSnapshot();
});

//SubmitButton

//DrsObjectForm