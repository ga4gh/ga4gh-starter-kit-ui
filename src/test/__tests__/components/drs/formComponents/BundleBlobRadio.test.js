import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {mockUpdateScalar} from '../../../../resources/MockFunctions';
import BundleBlobRadio from '../../../../../lib/components/drs/formComponents/BundleBlobRadio';

let bundleBlobRadioSectionDescription = 'Bundles contain references to Child Drs Objects, while Blobs act as single DRS Objects and do not have any children.';

afterEach(() => {
    mockUpdateScalar.mockClear();
})

test('SHOW and EDIT <BundleBlobRadio /> should handle blobs', () => {
    let {container} = render(
        <BundleBlobRadio is_bundle={false} readOnly={true} setIsBundle={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Is this DRS Object a bundle or a blob?');
    expect(screen.getByText(bundleBlobRadioSectionDescription)).toBeInTheDocument();

    // disabled radio buttons should be displayed 
    // and blob option should be selected
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    let bundleRadio = screen.getByLabelText('Bundle');
    expect(bundleRadio).toBeInTheDocument();
    let blobRadio = screen.getByLabelText('Blob');
    expect(blobRadio).toBeInTheDocument();
    expect(blobRadio).toBeChecked();
    expect(blobRadio).toBeDisabled();
    expect(bundleRadio).not.toBeChecked();
    expect(bundleRadio).toBeDisabled();

    // since the radio buttons are disabled, an error 
    // should be thrown upon attempting to click them
    expect(() => {
        userEvent.click(bundleRadio);
    }).toThrow();
    expect(() => {
        userEvent.click(blobRadio);
    }).toThrow();
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('SHOW and EDIT <BundleBlobRadio /> should handle bundles', () => {
    let {container} = render(
        <BundleBlobRadio is_bundle={true} readOnly={true} setIsBundle={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Is this DRS Object a bundle or a blob?');
    expect(screen.getByText(bundleBlobRadioSectionDescription)).toBeInTheDocument();

    // disabled radio buttons should be displayed 
    // and bundle option should be selected
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    let bundleRadio = screen.getByLabelText('Bundle');
    expect(bundleRadio).toBeInTheDocument();
    let blobRadio = screen.getByLabelText('Blob');
    expect(blobRadio).toBeInTheDocument();
    expect(blobRadio).toBeDisabled();
    expect(blobRadio).not.toBeChecked();
    expect(bundleRadio).toBeDisabled();
    expect(bundleRadio).toBeChecked();

    // since the radio buttons are disabled, an error 
    // should be thrown upon attempting to click them
    expect(() => {
        userEvent.click(bundleRadio);
    }).toThrow();
    expect(() => {
        userEvent.click(blobRadio);
    }).toThrow();
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
});

test('NEW <BundleBlobRadio /> should handle blobs', () => {
    let {container} = render(
        <BundleBlobRadio is_bundle={false} readOnly={false} setIsBundle={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Is this DRS Object a bundle or a blob?');
    expect(screen.getByText(bundleBlobRadioSectionDescription)).toBeInTheDocument();

    // radio buttons should be displayed and blob option 
    // should be selected
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    let bundleRadio = screen.getByLabelText('Bundle');
    expect(bundleRadio).toBeInTheDocument();
    let blobRadio = screen.getByLabelText('Blob');
    expect(blobRadio).toBeInTheDocument();
    expect(blobRadio).not.toBeDisabled();
    expect(blobRadio).toBeChecked();
    expect(bundleRadio).not.toBeDisabled();
    expect(bundleRadio).not.toBeChecked();

    // radio buttons are clickable and pass the correct 
    // arguments to the callback function
    userEvent.click(blobRadio);
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
    userEvent.click(bundleRadio);
    expect(mockUpdateScalar.mock.calls.length).toBe(1);
    expect(mockUpdateScalar.mock.calls[0][0]).toBe(true);
});

test('NEW <BundleBlobRadio /> should handle bundles', () => {
    let {container} = render(
        <BundleBlobRadio is_bundle={true} readOnly={false} setIsBundle={mockUpdateScalar} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByRole('heading', {level: 6})).toHaveTextContent('Is this DRS Object a bundle or a blob?');

    // radio buttons should be displayed and bundle option
    // should be selected
    expect(screen.getByText(bundleBlobRadioSectionDescription)).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    let bundleRadio = screen.getByLabelText('Bundle');
    expect(bundleRadio).toBeInTheDocument();
    let blobRadio = screen.getByLabelText('Blob');
    expect(blobRadio).toBeInTheDocument();
    expect(blobRadio).not.toBeDisabled();
    expect(blobRadio).not.toBeChecked();
    expect(bundleRadio).not.toBeDisabled();
    expect(bundleRadio).toBeChecked();

    // radio buttons are clickable and pass the correct 
    // arguments to the callback function
    userEvent.click(bundleRadio);
    expect(mockUpdateScalar.mock.calls.length).toBe(0);
    userEvent.click(blobRadio);
    expect(mockUpdateScalar.mock.calls.length).toBe(1);
    expect(mockUpdateScalar.mock.calls[0][0]).toBe(false);
});