import React from 'react';
import renderer from 'react-test-renderer';
import Checksums from '../Checksums';

let noTypesSelected = {
    displayChecksumTypes: {
        md5: {disabled: false},
        sha1: {disabled: false},
        sha256: {disabled: false}
    },
    checksums: []
}

let allTypesSelected = {
    displayChecksumTypes: {
        md5: {disabled: true},
        sha1: {disabled: true},
        sha256: {disabled: true}
    },
    checksums: [
        {checksum: 123, type: 'md5'}, 
        {checksum: 456, type: 'sha1'},
        {checksum: 789, type: 'sha256'}
    ]
}

let someTypesSelected = {
    displayChecksumTypes: {
        md5: {disabled: true},
        sha1: {disabled: false},
        sha256: {disabled: true}
    },
    checksums: [
        {checksum: 123, type: 'md5'},
        {checksum: 789, type: 'sha256'}
    ]
}

test('SHOW <Checksums /> should handle blobs with no types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={true} {...noTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with all types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={true} {...allTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle blobs with some types disabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={true} {...someTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('NEW and EDIT <Checksums /> should handle blobs with no types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={false} {...noTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('NEW and EDIT <Checksums /> should handle blobs with all types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={false} {...allTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('NEW and EDIT <Checksums /> should handle blobs with some types disabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={false} {...someTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});