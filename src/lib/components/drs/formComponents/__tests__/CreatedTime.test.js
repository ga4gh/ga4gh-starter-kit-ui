import React from 'react';
import renderer from 'react-test-renderer';
import CreatedTime from '../CreatedTime';

test('SHOW <CreatedTime /> ', () => {
    const createdTime = renderer
    .create(<CreatedTime 
    readOnly={true}
    created_time='2021-07-22T13:00:00Z' />)
    .toJSON();
    expect(createdTime).toMatchSnapshot();
});

test('NEW and EDIT <CreatedTime />', () => {
    const createdTime = renderer
    .create(<CreatedTime 
    readOnly={false}
    created_time='2021-07-22T13:00:00Z' />)
    .toJSON();
    expect(createdTime).toMatchSnapshot();
});