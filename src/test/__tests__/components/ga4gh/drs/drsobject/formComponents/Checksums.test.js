import React from 'react';
import renderer from 'react-test-renderer';
import {getByRole, queryByRole, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Checksums from '../../../../../../../lib/components/ga4gh/drs/drsobject/formComponents/Checksums';
import {
    mockAddObjectToList, 
    mockRemoveListItem,
    mockUpdateListObjectProperty
} from '../../../../../../resources/MockFunctions';

let noChecksumInstances = null;
let allTypesSelected = null;
let noTypesSelected = null;
let checksumMockFunctions = null;
let checksumsSectionDescription = null;

beforeEach(() => {
    noChecksumInstances = {
        displayChecksumTypes: { md5: true, sha1: true, sha256: true }, 
        checksums: []
    }
    noTypesSelected = {
        displayChecksumTypes: { md5: true, sha1: true, sha256: true }, 
        checksums: [{checksum: '', type: ''}]
    }
    allTypesSelected = {
        displayChecksumTypes: { md5: 0, sha1: 1, sha256: 2 },
        checksums: [
            {checksum: '123', type: 'md5'}, 
            {checksum: '456', type: 'sha1'},
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
    expect(screen.queryByLabelText('add-checksum-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('remove-checksum-button')).not.toBeInTheDocument();
    let typeInput = screen.getAllByLabelText('Type');
    expect(typeInput.length).toBe(3);
    let checksumInput = screen.getAllByLabelText('Checksum');
    expect(checksumInput.length).toBe(3);
    typeInput.forEach((type, index) => {
        expect(type).toHaveTextContent(allTypesSelected.checksums[index].type);
        userEvent.click(type);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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

test('NEW and EDIT <Checksums /> should handle no checksum instances', () => {
    let {container} = render(<Checksums readOnly={false} {...noChecksumInstances} {...checksumMockFunctions} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Checksums');
    expect(screen.getByText(checksumsSectionDescription)).toBeInTheDocument();
    let addChecksumButton = screen.getByLabelText('add-checksum-button');
    expect(addChecksumButton).toBeInTheDocument();
    expect(screen.queryByLabelText('remove-checksum-button')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Type')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Checksum')).not.toBeInTheDocument();
    userEvent.click(addChecksumButton);
    expect(mockAddObjectToList.mock.calls.length).toBe(1);
});

test('NEW and EDIT <Checksums /> should handle no types selected', () => {
    let {container} = render(<Checksums readOnly={false} {...noTypesSelected} {...checksumMockFunctions} /> );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Checksums');
    expect(screen.getByText(checksumsSectionDescription)).toBeInTheDocument();

    // clickable add item button should be displayed
    let addChecksumButton = screen.getByLabelText('add-checksum-button');
    expect(addChecksumButton).toBeInTheDocument();

    // checksum object should have a clickable remove item button which passes 
    // the correct index to the callback function
    let removeChecksumButton = screen.getByLabelText('remove-checksum-button');
    expect(removeChecksumButton).toBeInTheDocument();
    userEvent.click(removeChecksumButton);
    expect(mockRemoveListItem.mock.calls[0][0]).toBe(0);
    expect(mockRemoveListItem.mock.results[0].value).toBe(0);
    expect(mockRemoveListItem.mock.calls.length).toBe(1);

    // checksum object should have a Type field 
    let typeInput = screen.getByLabelText('Type');
    expect(typeInput).not.toHaveTextContent();

    // verify correct Type options are available 
    userEvent.click(typeInput);
    let typeSelector = screen.getByRole('listbox');
    expect(getByRole(typeSelector, 'option', {name: 'md5'})).not.toHaveAttribute('aria-selected', 'true');
    expect(getByRole(typeSelector, 'option', {name: 'sha1'})).not.toHaveAttribute('aria-selected', 'true');
    expect(getByRole(typeSelector, 'option', {name: 'sha256'})).not.toHaveAttribute('aria-selected', 'true');
    userEvent.click(getByRole(typeSelector, 'option', {name: 'md5'}));
    // callback function should be called with the correct arguments
    expect(mockUpdateListObjectProperty).toHaveBeenCalledWith(0, 'md5');
    mockUpdateListObjectProperty.mockClear();

    // checksum object should have an editable Checksum field
    let checksumInput = screen.getByLabelText('Checksum');
    expect(checksumInput).toHaveValue('');
    expect(checksumInput).not.toHaveAttribute('readonly');
    userEvent.type(checksumInput, 'new checksum value');
    expect(mockUpdateListObjectProperty).toHaveBeenCalled();
    expect(mockUpdateListObjectProperty.mock.calls[0][0]).toBe(0);
});

test('NEW and EDIT <Checksums /> should display data correctly with all types selected', () => {
    let {container} = render(<Checksums readOnly={false} {...allTypesSelected} {...checksumMockFunctions} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Checksums');
    expect(screen.getByText(checksumsSectionDescription)).toBeInTheDocument();

    // since there are three checksum objects, the add item button should be hidden
    let addChecksumButton = screen.queryByLabelText('add-checksum-button');
    expect(addChecksumButton).not.toBeInTheDocument();

    // each checksum object should have a clickable remove item button which passes 
    // the correct index to the callback function
    let removeChecksumButtons = screen.getAllByLabelText('remove-checksum-button');
    expect(removeChecksumButtons.length).toBe(3);
    removeChecksumButtons.forEach((removeChecksumButton, index) => {
        expect(removeChecksumButton).toBeInTheDocument();
        userEvent.click(removeChecksumButton);
        expect(mockRemoveListItem.mock.calls[index][0]).toBe(index);
        expect(mockRemoveListItem.mock.results[index].value).toBe(index);
    });
    expect(mockRemoveListItem.mock.calls.length).toBe(3);

    // each checksum object should have a Type field 
    let typeInput = screen.getAllByLabelText('Type');
    expect(typeInput.length).toBe(3);
    typeInput.forEach((type, index) => {
        expect(type).toHaveTextContent(allTypesSelected.checksums[index].type);
    });

    // verify correct Type options are available for first checksum object
    userEvent.click(typeInput[0]);
    let firstTypeSelector = screen.getByRole('listbox');
    expect(getByRole(firstTypeSelector, 'option', {name: 'md5'})).toHaveAttribute('aria-selected', 'true');
    expect(getByRole(firstTypeSelector, 'option', {name: 'sha1'})).not.toHaveAttribute('aria-selected', 'true');
    expect(getByRole(firstTypeSelector, 'option', {name: 'sha256'})).not.toHaveAttribute('aria-selected', 'true');

    // verify correct Type options are available for second checksum object
    userEvent.click(typeInput[1]);
    let secondTypeSelector = screen.getByRole('listbox');
    expect(queryByRole(secondTypeSelector, 'option', {name: 'md5'})).not.toBeInTheDocument();
    expect(getByRole(secondTypeSelector, 'option', {name: 'sha1'})).toHaveAttribute('aria-selected', 'true');
    expect(getByRole(secondTypeSelector, 'option', {name: 'sha256'})).not.toHaveAttribute('aria-selected', 'true');
    
    // verify correct Type options are available for third checksum object
    userEvent.click(typeInput[2]);
    let thirdTypeSelector = screen.getByRole('listbox');
    expect(queryByRole(thirdTypeSelector, 'option', {name: 'md5'})).not.toBeInTheDocument();
    expect(queryByRole(thirdTypeSelector, 'option', {name: 'sha1'})).not.toBeInTheDocument();
    expect(getByRole(thirdTypeSelector, 'option', {name: 'sha256'})).toHaveAttribute('aria-selected', 'true');
    
    // each checksum object should have an editable Checksum field
    let checksumInput = screen.getAllByLabelText('Checksum');
    expect(checksumInput.length).toBe(3);
    checksumInput.forEach((checksum, index) => {
        expect(checksum).toHaveValue(allTypesSelected.checksums[index].checksum);
        expect(checksum).not.toHaveAttribute('readonly');
    });
});

test('NEW and EDIT <Checksums /> should handle Type option selection', () => {
    render(<Checksums readOnly={false} {...allTypesSelected} {...checksumMockFunctions} />);
    let typeInput = screen.getAllByLabelText('Type');
    userEvent.click(typeInput[0]);
    let firstTypeSelector = screen.getByRole('listbox');
    userEvent.click(getByRole(firstTypeSelector, 'option', {name: 'sha256'}));
    // callback function should be called with the correct arguments
    expect(mockUpdateListObjectProperty).toHaveBeenCalledWith(0, 'sha256');
});

test('NEW and EDIT <Checksums /> should handle Checksum value editing', () => {
    render(<Checksums readOnly={false} {...allTypesSelected} {...checksumMockFunctions} />);
    let checksumInput = screen.getAllByLabelText('Checksum');
    userEvent.type(checksumInput[0], 'new checksum value');
    // callback function should pass the index as its first argument
    expect(mockUpdateListObjectProperty.mock.calls[0][0]).toBe(0);
});