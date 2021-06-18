import '@fontsource/roboto';
import React, { 
  useEffect
} from 'react';
import axios from 'axios';

const useDrsObjectDetails = (drsObjectDetails, handleResponse, handleError, objectId) => {
    console.log('useDrsObjectDetails');
    console.log(drsObjectDetails);
    console.log(objectId);
    useEffect(() => {
        let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
        let requestUrl=(baseUrl+'objects/'+objectId);
        const cancelToken = axios.CancelToken;
        const drsShowCancelToken = cancelToken.source();
    
        let getDrsObjectDetails = async () => {
          await axios({
            url: requestUrl,
            method: 'GET',
            cancelToken: drsShowCancelToken.token
          })
          .then (
            (response) => {
              handleResponse(response.data);
            },
            (error) => {
              if (axios.isCancel(error)) {
                console.log('DrsShow request has been cancelled');
              }
              else {
                handleError(error);
              }
            }
          )
        } 
    
        if((!drsObjectDetails) || (!drsObjectDetails.name && objectId !== '')){
            console.log('make api request: ' + objectId);
            getDrsObjectDetails();
        }
    
        return () => {
          drsShowCancelToken.cancel('Cleanup DrsShow');
        };
    }, [objectId]);
}

export default useDrsObjectDetails;