import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTextField from '../lib/components/common/SimpleTextField';

let simpleTextFieldProps={
    id: 'SnapshotTestSimpleTextField',
    label: 'Snapshot Test',
    name: 'Snapshot Test',
    value: 'Snapshot test simple text field value.',
    helperText: 'This is a description for a snapshot test.'
}

test('SHOW <SimpleTextField /> handles populated field', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField 
        readOnly={true} value='Snapshot test simple text field value.'
        {...simpleTextFieldProps} />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
});

test('SHOW <SimpleTextField /> handles empty field', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField 
        readOnly={true} value='' {...simpleTextFieldProps} />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
});

test('NEW and EDIT <SimpleTextField /> handles populated field', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField 
        readOnly={false} value='Snapshot test simple text field value.'
        {...simpleTextFieldProps} />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
}); 

test('NEW and EDIT <SimpleTextField /> handles empty field', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField 
        readOnly={false} value=''
        {...simpleTextFieldProps} />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
});