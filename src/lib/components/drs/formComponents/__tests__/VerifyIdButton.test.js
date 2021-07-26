import React from 'react';
import renderer from 'react-test-renderer';
import VerifyIdButton from '../VerifyIdButton';

test('<VerifyIdButton/> should handle valid relatives', () => {
    const verifyIdButton = renderer
    .create(<VerifyIdButton relative={{isValid: true}} />)
    .toJSON();
    expect(verifyIdButton).toMatchSnapshot();
})

test('<VerifyIdButton/> should handle invalid relatives', () => {
    const verifyIdButton = renderer
    .create(<VerifyIdButton relative={{isValid: false}} />)
    .toJSON();
    expect(verifyIdButton).toMatchSnapshot();
})

test('<VerifyIdButton/> should handle undefined relatives', () => {
    const verifyIdButton = renderer
    .create(<VerifyIdButton relative={{isValid: undefined}} />)
    .toJSON();
    expect(verifyIdButton).toMatchSnapshot();
})