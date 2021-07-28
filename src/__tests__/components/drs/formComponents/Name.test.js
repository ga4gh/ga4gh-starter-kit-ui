import React from 'react';
import renderer from 'react-test-renderer';
import Name from '../../../../lib/components/drs/formComponents/Name';

test('SHOW <Name /> should handle empty field', () => {
    const name = renderer
    .create(<Name 
        readOnly={true} name='' />)
    .toJSON();
    expect(name).toMatchSnapshot();
});

test('SHOW <Name /> should handle populated field', () => {
    const name = renderer
    .create(<Name 
        readOnly={true} name='snapshot test' />)
    .toJSON();
    expect(name).toMatchSnapshot();
});

test('NEW and EDIT <Name /> should handle empty field', () => {
    const name = renderer
    .create(<Name 
        readOnly={false} name='' />)
    .toJSON();
    expect(name).toMatchSnapshot();
});

test('NEW and EDIT <Name /> should handle populated field', () => {
    const name = renderer
    .create(<Name 
        readOnly={false} name='snapshot test' />)
    .toJSON();
    expect(name).toMatchSnapshot();
});