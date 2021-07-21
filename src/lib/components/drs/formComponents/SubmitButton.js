import React from 'react';
import {
    FormControl,
    Button
} from '@material-ui/core'
import {
    useHistory
} from 'react-router-dom';
import SpaceDivider from '../../common/SpaceDivider';
import FormViewType from '../../../model/common/FormViewType';
import DrsApiCaller from '../utils/DrsApiCaller';

/*
    Used to make a POST or PUT requests to create or update a new DRS Object.
    If the request is successful, the user is redirected to the DRS Index
    page and a success message is displayed. However, if it is unsuccessful, 
    the user is not redirected and an error message is displayed.
*/
const SubmitButton = props => {

    const history = useHistory();

    const submit = () => {

        const validateActiveDrsObject = () => {
            let [isValid, message] = [true, ''];

            // validate Id
            if (props.activeDrsObject.id === '' || props.activeDrsObject.id === null) {
                return [false, `'id' parameter must be set`];
            }

            // validate children and parents arrays
            const validateRelativesArray = (relatives, name) => {
                relatives.forEach((relative, index) => {
                    if (relative.isValid !== true) {
                        [isValid, message] = [false, `Invalid ${name} at position: ${index}, id: '${relative.id}'`];
                        return;
                    }
                })
            }

            validateRelativesArray(props.activeDrsObject.drs_object_children, 'child');
            if (!isValid) {
                return [isValid, message];
            }

            validateRelativesArray(props.activeDrsObject.drs_object_parents, 'parent');
            if (!isValid) {
                return [isValid, message];
            }

            return [isValid, message];
        }

        // prepares the request body from the activeDrsObject
        const prepareRequestBody = () => {
            let requestBody = {...props.activeDrsObject};
            let blobOnlyParams = ['mime_type', 'size', 'checksums', 'file_access_objects', 'aws_s3_access_objects'];
            let bundleOnlyParams = ['drs_object_children'];
            let toUnsetIfBundle = {
                'true': blobOnlyParams,
                'false': bundleOnlyParams 
            }
            toUnsetIfBundle[requestBody.is_bundle].forEach(toUnset => delete requestBody[toUnset]);
            return requestBody;
        }

        const determineRequestConfig = requestBody => {
            let requestConfig = {};
            switch (props.formViewType) {
                case FormViewType.NEW:
                    requestConfig = {
                        url: 'http://localhost:8080/admin/ga4gh/drs/v1/objects',
                        method: 'POST'
                    }
                    break;
                case FormViewType.EDIT:
                    requestConfig = {
                        url: `http://localhost:8080/admin/ga4gh/drs/v1/objects/${props.activeDrsObject.id}`,
                        method: 'PUT'
                    }
                    break
            }
            requestConfig.data = requestBody;
            return requestConfig;
        }

        const executeApiCall = requestConfig => {
            DrsApiCaller(
                requestConfig,
                responseData => {
                    props.setSuccessMessage(`Successfully created DrsObject with id: '${responseData.id}'`);
                    props.retrieveDrsObjectsList();
                    history.push('/drs');
                },
                props.setError
            );
        }

        let [isValid, message] = validateActiveDrsObject();
        if (!isValid) {
            props.setError(new Error(message));
            return;
        }
        let requestBody = prepareRequestBody();
        let requestConfig = determineRequestConfig(requestBody);
        executeApiCall(requestConfig);
    }

    return (
        <FormControl fullWidth>
            <SpaceDivider/>
            <Button
                variant='contained'
                color='primary'
                onClick={submit}
            >
                Submit
            </Button>
        </FormControl>
    )
}

export default SubmitButton;
