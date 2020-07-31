import * as actionTypes from './actionTypes';
import { TOKEN_START } from '../../constants/tokenStart';

import User from '../../interfaces/User';
import RegistrationData from '../../interfaces/formsData/RegistrationData';
import LoginData from '../../interfaces/formsData/LoginData';

export const loginUser = (res: LoginData) => {
    return {
        type: actionTypes.LOGIN_USER,
        result: res
    };
};

export const setLoginError = (result: boolean) => {
    return {
        type: actionTypes.SET_LOGIN_ERROR,
        result: result
    };
};

export const logout = () => {
    return {
        type: actionTypes.INITIATE_LOGOUT_USER
    };
};

export const registration = (registrationData: RegistrationData) => {
    return {
        type: actionTypes.REGISTRATION,
        registrationData
    };
};

export const checkState = () => {
    const token: string | null = localStorage.getItem('token');
    if (token && !token.includes(TOKEN_START)) {
        return {
            type: actionTypes.LOGOUT_USER
        };
    }
    let user: User | null = null;
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
        user = JSON.parse(localStorageUser);
    }
    return {
        type: actionTypes.CHECK_STATE,
        token,
        user
    };
};

export const activateUser = (activationToken: string) => {
    return {
        type: actionTypes.ACTIVATE_USER,
        result: activationToken
    };
};

export const clearAuth = () => {
    return {
        type: actionTypes.CLEAR_AUTH
    };
};
