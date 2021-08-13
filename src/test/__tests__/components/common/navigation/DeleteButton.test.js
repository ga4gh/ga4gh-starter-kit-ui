import React from 'react';
import renderer from 'react-test-renderer';
import {getByRole, getByText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockValidTestBlob} from '../../../../resources/MockData';
import DeleteButton from '../../../../../lib/components/common/navigation/DeleteButton';
import {
    setSuccessMessage, 
    retrieveDrsObjectsList, 
    setError
} from '../../../../resources/MockFunctions';
import ApiCaller from '../../../../../lib/utils/ApiCaller';

jest.mock('../../../../../lib/utils/ApiCaller');


let deleteMockFunctions = null;

beforeEach(() => {
    deleteMockFunctions = {
        setSuccessMessage: setSuccessMessage,
        retriveDrsObejctsList: retrieveDrsObjectsList,
        setError: setError,
    }
});

afterEach(() => {
    setSuccessMessage.mockClear();
    retrieveDrsObjectsList.mockClear();
    setError.mockClear();
})

test('<DeleteButton /> can delete DRS Object successfully', () => {
    ApiCaller.mockImplementation(() => {
        setSuccessMessage(`DRS Object '${mockValidTestBlob.id}' has been successfully deleted`);
        retrieveDrsObjectsList();
    });
    
    let {container} = render(
        <DeleteButton
            entityName='DRS Object'
            id={mockValidTestBlob.id}
            {...deleteMockFunctions}
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    let deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    let confirmationDialog = screen.getByRole('dialog');
    expect(confirmationDialog).toBeVisible();
    expect(getByText(confirmationDialog, 'Are you sure you want to delete this DRS Object?')).toBeInTheDocument();
    expect(getByText(confirmationDialog, 'Deleting this DRS Object will permanently remove it from the database.')).toBeInTheDocument();
    expect(getByRole(confirmationDialog, 'button', {name: 'Cancel'})).toBeInTheDocument();
    expect(getByRole(confirmationDialog, 'button', {name: 'Delete'})).toBeInTheDocument();

    // clicking cancel button should close dialog
    userEvent.click(getByRole(confirmationDialog, 'button', {name: 'Cancel'}));
    expect(confirmationDialog).not.toBeVisible();

    // reopening dialog and clicking delete button should delete DRS Object
    userEvent.click(deleteButton);
    userEvent.click(getByRole(confirmationDialog, 'button', {name: 'Delete'}));
    expect(setSuccessMessage).toHaveBeenCalled();
    expect(retrieveDrsObjectsList).toHaveBeenCalled();
    expect(setError).not.toHaveBeenCalled();
});

test('<DeleteButton /> can handle errors', () => {
    ApiCaller.mockImplementation(() => {
        setError('Error: DRS object was not deleted successfully')
    });
    
    let {container} = render(<DeleteButton id={mockValidTestBlob.id} {...deleteMockFunctions}/> );
    let deleteButton = screen.getByRole('button');
    userEvent.click(deleteButton);
    let confirmationDialog = screen.getByRole('dialog');
    expect(confirmationDialog).toBeVisible();
    // clicking delete button should cause error
    userEvent.click(deleteButton);
    userEvent.click(getByRole(confirmationDialog, 'button', {name: 'Delete'}));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});
