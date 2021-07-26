import React from 'react';
import renderer from 'react-test-renderer';
import DrsObjectChildren from '../DrsObjectChildren';

let zeroDrsObjectChildren=[];
let multipleDrsObjectChildren=[
    {id: '123'},
    {id: '456'},
    {id: '789'}
]

test('SHOW <DrsObjectChildren /> should handle zero child objects', () => {
    const drsObjectChildren = renderer
    .create(<DrsObjectChildren 
    readOnly={true} 
    formViewType='SHOW'
    drs_object_children={zeroDrsObjectChildren} />)
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

/* test('SHOW <DrsObjectChildren /> should handle multiple child objects', () => {
    const drsObjectChildren = renderer
    .create(<DrsObjectChildren 
    readOnly={true} 
    formViewType='SHOW'
    drs_object_children={multipleDrsObjectChildren} />)
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
}); */

test('NEW <DrsObjectChildren /> should handle zero child objects', () => {
    const drsObjectChildren = renderer
    .create(<DrsObjectChildren 
    readOnly={false} 
    formViewType='NEW'
    drs_object_children={zeroDrsObjectChildren} />)
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

/* test('NEW <DrsObjectChildren /> should handle multiple child objects', () => {
    const drsObjectChildren = renderer
    .create(<DrsObjectChildren 
    readOnly={false} 
    formViewType='NEW'
    drs_object_children={multipleDrsObjectChildren} />)
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
}); */

test('EDIT <DrsObjectChildren /> should handle zero child objects', () => {
    const drsObjectChildren = renderer
    .create(<DrsObjectChildren 
    readOnly={false} 
    formViewType='EDIT'
    drs_object_children={zeroDrsObjectChildren} />)
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

/* test('EDIT <DrsObjectChildren /> should handle multiple child objects', () => {
    const drsObjectChildren = renderer
    .create(<DrsObjectChildren 
    readOnly={false} 
    formViewType='EDIT'
    drs_object_children={multipleDrsObjectChildren} />)
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
}); */