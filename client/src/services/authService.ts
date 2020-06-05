import axios from '../helper/axios';

import { LOGIN_URL } from '../constants/serverLinks';

export const authUserService = (request: any) => {
    return axios.post(LOGIN_URL, request.result).then(response => {
        return response;
    });
};
