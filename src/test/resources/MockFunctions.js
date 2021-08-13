import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const mockAddObjectToList = jest.fn();
const mockRemoveListItem = jest.fn(index => {return index});
const mockUpdateScalar = jest.fn(newValue => {return});
const mockUpdateListString = jest.fn((index, newValue) => {return index});
const mockUpdateListObjectProperty = jest.fn((index, newValue) => {return index});
const mockResetListObjectProperty = jest.fn(index => {return index});
let setSuccessMessage = jest.fn(message=> {console.log(message)});
let retrieveDrsObjectsList = jest.fn();
let setError = jest.fn(error => {return error})

export {
    mockAddObjectToList, 
    mockRemoveListItem, 
    mockUpdateScalar, 
    mockUpdateListString, 
    mockUpdateListObjectProperty, 
    mockResetListObjectProperty, 
    setSuccessMessage, 
    retrieveDrsObjectsList, 
    setError
};