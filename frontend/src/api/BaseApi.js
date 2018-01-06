import axios from 'axios';
import uuid from 'uuid/v1';

var authToken = typeof localStorage !== 'undefined' && localStorage.token;
if (!authToken) {
    authToken = uuid();
    if(typeof localStorage !== 'undefined') {
        localStorage.token = authToken;
    }
}

class BaseApi {

    config = {
        baseURL: 'http://localhost:3001/',
        headers: {
            'Authorization': authToken
        }
    };

    get(url) {
        return axios.get(url, this.config);
    }

    post(url, data) {
        return axios.post(url, data, this.config);
    }

    put(url, data) {
        return axios.put(url, data, this.config);
    }

    delete(url) {
        return axios.delete(url, this.config);
    }
}

export default BaseApi;