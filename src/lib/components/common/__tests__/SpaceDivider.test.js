import React from 'react';
import renderer from 'react-test-renderer';
import SpaceDivider from '../SpaceDivider';

test('<SpaceDivider />', () => {
    const spaceDivider = renderer
    .create(<SpaceDivider />)
    .toJSON();
    expect(spaceDivider).toMatchSnapshot();
});