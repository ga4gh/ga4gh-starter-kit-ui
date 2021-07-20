import React from 'react';
import renderer from 'react-test-renderer';
import { 
    SpaceDivider
} from '../../components/drs/DrsObjectForm';

test('SpaceDividerSnapshot', () => {
    const spaceDivider = renderer
    .create(<SpaceDivider />)
    .toJSON();
    expect(spaceDivider).toMatchSnapshot();
});