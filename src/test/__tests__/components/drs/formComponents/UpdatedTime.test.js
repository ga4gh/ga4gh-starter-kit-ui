import React from 'react';
import renderer from 'react-test-renderer';
import UpdatedTime from '../../../../../lib/components/drs/formComponents/UpdatedTime';

test('SHOW <UpdatedTime /> ', () => {
    const updatedTime = renderer
    .create(<UpdatedTime readOnly={true}
    updated_time='2021-07-22T13:00:00Z' />)
    .toJSON();
    //expect(updatedTime).toMatchSnapshot();
});

test('NEW and EDIT <UpdatedTime />', () => {
    const updatedTime = renderer
    .create(<UpdatedTime readOnly={false}
    updated_time='2021-07-22T13:00:00Z' />)
    .toJSON();
    //expect(updatedTime).toMatchSnapshot();
});