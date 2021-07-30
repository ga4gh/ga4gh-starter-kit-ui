import React from 'react';
import renderer from 'react-test-renderer';
import DrsObjectChildren from '../../../../../lib/components/drs/formComponents/DrsObjectChildren';
import { unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from 'react-router';

let container = null;
let zeroDrsObjectChildren = null;
let multipleDrsObjectChildren = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    zeroDrsObjectChildren=[];
    multipleDrsObjectChildren=[
        {id: '123'},
        {id: '456'},
        {id: '789'}
    ]
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


test('SHOW <DrsObjectChildren /> should handle zero child objects', () => {
    const drsObjectChildren = renderer
    .create(
        <MemoryRouter>
            <DrsObjectChildren readOnly={true} formViewType='SHOW'
            drs_object_children={zeroDrsObjectChildren} />            
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

test('SHOW <DrsObjectChildren /> should handle multiple child objects', () => {
    const drsObjectChildren = renderer
    .create(
        <MemoryRouter>
            <DrsObjectChildren readOnly={true} formViewType='SHOW'
            drs_object_children={multipleDrsObjectChildren} />    
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

test('NEW <DrsObjectChildren /> should handle zero child objects', () => {
    const drsObjectChildren = renderer
    .create(
        <MemoryRouter>
            <DrsObjectChildren readOnly={false} formViewType='NEW'
            drs_object_children={zeroDrsObjectChildren} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

test('NEW <DrsObjectChildren /> should handle multiple child objects', () => {
    const drsObjectChildren = renderer
    .create(
        <MemoryRouter>
            <DrsObjectChildren readOnly={false} formViewType='NEW'
            drs_object_children={multipleDrsObjectChildren} />   
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

test('EDIT <DrsObjectChildren /> should handle zero child objects', () => {
    const drsObjectChildren = renderer
    .create(
        <MemoryRouter>
            <DrsObjectChildren readOnly={false} formViewType='EDIT'
            drs_object_children={zeroDrsObjectChildren} />   
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});

test('EDIT <DrsObjectChildren /> should handle multiple child objects', () => {
    const drsObjectChildren = renderer
    .create(
        <MemoryRouter>
            <DrsObjectChildren readOnly={false} formViewType='EDIT'
            drs_object_children={multipleDrsObjectChildren} />    
        </MemoryRouter>
        )
    .toJSON();
    expect(drsObjectChildren).toMatchSnapshot();
});