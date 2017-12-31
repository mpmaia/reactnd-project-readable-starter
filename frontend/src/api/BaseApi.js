import axios from 'axios';

class BaseApi {

    config = {
        baseURL: 'http://localhost:3001/',
        headers: {
            'Authorization': 'teste'
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