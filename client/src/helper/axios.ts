import axios from 'axios';

import { TOKEN_START } from '../constants/tokenStart';
import { SERVER_API_URL } from '../constants/serverLinks';

const instance = axios.create({
    baseURL: SERVER_API_URL
});

const token = localStorage.getItem('token');
if (token && token.includes(TOKEN_START)) {
    instance.defaults.headers.common.Authorization = token;
}

export default instance;
