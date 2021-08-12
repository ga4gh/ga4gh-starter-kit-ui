import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import SubmitButton from '../../../../../lib/components/drs/formComponents/SubmitButton';
import {
    mockValidTestBlob, 
    mockValidTestBundle
} from '../../../../resources/MockData';
import {
    setSuccessMessage, 
    retrieveDrsObjectsList, 
    setError
} from '../../../../resources/MockFunctions';

jest.mock('../../../../../lib/components/drs/utils/DrsApiCaller');
import DrsApiCaller from '../../../../../lib/components/drs/utils/DrsApiCaller';
DrsApiCaller.mockImplementation(() => {
    setSuccessMessage(`Successfully submitted DrsObject with id: '${mockValidTestBlob.id}'`);
    retrieveDrsObjectsList();
});

let submitMockFunctions = null;

beforeEach(() => {
    submitMockFunctions = {
        setSuccessMessage: setSuccessMessage,
        retriveDrsObejctsList: retrieveDrsObjectsList,
        setError: setError,
    }
});

afterEach(() => {
    setSuccessMessage.mockClear();
    retrieveDrsObjectsList.mockClear();
    setError.mockClear();
});

test('<SubmitButton/> can handle submitting a valid blob', () => {
    let activeDrsObject = {...mockValidTestBlob};
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    let submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);
    expect(setSuccessMessage).toHaveBeenCalled();
    expect(retrieveDrsObjectsList).toHaveBeenCalled();
    expect(setError).not.toHaveBeenCalled();
});

test('<SubmitButton/> can handle submitting a valid bundle', () => {
    let activeDrsObject = {...mockValidTestBundle};
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    expect(container.firstChild).toMatchSnapshot();
    let submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);
    expect(setSuccessMessage).toHaveBeenCalled();
    expect(retrieveDrsObjectsList).toHaveBeenCalled();
    expect(setError).not.toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid id', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.id = '';
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid aliases', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.aliases = ["NewDrsAlias", ""];
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid checksum type', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.checksums[0] = [{"checksum": "1234", "type": ""}];
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid checksum value', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.checksums[0] = [{"checksum": "", "type": "md5"}];
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid file access object', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.file_access_objects[0] = [
        {
            "path": ""
        }
    ];
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid AWS S3 access object region', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.aws_s3_access_objects[0] = [
        {
            "region": "",
            "bucket": "test-bucket",
            "key": "test-key"
        }
    ];
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid AWS S3 access object bucket', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.aws_s3_access_objects[0] = [
        {
            "region": "test-region",
            "bucket": "",
            "key": "test-key"
        }
    ];
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle invalid AWS S3 access object key', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.aws_s3_access_objects[0] = [
        {
            "region": "test-region",
            "bucket": "test-bucket",
            "key": ""
        }
    ];
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle submitting a blob with an invalid parent', () => {
    let activeDrsObject = {...mockValidTestBlob};
    activeDrsObject.drs_object_parents[0].isValid = false;
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});

test('<SubmitButton/> can handle submitting a bundle with an invalid child', () => {
    let activeDrsObject = {...mockValidTestBundle};
    activeDrsObject.drs_object_children[0].isValid = false;
    let {container} = render(
        <SubmitButton 
            activeDrsObject={activeDrsObject}
            formViewType='NEW'
            {...submitMockFunctions}
        />
    );
    userEvent.click(screen.getByRole('button'));
    expect(setSuccessMessage).not.toHaveBeenCalled();
    expect(retrieveDrsObjectsList).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
});