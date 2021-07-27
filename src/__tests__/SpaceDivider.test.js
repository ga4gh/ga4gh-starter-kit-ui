import React from 'react';
import renderer from 'react-test-renderer';
import SpaceDivider from '../lib/components/common/SpaceDivider';

test('<SpaceDivider />', () => {
    const spaceDivider = renderer
    .create(<SpaceDivider />)
    .toJSON();
    expect(spaceDivider).toMatchSnapshot();
});