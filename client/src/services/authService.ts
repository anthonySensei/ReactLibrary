import axios from '../helper/axios';

import {
    ACTIVATE_USER_URL,
    LOGIN_URL,
    LOGOUT_URL,
    REGISTRATION_URL
} from '../constants/serverLinks';

import RegistrationData from '../interfaces/RegistrationData';
import LoginData from '../interfaces/Login';

export const loginUserService = async (loginData: LoginData) => {
    return await axios.post(LOGIN_URL, loginData);
};

export const registrationService = async (
    registrationValues: RegistrationData
) => {
    return await axios.post(REGISTRATION_URL, registrationValues);
};

export const logoutUserService = async () => {
    return await axios.get(LOGOUT_URL);
};

export const activateUserService = async (activationToken: string) => {
    return await axios.post(ACTIVATE_USER_URL, { activationToken });
};
