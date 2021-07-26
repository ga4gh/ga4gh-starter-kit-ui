import React from 'react';
import renderer from 'react-test-renderer';
import Aliases from '../Aliases';

let zeroAliases=[];
let multipleAliases=['alias1', 'alias2', 'alias3'];

test('SHOW <Aliases /> should handle zero aliases', () => {
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

test('NEW and EDIT <Aliases /> should handle 0 aliases', () => {
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