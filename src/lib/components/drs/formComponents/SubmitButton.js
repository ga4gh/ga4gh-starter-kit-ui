import React from 'react';
import {
    FormControl,
    Button
} from '@material-ui/core'
import SpaceDivider from '../../common/SpaceDivider';
import FormViewType from '../../../../model/common/FormViewType';
import DrsApiCaller from '../utils/DrsApiCaller';

/*
    Used to make a POST or PUT request to create or update a new DRS Object.
    If the id field is empty or if any of the related DRS Objects are invalid,
    the InvalidDrsObjectMessage component is displayed and the button is
    disabled. When the SubmitButton is clicked, the activeDrsObject is
    "cleaned up" to ensure that the correct properties are submitted to the
    POST/PUT request based on whether the DRS Object is a blob or a bundle. If
    the POST request is successful, the user is redirected to the DRS Index
    page. However, if it is unsuccessful, the user is not redirected and the
    ErrorMessage component is displayed.
*/
const SubmitButton = props => {

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
                    // TODO HANDLE EDIT REQUEST CONFIG
                    break
            }
            requestConfig.data = requestBody;
            return requestConfig;
        }

        const executeApiCall = requestConfig => {
            DrsApiCaller(
                requestConfig,
                responseData => props.setSuccessMessage(`Successfully created DrsObject with id: '${responseData.id}'`),
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

// const SubmitButton = (props) => {
    /*
    const [error, setError] = useState(null);
    const scalarProperties = ['description', 'created_time', 'name', 'updated_time', 'version', 'is_bundle'] 
    const blobScalarProperties = ['mime_type', 'size']
    const blobListProperties = ['aliases', 'checksums', 'drs_object_parents', 'file_access_objects', 'aws_s3_access_objects'];
    const bundleListProperties = ['aliases', 'drs_object_parents', 'drs_object_children'];

    let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
    let requestUrl=(baseUrl+'objects');
    const cancelToken = axios.CancelToken;
    const newDrsCancelToken = cancelToken.source();

    let requestConfig = {
        url: requestUrl,
        method: 'POST',
        data: newDrsObjectToSubmit,
        cancelToken: newDrsCancelToken.token
    };
    
    const relatedDrsObjects = (property) => {
        let relatedDrsObjects = [];
        if(activeDrsObject[property]) {
            activeDrsObject[property].map((relatedDrs) => {
                if(relatedDrs.isValid) {
                    let relatedDrsObject = {
                        id: relatedDrs.id
                    }
                    relatedDrsObjects.push(relatedDrsObject);    
                }
            })
        }
        return relatedDrsObjects;   
    }

    const getNewDrsObject = () => {
        let newDrsObject = {
            id: activeDrsObject.id
        };

        scalarProperties.map((property) => {
            if(activeDrsObject[property]) {
                newDrsObject[property] = activeDrsObject[property];
            }
        })

        if(!activeDrsObject.is_bundle) {
            blobScalarProperties.map((property) => {
                if(activeDrsObject[property]) {
                    newDrsObject[property] = activeDrsObject[property];
                }
            })
            blobListProperties.map((property) => {
                if(activeDrsObject[property] && Object.keys(activeDrsObject[property]).length > 0) {
                    if(property === 'drs_object_parents') {
                        newDrsObject[property] = relatedDrsObjects(property);
                    }
                    else {
                        newDrsObject[property] = activeDrsObject[property];
                    }
                }
            })
        }
        else { 
            bundleListProperties.map((property) => {
                if(activeDrsObject[property] && Object.keys(activeDrsObject[property]).length > 0) {
                    if(property === 'aliases') {
                        newDrsObject[property] = activeDrsObject[property];
                    }
                    else {
                        newDrsObject[property] = relatedDrsObjects(property);
                    }
                }
            })
        }
        console.log(newDrsObject); 
        return newDrsObject;   
    }

    const handleResponse = (response) => {
        console.log(response);
        props.updateSubmitNewDrsRedirect(true);
    }

    const handleError = (error) => {
        console.log(error);
        setError(error);
    }

    let submitButtonDisabled = false;
    if(!activeDrsObject.validId || !activeDrsObject.validRelatedDrsObjects) {
        submitButtonDisabled = true;
    } 
    else {
        submitButtonDisabled = false;
    }

    /* UseDrsStarterKit hook is used to make API POST request. The hook is called when the SubmitButton component is rendered and passes the 
    newDrsObjectToSubmit object within the request body. Prior to clicking the "Submit" button for the first time, newDrsObjectToSubmit is an 
    empty object, and therefore the POST request is not made. When the "Submit" button is clicked, the newDrsObjectToSubmit property is updated, 
    resulting in the POST request being made. */
    /*
    DrsApiCaller(requestConfig, handleResponse, handleError, newDrsObjectToSubmit.id, newDrsCancelToken);

    if(!props.readOnlyForm) {
        return (
            <FormControl fullWidth>
                <SpaceDivider/>
                <ErrorMessage error={error} />
                <InvalidDrsObjectMessage validId={activeDrsObject.validId} validRelatedDrs={activeDrsObject.validRelatedDrsObjects}/>
                <Button variant='contained' color='primary' disabled={submitButtonDisabled}
                onClick={() => 
                {
                    let newDrsObject = getNewDrsObject();
                    if(!error && activeDrsObject.validId && activeDrsObject.validRelatedDrsObjects) {
                        setNewDrsObjectToSubmit(newDrsObject);
                    }
                }}>
                    Submit
                </Button>
            </FormControl>
        );
    }
    else return null;
    */
// }