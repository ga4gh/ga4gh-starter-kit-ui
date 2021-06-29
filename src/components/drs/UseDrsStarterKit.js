import '@fontsource/roboto';
import React, { 
  useEffect
} from 'react';
import axios from 'axios';

const makeRequest = async (requestConfig, handleResponse, handleError) => {
    await axios(requestConfig)
    .then (
      (response) => {
        handleResponse(response.data);
      },
      (error) => {
        if (axios.isCancel(error)) {
          console.log('API request has been cancelled');
        }
        else {
          handleError(error);
        }
      }
    )
  } 

const UseDrsStarterKit = (requestConfig, handleResponse, handleError, requestParameter, cancelToken) => {
    useEffect(() => {    
        if(requestParameter){
            console.log('make api request');
            makeRequest(requestConfig, handleResponse, handleError);
        }
        return () => {
          cancelToken.cancel('Cleanup API Request');
        };
    }, [requestParameter]);
}

export default UseDrsStarterKit;