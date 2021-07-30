import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import Description from '../../../../../lib/components/drs/formComponents/Description';

test('SHOW <Description /> should handle populated description', () => {
    let {container} = render(
        <Description readOnly={true} description={'Snapshot test description.'} 
        setDescription={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Snapshot test description.');
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
        <Description readOnly={false} description={'Snapshot test description.'} 
        setDescription={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    let descriptionField = screen.getByRole('textbox');
    expect(descriptionField).toHaveValue('Snapshot test description.');
    userEvent.type(descriptionField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});