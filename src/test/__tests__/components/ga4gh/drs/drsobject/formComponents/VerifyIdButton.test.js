import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import VerifyIdButton from '../../../../../../../lib/components/ga4gh/drs/drsobject/formComponents/VerifyIdButton';
import {
    mockAddObjectToList, 
    mockRemoveListItem, 
    mockUpdateScalar, 
    mockUpdateListString, 
    mockUpdateListObjectProperty, 
    mockResetListObjectProperty
} from '../../../../../../resources/MockFunctions';
import {
    mockBundleDrsObject, 
    mockBlobDrsObject
} from '../../../../../../resources/MockData';
import axios from 'axios';

jest.mock('axios');

let mockFunctions = null;

beforeEach(() => {
    mockFunctions = {
        setRelativeValid: mockResetListObjectProperty,
        setRelativeInvalid: mockResetListObjectProperty,
        setRelativeName: mockUpdateListObjectProperty
    }
    
});

afterEach(() => {
    mockFunctions.setRelativeValid.mockClear();
    mockFunctions.setRelativeInvalid.mockClear();
    mockFunctions.setRelativeValid.mockClear();
    mockResetListObjectProperty.mockClear();
    mockUpdateListObjectProperty.mockClear();
})

test('<VerifyIdButton/> should display valid relatives', () => {
    let {container} = render(
        <VerifyIdButton 
            relative={{id: mockBlobDrsObject.id, isValid: true}} 
            activeDrsObjectId='1234567890' 
            formViewType='NEW'
            {...mockFunctions}  
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByTitle('This is a valid ID.')).toBeInTheDocument();
    expect(screen.queryByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).not.toBeInTheDocument();
    expect(screen.getByTitle('Submit this ID for verification.')).toBeInTheDocument();
});

test('<VerifyIdButton/> should display invalid relatives', () => {
    let {container} = render(
        <VerifyIdButton 
            relative={{id: 'abc123', isValid: false}} 
            activeDrsObjectId='1234567890' 
            formViewType='NEW'
            {...mockFunctions}  
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.queryByTitle('This is a valid ID.')).not.toBeInTheDocument();
    expect(screen.getByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).toBeInTheDocument();
    expect(screen.getByTitle('Submit this ID for verification.')).toBeInTheDocument();
});

test('NEW <VerifyIdButton/> does not automatically validate relatives with undefined validity', () => {
    let {container} = render(
        <VerifyIdButton 
            relative={{id: 'abc123', isValid: undefined}} 
            activeDrsObjectId='1234567890' 
            formViewType='NEW'
            {...mockFunctions} 
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.queryByTitle('This is a valid ID.')).not.toBeInTheDocument();
    expect(screen.queryByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).not.toBeInTheDocument();
    expect(screen.getByTitle('Submit this ID for verification.')).toBeInTheDocument();
});

test('EDIT <VerifyIdButton/> automatically validates relatives with undefined validity', () => {
    axios.mockResolvedValue({data: mockBlobDrsObject});
    // axios.mockImplementation(() => Promise.resolve({data: mockBlobDrsObject}));
    let {container} = render(
        <VerifyIdButton 
            relative={{id: mockBlobDrsObject.id, isValid: undefined}} 
            activeDrsObjectId='1234567890' 
            formViewType='EDIT' 
            {...mockFunctions} 
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    //expect(screen.getByTitle('This is a valid ID.')).toBeInTheDocument();
    expect(screen.queryByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).not.toBeInTheDocument();
    expect(screen.getByTitle('Submit this ID for verification.')).toBeInTheDocument();
    // TODO: need to assert whether validation occurs correctly using mock function
    /* expect(mockFunctions.setRelativeValid).toHaveBeenCalled();
    expect(mockFunctions.setRelativeName).toHaveBeenCalled(); */
});

test('<VerifyIdButton/> handles relative IDs that match the active DRS Object ID', () => {
    let {container} = render(
        <VerifyIdButton  
            relative={{id: '1234567890', isValid: undefined}} 
            activeDrsObjectId='1234567890' 
            formViewType='NEW'
            {...mockFunctions} 
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    let verifyIdButton = screen.getByTitle('Submit this ID for verification.');
    expect(screen.queryByTitle('This is a valid ID.')).not.toBeInTheDocument();
    expect(screen.queryByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).not.toBeInTheDocument();
    expect(verifyIdButton).toBeInTheDocument();
    userEvent.click(verifyIdButton);
    expect(mockFunctions.setRelativeInvalid.mock.calls.length).toBe(1);
});

test('<VerifyIdButton/> handles empty relative IDs', () => {
    let {container} = render(
        <VerifyIdButton 
            relative={{id: '', isValid: undefined}} 
            activeDrsObjectId='1234567890' 
            formViewType='NEW'
            {...mockFunctions} 
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    let verifyIdButton = screen.getByTitle('Submit this ID for verification.');
    expect(screen.queryByTitle('This is a valid ID.')).not.toBeInTheDocument();
    expect(screen.queryByTitle('This is an invalid ID. Please enter a valid ID before proceeding.')).not.toBeInTheDocument();
    expect(verifyIdButton).toBeInTheDocument();
    userEvent.click(verifyIdButton);
    expect(mockFunctions.setRelativeInvalid.mock.calls.length).toBe(1);
})