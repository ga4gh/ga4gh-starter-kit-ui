import axios from 'axios';

const ApiCaller = (requestConfig, handleResponseData, handleError) => {
  axios(requestConfig)
  .then(response => {
    handleResponseData(response.data);
  })
  .catch(error => {
    console.log('caught the error');
    console.log(error);
    console.log(handleError);
    console.log("***");
    handleError(error)
  })
}

export default ApiCaller;
