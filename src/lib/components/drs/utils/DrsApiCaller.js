import axios from 'axios';

const DrsApiCaller = (requestConfig, handleResponseData, handleError) => {
  console.log("drs api caller");
  axios(requestConfig)
  .then(response => {
    handleResponseData(response.data);
  })
  .catch(error => {
    console.log("there has been an error!");
    handleError(error)
  })
}

export default DrsApiCaller;
