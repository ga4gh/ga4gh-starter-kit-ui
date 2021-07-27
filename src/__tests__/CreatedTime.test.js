import React from 'react';
import renderer from 'react-test-renderer';
import CreatedTime from '../lib/components/drs/formComponents/CreatedTime';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('SHOW <CreatedTime /> ', () => {
    const createdTime = renderer
    .create(<CreatedTime 
    readOnly={true}
    created_time='2021-07-22T13:00:00Z' />)
    .toJSON();
    expect(createdTime).toMatchSnapshot();
});

test('NEW and EDIT <CreatedTime />', () => {
    const createdTime = renderer
    .create(<CreatedTime 
    readOnly={false}
    created_time='2021-07-22T13:00:00Z' />)
    .toJSON();
    expect(createdTime).toMatchSnapshot();
});