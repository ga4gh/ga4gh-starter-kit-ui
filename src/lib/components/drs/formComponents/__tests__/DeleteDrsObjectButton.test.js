import React from 'react';
import renderer from 'react-test-renderer';
import DeleteDrsObjectButton from '../DeleteDrsObjectButton';

test('<DeleteDrsObjectButton />', () => {
    const deleteDrsObjectButton = renderer
    .create(<DeleteDrsObjectButton />)
    .toJSON();
    expect(deleteDrsObjectButton).toMatchSnapshot();
});