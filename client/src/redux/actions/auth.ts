import * as actionTypes from './actionTypes';

export const loginUser = (res: any) => {
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
