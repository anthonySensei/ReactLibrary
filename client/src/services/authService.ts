import axios from '../helper/axios';

import {
    ACTIVATE_USER_URL,
    LOGIN_URL,
    LOGOUT_URL,
    REGISTRATION_URL
} from '../constants/serverLinks';
import RegistrationFormData from '../interfaces/RegistrationFormData';

export const loginUserService = async (request: any) => {
    return await axios.post(LOGIN_URL, request.result);
};

export const registrationService = async (
    registrationValues: RegistrationFormData
) => {
    return await axios.post(REGISTRATION_URL, registrationValues);
};

export const logoutUserService = async () => {
    return await axios.get(LOGOUT_URL);
};

export const activateUserService = async (activationToken: string) => {
    return await axios.post(ACTIVATE_USER_URL, { activationToken });
};
