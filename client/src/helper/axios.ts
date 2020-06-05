import axios from 'axios';
import { TOKEN_START } from '../constants/tokenStart';

const instance = axios.create({
    baseURL: `http://localhost:3001/`
});

const token = localStorage.getItem('token');
if (token && token.includes(TOKEN_START)) {
    instance.defaults.headers.common.Authorization = token;
}

export default instance;
