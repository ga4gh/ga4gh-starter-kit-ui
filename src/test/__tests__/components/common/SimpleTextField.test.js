import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import SimpleTextField from '../../../../lib/components/common/SimpleTextField';
import {mockUpdateScalar} from '../../../resources/MockFunctions';

let simpleTextFieldProps = null;
beforeEach(() => {
    simpleTextFieldProps={
        id: 'SnapshotTestSimpleTextField',
        label: 'Snapshot Test',
        name: 'Snapshot Test',
        helperText: 'This is a description for a snapshot test.', 
        changeFunction: mockUpdateScalar
    }    
})

test('SHOW <SimpleTextField /> handles populated field', () => {
    let {container} = render(
        <SimpleTextField readOnly={true} value='Snapshot test value.'
        {...simpleTextFieldProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText(simpleTextFieldProps.label)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Snapshot test value.');
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW and EDIT <SimpleTextField /> handles populated field', () => {
    let {container} = render(
        <SimpleTextField readOnly={false} value='Snapshot test value.'
        {...simpleTextFieldProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText(simpleTextFieldProps.label)).toBeInTheDocument();
    let simpleTextField = screen.getByRole('textbox');
    expect(simpleTextField).toHaveValue('Snapshot test value.');
    userEvent.type(simpleTextField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
}); 

test('NEW and EDIT <SimpleTextField /> handles empty field', () => {
    let {container} = render(
        <SimpleTextField readOnly={false} value='' {...simpleTextFieldProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByLabelText(simpleTextFieldProps.label)).toBeInTheDocument();
    let simpleTextField = screen.getByRole('textbox');
    expect(simpleTextField).toHaveValue('');
    userEvent.type(simpleTextField, 'test value');
    expect(mockUpdateScalar).toHaveBeenCalled();
});