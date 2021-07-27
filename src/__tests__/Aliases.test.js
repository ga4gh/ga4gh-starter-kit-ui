import React from 'react';
import renderer from 'react-test-renderer';
import { unmountComponentAtNode } from "react-dom";
import Aliases from '../lib/components/drs/formComponents/Aliases';

let container = null;
let zeroAliases = null;
let multipleAliases = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    zeroAliases=[];
    multipleAliases=['alias1', 'alias2', 'alias3'];
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


test('SHOW <Aliases /> should handle zero aliases', () => {
    /* let aliases;
    act(() => {
        aliases = create(<Aliases readOnly={true} aliases={zeroAliases} />, container)    
    }) */
    const aliases = renderer
    .create(<Aliases readOnly={true} aliases={zeroAliases} />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});

test('SHOW <Aliases /> should handle multiple aliases', () => {
    const aliases = renderer
    .create(<Aliases readOnly={true} aliases={multipleAliases} />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});

test('NEW and EDIT <Aliases /> should handle zero aliases', () => {
    const aliases = renderer
    .create(<Aliases readOnly={false} aliases={zeroAliases} />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});

test('NEW and EDIT <Aliases /> should handle multiple aliases', () => {
    const aliases = renderer
    .create(<Aliases readOnly={false} aliases={multipleAliases} />)
    .toJSON();
    expect(aliases).toMatchSnapshot();
});