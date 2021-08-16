import React from 'react';
import {
    FormControl,
    Button
} from '@material-ui/core'
import {
    useHistory
} from 'react-router-dom';
import { SpaceDivider } from '../../../../common/layout';
import FormViewType from '../../../../../model/common/FormViewType';
import { scrollToTop } from '../../../../../functions/common';
import ApiCaller from '../../../../../utils/ApiCaller';

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
                return [false, `'Id' parameter must be set`];
            }

            // validate aliases
            props.activeDrsObject.aliases.forEach((alias, index) => {
                if (!alias) {
                    return [isValid, message] = [false, `Invalid 'Alias' at position: ${index}`];
                }
            })

            if(!props.activeDrsObject.is_bundle) {
                // validate checksums
                props.activeDrsObject.checksums.forEach((checksum, index) => {
                    if (!checksum.type || !checksum.checksum) {
                        return [isValid, message] = [false, `Invalid 'Checksum' at position ${index}`];
                    }
                })

                //validate file access objects
                props.activeDrsObject.file_access_objects.forEach((fileAccessObject, index) => {
                    if (!fileAccessObject.path) {
                        return [isValid, message] = [false, `Invalid 'Local File Access Point' at position: ${index}`];
                    }
                })

                //  validate AWS S3 access objects
                props.activeDrsObject.aws_s3_access_objects.forEach((awsS3AccessObject, index) => {
                    if (!awsS3AccessObject.region || !awsS3AccessObject.bucket || !awsS3AccessObject.key) {
                        return [isValid, message] = [false, `Invalid 'AWS S3 Access Point' at position ${index}`];
                    }
                })    
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

            if(props.activeDrsObject.is_bundle) {
                validateRelativesArray(props.activeDrsObject.drs_object_children, 'child');
                if (!isValid) {
                    return [isValid, message];
                }    
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
                        url: `${props.adminURL}/admin/ga4gh/drs/v1/objects`,
                        method: 'POST'
                    }
                    break;
                case FormViewType.EDIT:
                    requestConfig = {
                        url: `${props.adminURL}/admin/ga4gh/drs/v1/objects/${props.activeDrsObject.id}`,
                        method: 'PUT'
                    }
                    break
            }
            requestConfig.data = requestBody;
            return requestConfig;
        }

        const determineSuccessMessage = id => {
            let successMessage = '';
            switch (props.formViewType) {
                case FormViewType.NEW:
                    successMessage = `Successfully created DrsObject with id: '${id}'`;
                break;
                case FormViewType.EDIT: 
                    successMessage = `Successfully updated DrsObject with id: '${id}'`;
                break;
            }
            return successMessage;
        }

        const executeApiCall = requestConfig => {
            ApiCaller(
                requestConfig,
                responseData => {
                    props.setSuccessMessage(determineSuccessMessage(responseData.id));
                    props.retrieveDrsObjectsList();
                    history.push(props.baseURL);
                    scrollToTop();
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
