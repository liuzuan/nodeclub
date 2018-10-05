import { baseUrl } from './api';
import axios from 'axios';
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
); 
export default (method, url, data) => {
    let Url = baseUrl + url;
    return new Promise((resolve, reject) => {
        if (method === 'get') {
            axios.get(Url, { params: data })
                .then(res => resolve(res.data.data))
                .catch(err => reject(err));
        } else {
            axios.post(Url, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    });
};
