import React from 'react';
import renderer from 'react-test-renderer';
import DrsObjectRelatives from '../lib/components/drs/formComponents/DrsObjectRelatives';
import { unmountComponentAtNode } from "react-dom";
import {MemoryRouter} from 'react-router-dom'

let container = null;
let zeroRelatives = null;
let multipleRelatives = null;
let children = null;
let parents = null; 
let description = null;
let showForm = null;
let newForm = null;
let editForm = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    zeroRelatives = [];
    multipleRelatives = [
        {id: 'ID123', name: 'name123'},
        {id: 'ID456', name: 'name456'},
        {id: 'ID789', name: 'name789'}
    ]
    children = {
        relationship: 'drs_object_children',
        objectName: 'child',
        header: 'Bundle Children'
    }
    parents = {
        relationship: 'drs_object_parents',
        objectName: 'parent', 
        header: 'Bundle Parents'
    }
    description='This is a description for snapshot testing.'
    showForm = {readOnly: true, formViewType: 'SHOW'}
    newForm = {readOnly: false, formViewType: 'NEW'}
    editForm = {readOnly: false, formViewType: 'EDIT'}    
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('SHOW <DrsObjectRelatives/> should handle zero children', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives {...showForm} 
            sectionDescription={description}
            relatives={zeroRelatives} {...children} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

test('SHOW <DrsObjectRelatives/> should handle multiple children', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives {...showForm}
            sectionDescription={description}
            relatives={multipleRelatives} {...children} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

test('NEW <DrsObjectRelatives/> should handle zero children', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives {...newForm}
            sectionDescription={description}
            relatives={zeroRelatives} {...children} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

test('NEW <DrsObjectRelatives/> should handle multiple children', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives  {...newForm}
            sectionDescription={description}
            relatives={multipleRelatives} {...children} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

test('SHOW <DrsObjectRelatives/> should handle zero parents', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives {...showForm} 
            sectionDescription={description}
            relatives={zeroRelatives} {...parents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

test('SHOW <DrsObjectRelatives/> should handle multiple parents', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives {...showForm}
            sectionDescription={description}
            relatives={multipleRelatives} {...parents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

test('EDIT <DrsObjectRelatives/> should handle zero parents', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives {...editForm}
            sectionDescription={description}
            relatives={zeroRelatives} {...parents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})

test('EDIT <DrsObjectRelatives/> should handle multiple parents', () => {
    const drsObjectRelatives = renderer
    .create(
        <MemoryRouter>
            <DrsObjectRelatives  {...editForm}
            sectionDescription={description}
            relatives={multipleRelatives} {...parents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectRelatives).toMatchSnapshot();
})