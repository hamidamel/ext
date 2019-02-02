/*global chrome*/

import axios from 'axios';
import {store} from './store';

const instance = axios.create({
    baseURL: `https://payesh.app/api/`,
    headers: {'Content-Type': 'application/json'},
});

instance.interceptors.request.use (
    function (config) {
        const token = store.token;
        console.log(token);
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject (error);
    }
);

export default instance
