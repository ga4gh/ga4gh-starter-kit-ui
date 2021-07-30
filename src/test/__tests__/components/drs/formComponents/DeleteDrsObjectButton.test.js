import React from 'react';
import renderer from 'react-test-renderer';
import DeleteDrsObjectButton from '../../../../../lib/components/drs/formComponents/DeleteDrsObjectButton';
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

test('<DeleteDrsObjectButton />', () => {
    const deleteDrsObjectButton = renderer
    .create(<DeleteDrsObjectButton />)
    .toJSON();
    expect(deleteDrsObjectButton).toMatchSnapshot();
});