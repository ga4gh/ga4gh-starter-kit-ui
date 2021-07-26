import React from 'react';
import renderer from 'react-test-renderer';
import MimeType from '../MimeType';

test('SHOW <MimeType /> should handle empty field', () => {
    const mimeType = renderer
    .create(<MimeType 
        readOnly={true} mime_type='' />)
    .toJSON();
    expect(mimeType).toMatchSnapshot();
});

test('SHOW <MimeType /> should handle populated field', () => {
    const mimeType = renderer
    .create(<MimeType 
        readOnly={true} mime_type='test MIME Type' />)
    .toJSON();
    expect(mimeType).toMatchSnapshot();
});

test('NEW and EDIT <MimeType /> should handle empty field', () => {
    const mimeType = renderer
    .create(<MimeType 
        readOnly={false} mime_type='' />)
    .toJSON();
    expect(mimeType).toMatchSnapshot();
});

test('NEW and EDIT <MimeType /> should handle populated field', () => {
    const mimeType = renderer
    .create(<MimeType 
        readOnly={false} mime_type='test MIME Type' />)
    .toJSON();
    expect(mimeType).toMatchSnapshot();
});