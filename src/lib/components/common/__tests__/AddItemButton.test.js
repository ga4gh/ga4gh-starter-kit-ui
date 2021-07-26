import React from 'react';
import renderer from 'react-test-renderer';
import AddItemButton from '../AddItemButton';

test('SHOW <AddItemButton />', () => {
    const addItemButton = renderer
    .create(<AddItemButton readOnly={true} objectName={'SHOW snapshot test'} />)
    .toJSON();
    expect(addItemButton).toMatchSnapshot();
});

test('NEW and EDIT <AddItemButton />', () => {
    const addItemButton = renderer
    .create(<AddItemButton readOnly={false} objectName={'NEW snapshot test'} />)
    .toJSON();
    expect(addItemButton).toMatchSnapshot();
});