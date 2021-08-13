import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../../../resources/MockFunctions';
import Description from '../../../../../../../lib/components/ga4gh/drs/drsobject/formComponents/Description';

afterEach(() => {
    mockUpdateScalar.mockClear();
})

test('SHOW <Description /> should handle populated description', () => {
    let {container} = render(
        <Description readOnly={true} description={'This is a description.'} 
        setDescription={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    let descriptionField = screen.getByRole('textbox');
    expect(descriptionField).toHaveValue('This is a description.');

    // description field is read only and cannot be edited
    expect(descriptionField).toHaveAttribute('readonly');
    userEvent.type(descriptionField, 'test value');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW and EDIT <Description /> should handle empty description', () => {
    let {container} = render(
        <Description readOnly={false} description={''} setDescription={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    let descriptionField = screen.getByRole('textbox');
    expect(descriptionField).toHaveValue('');
    userEvent.type(descriptionField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});

test('NEW and EDIT <Description /> should handle populated description', () => {
    let {container} = render(
        <Description readOnly={false} description={'This is a description.'} 
        setDescription={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    let descriptionField = screen.getByRole('textbox');
    expect(descriptionField).toHaveValue('This is a description.');
    userEvent.type(descriptionField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});