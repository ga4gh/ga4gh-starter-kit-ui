import React from 'react';
import renderer from 'react-test-renderer';
import Description from '../Description';

test('SHOW <Description /> should handle null description', () => {
    const description = renderer
    .create(<Description readOnly={true} 
        description={null} />)
    .toJSON();
    expect(description).toMatchSnapshot();
});

test('SHOW <Description /> should handle populated description', () => {
    const description = renderer
    .create(<Description readOnly={true} 
        description={'This is a snapshot test sample description.'} />)
    .toJSON();
    expect(description).toMatchSnapshot();
});

test('NEW and EDIT <Description /> should handle null description', () => {
    const description = renderer
    .create(<Description readOnly={false} 
        description={null} />)
    .toJSON();
    expect(description).toMatchSnapshot();
});

test('NEW and EDIT <Description /> should handle populated description', () => {
    const description = renderer
    .create(<Description readOnly={false} 
        description={'This is a snapshot test sample description.'} />)
    .toJSON();
    expect(description).toMatchSnapshot();
});