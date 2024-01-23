import axios from 'axios';
import constants from '../constants';
import { isAuthenticated } from './auth';
// import { decrypt, encrypt } from '../utils/crypto';

const api = async (method, urlEndPoint, data = {}, params = {}) => {
    try {
        let headers = {
            'Content-Type': 'application/json',
        };
        if (isAuthenticated()) {
            headers = {
                ...headers,
                Authorization: `Bearer ${isAuthenticated()}`,
            };
        }

        let req = data;
        // console.log(`Req=${method}=${urlEndPoint}\n`, req);
        // const payload = encrypt(req);
        // req = { payload };

        let response = await axios({
            method,
            url: constants.endPointUrl + urlEndPoint,
            data: req,
            headers,
            params,
        });

        let res = response.data;

        //If encription is added on backend, uncomment the code below
        // res = decrypt(res.payload);
        // console.log(`Res=${method}=${urlEndPoint}\n`, res);
        return res;
    } catch (error) {
        console.log(error);
        let res =error?.response? error.response.data:error.toString();
        //If encription is added on backend, uncomment the code below
        // res = decrypt(res.payload);
        // console.log(`Res=${method}=${urlEndPoint}\n`, res);
        return res;
    }
};
export const multipartApi = async (method, urlEndPoint, data = {}, query) => {
    try {
        let headers = {
            'Content-Type': 'multipart/form-data',
        };
        if (isAuthenticated()) {
            headers = {
                ...headers,
                Authorization: `Bearer ${isAuthenticated()}`,
            };
        }

        let req = data;
        // console.log(`Req=${method}=${urlEndPoint}\n`, req);
        // const payload = encrypt(req);
        // req = { payload };

        let response = await axios({
            method,
            url: constants.endPointUrl + urlEndPoint,
            data: req,
            headers,
        });

        let res = response.data;

        //If encription is added on backend, uncomment the code below
        // res = decrypt(res.payload);
        // console.log(`Res=${method}=${urlEndPoint}\n`, res);
        return res;
    } catch (error) {
        console.log(error);
        let res =error?.response? error.response.data:error.toString();

        //If encription is added on backend, uncomment the code below
        // res = decrypt(res.payload);
        // console.log(`Res=${method}=${urlEndPoint}\n`, res);
        return res;
    }
};

export default api;
