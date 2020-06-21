import axios from '../helper/axios';

import {
    LOGIN_URL,
    LOGOUT_URL,
    REGISTRATION_URL
} from '../constants/serverLinks';
import RegistrationFormData from '../interfaces/RegistrationFormData';

export const loginUserService = (request: any) => {
    return axios.post(LOGIN_URL, request.result).then(response => {
        return response;
    });
};

export const registrationService = (registrationValues: RegistrationFormData) => {
    return axios.post(REGISTRATION_URL, registrationValues).then(response => {
        return response;
    });
};

export const logoutUserService = () => {
    return axios.get(LOGOUT_URL).then(response => response);
};
