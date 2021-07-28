import React from 'react';
import renderer from 'react-test-renderer';
import Version from '../../../../lib/components/drs/formComponents/Version';

test('SHOW <Version /> should handle populated field', () => {
    const version = renderer
    .create(<Version 
    readOnly={true} version='1.0.0'/>)
    .toJSON();
    expect(version).toMatchSnapshot();
});

test('SHOW <Version /> should handle empty field', () => {
    const version = renderer
    .create(<Version 
    readOnly={true} version=''/>)
    .toJSON();
    expect(version).toMatchSnapshot();
});

test('NEW and EDIT <Version /> should handle populated field', () => {
    const version = renderer
    .create(<Version 
    readOnly={false} version='1.0.0'/>)
    .toJSON();
    expect(version).toMatchSnapshot();
});

test('NEW and EDIT <Version /> should handle empty field', () => {
    const version = renderer
    .create(<Version 
    readOnly={false} version=''/>)
    .toJSON();
    expect(version).toMatchSnapshot();
});