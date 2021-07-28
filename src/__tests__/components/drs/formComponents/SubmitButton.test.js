import React from 'react';
import renderer from 'react-test-renderer';
import SubmitButton from '../../../../lib/components/drs/formComponents/SubmitButton';

test('<SubmitButton/>', () => {
    const submitButton = renderer
    .create(<SubmitButton />).toJSON();
    expect(submitButton).toMatchSnapshot();
})