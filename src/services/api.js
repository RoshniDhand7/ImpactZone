import axios from 'axios';
import constants from '../constants';
import { getMyClub, isAuthenticated } from './auth';

const api = async (method, urlEndPoint, data = {}, params = {}, contentType = 'application/json') => {
    try {
        let headers = {
            'Content-Type': contentType,
            'ngrok-skip-browser-warning': '123',
        };
        if (isAuthenticated()) {
            headers = {
                ...headers,
                Authorization: `Bearer ${isAuthenticated()}`,
                club: getMyClub(),
            };
        }
        let req = data;

        let response = await axios({
            method,
            url: constants.endPointUrl + urlEndPoint,
            data: req,
            headers,
            params,
        });

        let res = response.data;
        return res;
    } catch (error) {
        let res = error?.response ? error.response.data : error.toString();
        return res;
    }
};

export default api;
