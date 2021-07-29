import axios from 'axios';

const syncApiCaller = async requestConfig => {
    try {
        const data = await axios(requestConfig);
        return [true, data];
    } catch(error) {
        return [false, error];
    }
}

export default syncApiCaller;
