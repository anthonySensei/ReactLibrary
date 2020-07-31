import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

import axios from '../../helper/axios';

const initialState = {
    user: null,
    loginError: null,
    message: null,
    activationError: null
};

const reducer = (state = initialState, action: any) => {
    const response = action.response;

    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESS:
            return updateObject(state, {
                user: response.user,
                loginError: null
            });
        case actionTypes.REGISTRATION_SUCCESS:
            return updateObject(state, {
                message: response.message
            });
        case actionTypes.LOGIN_USER_ERROR:
            return updateObject(state, {
                loginError: action.error
            });
        case actionTypes.SET_LOGIN_ERROR:
            return updateObject(state, {
                loginError: action.result
            });
        case actionTypes.LOGOUT_USER:
            delete axios.defaults.headers.common.Authorization;

            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('user');
            return updateObject(state, {
                user: null
            });
        case actionTypes.ACTIVATE_USER_SUCCESS:
            return updateObject(state, {
                message: action.message
            });
        case actionTypes.ACTIVATE_USER_ERROR:
            return updateObject(state, {
                activationError: action.error
            });
        case actionTypes.CLEAR_AUTH:
            return updateObject(state, {
                activationError: null,
                loginError: null,
                user: null,
                message: null
            });
        default:
            return state;
    }
};

export default reducer;
