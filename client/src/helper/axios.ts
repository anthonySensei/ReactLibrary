import axios from 'axios';

import { TOKEN_START } from '../constants/tokenStart';
import { SERVER_URL } from '../constants/serverLinks';

const instance = axios.create({
    baseURL: process.env.SERVER_URL ? process.env.SERVER_URL : SERVER_URL
});

const token = localStorage.getItem('token');
if (token && token.includes(TOKEN_START)) {
    instance.defaults.headers.common.Authorization = token;
}

export default instance;
