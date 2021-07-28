import React from 'react';
import renderer from 'react-test-renderer';
import Size from '../../../../lib/components/drs/formComponents/Size';

test('SHOW <Size /> should populated field', () => {
    const size = renderer
    .create(<Size 
        readOnly={true} size={1000} />)
    .toJSON();
    expect(size).toMatchSnapshot();
});

test('SHOW <Size /> should handle empty field', () => {
    const size = renderer
    .create(<Size 
        readOnly={true} size='' />)
    .toJSON();
    expect(size).toMatchSnapshot();
});

test('NEW and EDIT <Size /> should handle populated field', () => {
    const size = renderer
    .create(<Size 
        readOnly={false} size={1000} />)
    .toJSON();
    expect(size).toMatchSnapshot();
});

test('NEW and EDIT <Size /> should handle empty field', () => {
    const size = renderer
    .create(<Size 
        readOnly={false} size='' />)
    .toJSON();
    expect(size).toMatchSnapshot();
});