import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

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
        default:
            return state;
    }
};

export default reducer;
