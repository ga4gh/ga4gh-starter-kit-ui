import React from 'react';
import renderer from 'react-test-renderer';
import AddItemButton from '../lib/components/common/AddItemButton';
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

test('SHOW <AddItemButton />', () => {
    const addItemButton = renderer
    .create(<AddItemButton readOnly={true} objectName={'SHOW snapshot test'} />)
    .toJSON();
    expect(addItemButton).toMatchSnapshot();
});

test('NEW and EDIT <AddItemButton />', () => {
    const addItemButton = renderer
    .create(<AddItemButton readOnly={false} objectName={'NEW and EDIT snapshot test'} />)
    .toJSON();
    expect(addItemButton).toMatchSnapshot();
});