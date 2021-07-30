import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const mockAddObjectToList = jest.fn();
const mockRemoveListItem = jest.fn(index => {return index});
const mockUpdateScalar = jest.fn(newValue => {return});
//TODO: need better way to assert updates to controlled components entered by typing
const mockUpdateListString = jest.fn((index, newValue) => {return index});
const mockUpdateListObjectProperty = jest.fn((index, newValue) => {return index});

export {
    mockAddObjectToList, 
    mockRemoveListItem, 
    mockUpdateScalar, 
    mockUpdateListString, 
    mockUpdateListObjectProperty
};