import React from 'react';
import renderer from 'react-test-renderer';
import DrsObjectParents from '../DrsObjectParents';

let zeroDrsObjectParents=[];

test('SHOW <DrsObjectParents /> should handle zero child objects', () => {
    const drsObjectParents = renderer
    .create(<DrsObjectParents 
    readOnly={true} 
    formViewType='SHOW'
    drs_object_parents={zeroDrsObjectParents} />)
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});

test('NEW <DrsObjectParents /> should handle zero child objects', () => {
    const drsObjectParents = renderer
    .create(<DrsObjectParents 
    readOnly={false} 
    formViewType='NEW'
    drs_object_parents={zeroDrsObjectParents} />)
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});

test('EDIT <DrsObjectParents /> should handle zero child objects', () => {
    const drsObjectParents = renderer
    .create(<DrsObjectParents 
    readOnly={false} 
    formViewType='EDIT'
    drs_object_parents={zeroDrsObjectParents} />)
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});