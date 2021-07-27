import React from 'react';
import renderer from 'react-test-renderer';
import Checksums from '../lib/components/drs/formComponents/Checksums';
import { unmountComponentAtNode } from "react-dom";

let container = null;
let noTypesSelected = null;
let allTypesSelected = null;
let someTypesSelected = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    noTypesSelected = {
        displayChecksumTypes: { md5: true, sha1: true, sha256: true }, 
        checksums: []
    }
    allTypesSelected = {
        displayChecksumTypes: { md5: 0, sha1: 1, sha256: 2 },
        checksums: [
            {checksum: 123, type: 'md5'}, 
            {checksum: 456, type: 'sha1'},
            {checksum: 789, type: 'sha256'}
        ]
    }
    someTypesSelected = {
        displayChecksumTypes: { md5: 0, sha1: true, sha256: 1 },
        checksums: [
            {checksum: 123, type: 'md5'},
            {checksum: 789, type: 'sha256'}
        ]
    }
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


test('SHOW <Checksums /> should handle no types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={true} {...noTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle all types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={true} {...allTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('SHOW <Checksums /> should handle some types disabled', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={true} {...someTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('NEW and EDIT <Checksums /> should handle no types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={false} {...noTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('NEW and EDIT <Checksums /> should handle all types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={false} {...allTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});

test('NEW and EDIT <Checksums /> should handle some types selected', () => {
    const checksums = renderer
    .create(<Checksums 
    readOnly={false} {...someTypesSelected} />)
    .toJSON();
    expect(checksums).toMatchSnapshot();
});