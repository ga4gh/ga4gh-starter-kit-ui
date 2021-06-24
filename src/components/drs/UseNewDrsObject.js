import '@fontsource/roboto';
import React, { 
  useEffect
} from 'react';
import axios from 'axios';

const useNewDrsObject = (handleResponse, handleError, newDrsObjectData) => {
    useEffect(() => {
        let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
        let requestUrl=(baseUrl+'objects');
        const cancelToken = axios.CancelToken;
        const drsShowCancelToken = cancelToken.source();
    
        let newDrsObject = async () => {
          await axios({
            url: requestUrl,
            method: 'POST',
            //headers: {'Content-Type': 'application/json'},
            data: newDrsObjectData,
            cancelToken: drsShowCancelToken.token
          })
          .then (
            (response) => {
              console.log(response.headers);
              handleResponse(response.data);
            },
            (error) => {
              if (axios.isCancel(error)) {
                console.log('NewDrs request has been cancelled');
              }
              else {
                handleError(error);
              }
            }
          )
        } 
    
        if((newDrsObjectData)){
          console.log('make api request');
          //newDrsObject();
        }
    
        return () => {
          drsShowCancelToken.cancel('Cleanup DrsShow');
        };
    }, [newDrsObjectData]);
}

export default useNewDrsObject;