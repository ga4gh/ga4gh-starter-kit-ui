import React from 'react';
import renderer from 'react-test-renderer';
import DrsObjectParents from '../../../../../lib/components/drs/formComponents/DrsObjectParents';
import { unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from 'react-router';

let container = null;
let zeroDrsObjectParents = null;
let multipleDrsObjectParents = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    zeroDrsObjectParents=[];
    multipleDrsObjectParents=[
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

test('SHOW <DrsObjectParents /> should handle zero child objects', () => {
    const drsObjectParents = renderer
    .create(
        <MemoryRouter>
            <DrsObjectParents readOnly={true} formViewType='SHOW'
            drs_object_parents={zeroDrsObjectParents} />
        </MemoryRouter>
        )
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});

test('SHOW <DrsObjectParents /> should handle multiple child objects', () => {
    const drsObjectParents = renderer
    .create(
        <MemoryRouter>
            <DrsObjectParents readOnly={true} formViewType='SHOW'
            drs_object_parents={multipleDrsObjectParents} />
        </MemoryRouter>
        )
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});

test('NEW <DrsObjectParents /> should handle zero child objects', () => {
    const drsObjectParents = renderer
    .create(
        <MemoryRouter>
            <DrsObjectParents readOnly={false} formViewType='NEW'
             drs_object_parents={zeroDrsObjectParents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});

test('NEW <DrsObjectParents /> should handle multiple child objects', () => {
    const drsObjectParents = renderer
    .create(
        <MemoryRouter>
            <DrsObjectParents readOnly={false} formViewType='NEW'
             drs_object_parents={multipleDrsObjectParents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});

test('EDIT <DrsObjectParents /> should handle zero child objects', () => {
    const drsObjectParents = renderer
    .create(
        <MemoryRouter>
            <DrsObjectParents readOnly={false} formViewType='EDIT'
            drs_object_parents={zeroDrsObjectParents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});

test('EDIT <DrsObjectParents /> should handle multiple child objects', () => {
    const drsObjectParents = renderer
    .create(
        <MemoryRouter>
            <DrsObjectParents readOnly={false} formViewType='EDIT'
            drs_object_parents={multipleDrsObjectParents} />
        </MemoryRouter>
    )
    .toJSON();
    expect(drsObjectParents).toMatchSnapshot();
});