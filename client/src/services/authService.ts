import axios from '../helper/axios';

import { LOGIN_URL, LOGOUT_URL } from '../constants/serverLinks';

export const loginUserService = (request: any) => {
    return axios.post(LOGIN_URL, request.result).then(response => {
        return response;
    });
};

export const logoutUserService = () => {
    return axios.get(LOGOUT_URL).then(response => response);
};
