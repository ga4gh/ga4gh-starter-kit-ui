import React from 'react';
import renderer from 'react-test-renderer';
import {getByRole, queryByRole, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Checksums from '../../../../../lib/components/drs/formComponents/Checksums';
import {
    mockAddObjectToList, 
    mockRemoveListItem,
    mockUpdateListObjectProperty
} from '../../../../resources/MockFunctions';

let noTypesSelected = null;
let allTypesSelected = null;
let someTypesSelected = null;
let checksumMockFunctions = null;
let checksumsSectionDescription = null;

beforeEach(() => {
    noTypesSelected = {
        displayChecksumTypes: { md5: true, sha1: true, sha256: true }, 
        checksums: []
    }
    allTypesSelected = {
        displayChecksumTypes: { md5: 0, sha1: 1, sha256: 2 },
        checksums: [
            {checksum: '', type: 'md5'}, 
            {checksum: '456', type: 'sha1'},
            {checksum: '789', type: 'sha256'}
        ]
    }
    someTypesSelected = {
        displayChecksumTypes: { md5: 0, sha1: true, sha256: 1 },
        checksums: [
            {checksum: '123', type: 'md5'},
            {checksum: '789', type: 'sha256'}
        ]
    }
    checksumMockFunctions = {
        setChecksumType: mockUpdateListObjectProperty,
        setChecksumChecksum: mockUpdateListObjectProperty,
        removeChecksum: mockRemoveListItem,
        addChecksum: mockAddObjectToList
    }
    checksumsSectionDescription = 'Each single-blob DRS Object must report one or more checksums, recording the digest algorithm and value of the DRS Object bytes. The following list displays the recorded digest algorithms and corresponding values for this DRS Object.';
});

afterEach(() => {
    mockAddObjectToList.mockClear();
    mockRemoveListItem.mockClear();
    mockUpdateListObjectProperty.mockClear();
});

test('SHOW <Checksums /> should handle all types selected', () => {
    let {container} = render(<Checksums readOnly={true} {...allTypesSelected} {...checksumMockFunctions} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Checksums');
    expect(screen.getByText(checksumsSectionDescription)).toBeInTheDocument();
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    let typeInput = screen.getAllByLabelText('Type');
    expect(typeInput.length).toBe(3);
    let checksumInput = screen.getAllByLabelText('Checksum');
    expect(checksumInput.length).toBe(3);
    typeInput.forEach((type, index) => {
        expect(type).toHaveTextContent(allTypesSelected.checksums[index].type);
        userEvent.click(type);
        expect(mockAddObjectToList.mock.calls.length).toBe(0);
        expect(mockRemoveListItem.mock.calls.length).toBe(0);
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
    checksumInput.forEach((checksum, index) => {
        expect(checksum).toHaveValue(allTypesSelected.checksums[index].checksum);
        userEvent.type(checksum, 'new checksum value');
        expect(mockAddObjectToList.mock.calls.length).toBe(0);
        expect(mockRemoveListItem.mock.calls.length).toBe(0);
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
});

test('SHOW <Checksums /> should handle some types selected', () => {
    let {container} = render(<Checksums readOnly={true} {...someTypesSelected} {...checksumMockFunctions} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Checksums');
    expect(screen.getByText(checksumsSectionDescription)).toBeInTheDocument();
    expect(screen.queryByLabelText('add-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    let typeInput = screen.getAllByLabelText('Type');
    expect(typeInput.length).toBe(2);
    let checksumInput = screen.getAllByLabelText('Checksum');
    expect(checksumInput.length).toBe(2);
    typeInput.forEach((type, index) => {
        expect(type).toHaveTextContent(someTypesSelected.checksums[index].type);
        userEvent.click(type);
        expect(mockAddObjectToList.mock.calls.length).toBe(0);
        expect(mockRemoveListItem.mock.calls.length).toBe(0);
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
    checksumInput.forEach((checksum, index) => {
        expect(checksum).toHaveValue(someTypesSelected.checksums[index].checksum);
        userEvent.type(checksum, 'new checksum value');
        expect(mockAddObjectToList.mock.calls.length).toBe(0);
        expect(mockRemoveListItem.mock.calls.length).toBe(0);
        expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
});

test('NEW and EDIT <Checksums /> should handle no types selected', () => {
    let {container} = render(<Checksums readOnly={false} {...noTypesSelected} {...checksumMockFunctions} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Checksums');
    expect(screen.getByText(checksumsSectionDescription)).toBeInTheDocument();
    let addChecksumButton = screen.getByLabelText('add-item-button');
    expect(addChecksumButton).toBeInTheDocument();
    expect(screen.queryByLabelText('remove-item-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Type')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Checksum')).not.toBeInTheDocument();
    userEvent.click(addChecksumButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);
});

test('NEW and EDIT <Checksums /> should handle all types selected', () => {
    let {container} = render(
        <Checksums 
        readOnly={false} 
        {...allTypesSelected} 
        setChecksumType={mockUpdateListObjectProperty}
        setChecksumChecksum={mockUpdateListObjectProperty}
        removeChecksum={mockRemoveListItem}
        addChecksum={mockAddObjectToList} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Checksums');
    expect(screen.getByText(checksumsSectionDescription)).toBeInTheDocument();
    let addChecksumButton = screen.queryByLabelText('add-item-button');
    expect(addChecksumButton).not.toBeInTheDocument();
    let removeChecksumButtons = screen.getAllByLabelText('remove-item-button')
    expect(removeChecksumButtons.length).toBe(3);
    removeChecksumButtons.forEach((removeChecksumButton) => {
        expect(removeChecksumButton).toBeInTheDocument();
    });
    let typeInput = screen.getAllByLabelText('Type');
    expect(typeInput.length).toBe(3);
    typeInput.forEach((type, index) => {
        expect(type).toHaveTextContent(allTypesSelected.checksums[index].type);
    });
    // verify correct options available for first checksum object
    userEvent.click(typeInput[0]);
    let firstTypeSelector = screen.getByRole('listbox');
    expect(getByRole(firstTypeSelector, 'option', {name: 'md5'})).toHaveAttribute('aria-selected', 'true');
    expect(getByRole(firstTypeSelector, 'option', {name: 'sha1'})).not.toHaveAttribute('aria-selected', 'true');
    expect(getByRole(firstTypeSelector, 'option', {name: 'sha256'})).not.toHaveAttribute('aria-selected', 'true');

    // verify correct options available for second checksum object
    userEvent.click(typeInput[1]);
    let secondTypeSelector = screen.getByRole('listbox');
    expect(queryByRole(secondTypeSelector, 'option', {name: 'md5'})).not.toBeInTheDocument();
    expect(getByRole(secondTypeSelector, 'option', {name: 'sha1'})).toHaveAttribute('aria-selected', 'true');
    expect(getByRole(secondTypeSelector, 'option', {name: 'sha256'})).not.toHaveAttribute('aria-selected', 'true');
    
    // verify correct options available for third checksum object
    userEvent.click(typeInput[2]);
    let thirdTypeSelector = screen.getByRole('listbox');
    expect(queryByRole(thirdTypeSelector, 'option', {name: 'md5'})).not.toBeInTheDocument();
    expect(queryByRole(thirdTypeSelector, 'option', {name: 'sha1'})).not.toBeInTheDocument();
    expect(getByRole(thirdTypeSelector, 'option', {name: 'sha256'})).toHaveAttribute('aria-selected', 'true');

    expect(mockAddObjectToList.mock.calls.length).toBe(0);
    expect(mockRemoveListItem.mock.calls.length).toBe(0);
    expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    
    let checksumInput = screen.getAllByLabelText('Checksum');
    expect(checksumInput.length).toBe(3);
    checksumInput.forEach((checksum, index) => {
        expect(checksum).toHaveValue(allTypesSelected.checksums[index].checksum);
        screen.debug(checksum);
        //userEvent.type(checksum, 'new checksum value');
        expect(mockAddObjectToList.mock.calls.length).toBe(0);
        expect(mockRemoveListItem.mock.calls.length).toBe(0);
        //expect(mockUpdateListObjectProperty).toHaveBeenCalled();
        //expect(mockUpdateListObjectProperty.mock.calls.length).toBe(0);
    });
    //userEvent.type(checksumInput[0], 'test');
    //console.log(mockUpdateListObjectProperty.mock.calls.length);
    //expect(mockUpdateListObjectProperty).toHaveBeenCalled();
});

test('NEW and EDIT <Checksums /> should handle some types selected', () => {
    let {container} = render(<Checksums readOnly={false} {...someTypesSelected} {...checksumMockFunctions} />);
    expect(container.firstChild).toMatchSnapshot();
});