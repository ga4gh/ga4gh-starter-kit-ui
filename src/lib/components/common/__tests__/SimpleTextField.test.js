import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTextField from '../SimpleTextField';

test('SHOW <SimpleTextField />', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField 
        readOnly={true} 
        property='snapshot_test' 
        propertyName='Snapshot Test' 
        label='Snapshot Test'
        description='This is a description for a snapshot test.' />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
});

test('NEW and EDIT <SimpleTextField />', () => {
    const simpleTextField = renderer
    .create(<SimpleTextField 
        readOnly={false} 
        property='snapshot_test' 
        propertyName='Snapshot Test' 
        label='Snapshot Test'
        description='This is a description for a snapshot test.' />)
    .toJSON();
    expect(simpleTextField).toMatchSnapshot();
});