import React from 'react';
import renderer from 'react-test-renderer';
import FileAccessObjects from '../../../../lib/components/drs/formComponents/FileAccessObjects';

let zeroFileAccessObjects = [];
let multipleFileAccessObjects = [
    {path: 'path1'}, 
    {path: 'path2'}, 
    {path: 'path3'}
]

test('SHOW <FileAccessObjects /> should handle zero file access objects', () => {
    const fileAccessObjects = renderer
    .create(<FileAccessObjects readOnly={true} 
        file_access_objects={zeroFileAccessObjects} />)
    .toJSON();
    expect(fileAccessObjects).toMatchSnapshot();
});

test('SHOW <FileAccessObjects /> should handle multiple file access objects', () => {
    const fileAccessObjects = renderer
    .create(<FileAccessObjects readOnly={true}
         file_access_objects={multipleFileAccessObjects}
         />)
    .toJSON();
    expect(fileAccessObjects).toMatchSnapshot();
});

test('NEW and EDIT <FileAccessObjects /> should handle zero file access objects', () => {
    const fileAccessObjects = renderer
    .create(<FileAccessObjects readOnly={false} 
        file_access_objects={zeroFileAccessObjects} />)
    .toJSON();
    expect(fileAccessObjects).toMatchSnapshot();
});

test('NEW and EDIT <FileAccessObjects /> should handle multiple file access objects', () => {
    const fileAccessObjects = renderer
    .create(<FileAccessObjects readOnly={false}
         file_access_objects={multipleFileAccessObjects}
         />)
    .toJSON();
    expect(fileAccessObjects).toMatchSnapshot();
});