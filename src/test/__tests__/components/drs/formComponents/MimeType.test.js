import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import MimeType from '../../../../../lib/components/drs/formComponents/MimeType';

test('SHOW <MimeType /> should handle populated field', () => {
    let {container} = render(
        <MimeType readOnly={true} mime_type='Test MIME Type' setMimeType={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('MIME Type')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Test MIME Type');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW and EDIT <MimeType /> should handle empty field', () => {
    let {container} = render(
        <MimeType readOnly={false} mime_type='' setMimeType={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('MIME Type')).toBeInTheDocument();
    let mimeTypeField = screen.getByRole('textbox');
    expect(mimeTypeField).toHaveValue('');
    userEvent.type(mimeTypeField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});

test('NEW and EDIT <MimeType /> should handle populated field', () => {
    let {container} = render(
        <MimeType readOnly={false} mime_type='Test MIME Type' setMimeType={mockUpdateScalar} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('MIME Type')).toBeInTheDocument();
    let mimeTypeField = screen.getByRole('textbox');
    expect(mimeTypeField).toHaveValue('Test MIME Type');
    userEvent.type(mimeTypeField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});