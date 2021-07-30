import React from 'react';
import renderer from 'react-test-renderer';
import RemoveItemButton from '../../../../lib/components/common/RemoveItemButton';

test('SHOW <RemoveItemButton />', () => {
    const removeItemButton = renderer
    .create(<RemoveItemButton readOnly={true} objectName={'snapshot test'} />)
    .toJSON();
    expect(removeItemButton).toMatchSnapshot();
});

test('NEW and EDIT <RemoveItemButton />', () => {
    const removeItemButton = renderer
    .create(<RemoveItemButton readOnly={false} objectName={'snapshot test'} />)
    .toJSON();
    expect(removeItemButton).toMatchSnapshot();
});