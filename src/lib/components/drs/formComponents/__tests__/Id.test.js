import React from 'react';
import renderer from 'react-test-renderer';
import Id from '../Id';

test('SHOW and EDIT <Id /> should handle empty id field', () => {
    const id = renderer.create(<Id readOnly={true} id='' />)
    .toJSON();
    expect(id).toMatchSnapshot();
});

test('SHOW and EDIT <Id /> should handle populated id field', () => {
    const id = renderer.create(<Id readOnly={true} id='1234567890' />)
    .toJSON();
    expect(id).toMatchSnapshot();
});

test('NEW <Id /> should handle empty id field', () => {
    const id = renderer.create(<Id readOnly={false} id='' />)
    .toJSON();
    expect(id).toMatchSnapshot();
});

test('NEW <Id /> should handle populated id field', () => {
    const id = renderer.create(<Id readOnly={false} id='1234567890' />)
    .toJSON();
    expect(id).toMatchSnapshot();
});