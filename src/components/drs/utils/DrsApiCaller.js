import axios from 'axios';

const DrsApiCaller = (requestConfig, handleResponseData, handleError) => {
  axios(requestConfig)
  .then(response => {
      handleResponseData(response.data);
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

export default DrsApiCaller;
