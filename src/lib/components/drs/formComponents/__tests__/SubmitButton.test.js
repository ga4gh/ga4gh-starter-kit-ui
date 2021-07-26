import React from 'react';
import renderer from 'react-test-renderer';
import SubmitButton from '../SubmitButton';

test('<SubmitButton/>', () => {
    const submitButton = renderer
    .create(<SubmitButton />).toJSON();
    expect(submitButton).toMatchSnapshot();
})