import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

import axios from '../../helper/axios';

const initialState = {
    user: null,
    loginError: null
};

const reducer = (state = initialState, action: any) => {
    const response = action.response;

    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESS:
            return updateObject(state, {
                user: response.user,
                loginError: null
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
                error: null,
                user: null
            });
        default:
            return state;
    }
};

export default reducer;
