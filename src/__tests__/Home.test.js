import React from 'react';
import renderer, {act} from 'react-test-renderer';
import Home from '../lib/components/pages/Home';
import { unmountComponentAtNode } from "react-dom";
import {MemoryRouter} from 'react-router-dom'

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

test('<Home />', () => {
    let home = renderer
    .create(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    )
    .toJSON();
    expect(home).toMatchSnapshot();
})