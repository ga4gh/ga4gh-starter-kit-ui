import React from 'react';
import renderer from 'react-test-renderer';
import DrsObjectRelatives from '../DrsObjectRelatives';

let zeroRelatives = [];
let multipleRelatives = [
    {id: 'ID123', name: 'name123'},
    {id: 'ID456', name: 'name456'},
    {id: 'ID789', name: 'name789'}
]
let children = {
    relationship: 'drs_object_children',
    objectName: 'child',
    header: 'Bundle Children'
}
let parents = {
    relationship: 'drs_object_parents',
    objectName: 'parent', 
    header: 'Bundle Parents'
}
let description='This is a description for snapshot testing.'
let showForm = {readOnly: true, formViewType: 'SHOW'}
let newForm = {readOnly: false, formViewType: 'NEW'}
let editForm = {readOnly: false, formViewType: 'EDIT'}

test('SHOW <DrsObjectRelatives/> should handle zero children', () => {
    const drsObjectRelatives = renderer
    .create(<DrsObjectRelatives 
        {...showForm}
        sectionDescription={description}
        relatives={zeroRelatives}
        {...children} />)
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

/* test('SHOW <DrsObjectRelatives/> should handle multiple children', () => {
    const drsObjectRelatives = renderer
    .create(<DrsObjectRelatives 
        {...showForm}
        sectionDescription={description}
        relatives={multipleRelatives}
        {...children} />)
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
}) */

test('NEW <DrsObjectRelatives/> should handle zero children', () => {
    const drsObjectRelatives = renderer
    .create(<DrsObjectRelatives 
        {...newForm}
        sectionDescription={description}
        relatives={zeroRelatives}
        {...children} />)
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

/* test('NEW <DrsObjectRelatives/> should handle multiple children', () => {
    const drsObjectRelatives = renderer
    .create(<DrsObjectRelatives 
        {...newForm}
        sectionDescription={description}
        relatives={multipleRelatives}
        {...children} />)
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
}) */

test('EDIT <DrsObjectRelatives/> should handle zero children', () => {
    const drsObjectRelatives = renderer
    .create(<DrsObjectRelatives 
        {...editForm}
        sectionDescription={description}
        relatives={zeroRelatives}
        {...children} />)
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

/* test('EDIT <DrsObjectRelatives/> should handle multiple children', () => {
    const drsObjectRelatives = renderer
    .create(<DrsObjectRelatives 
        {...editForm}
        sectionDescription={description}
        relatives={multipleRelatives}
        {...children} />)
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
}) */