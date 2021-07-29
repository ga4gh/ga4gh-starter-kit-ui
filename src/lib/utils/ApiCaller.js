import axios from 'axios';

const ApiCaller = (requestConfig, handleResponseData, handleError) => {
  axios(requestConfig)
  .then(response => {
    handleResponseData(response.data);
  })
  .catch(error => {
    handleError(error)
  })
}

export default ApiCaller;
