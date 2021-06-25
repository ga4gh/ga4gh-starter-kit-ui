import '@fontsource/roboto';
import React, { 
  useEffect
} from 'react';
import axios from 'axios';

const getDrsObjectDetails = async (requestConfig, handleResponse, handleError) => {
    await axios(requestConfig)
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

const useApi = (requestConfig, handleResponse, handleError, requestParameter, cancelToken) => {
    useEffect(() => {    
        if(requestParameter){
            console.log('make api request');
            getDrsObjectDetails(requestConfig, handleResponse, handleError);
        }
    
        return () => {
          cancelToken.cancel('Cleanup DrsShow');
        };
    }, [requestParameter]);
}

export default useApi;