import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import { loginUserService } from '../../services/authService';

import axios from '../../helper/axios';

import LoginData from '../../interfaces/formsData/LoginData';
import User from "../../interfaces/User";

interface LoginSagaPayload {
    type: string;
    result: LoginData;
}

export function* authSaga(payload: LoginSagaPayload) {
    try {
        const response = yield call(loginUserService, payload.result);
        const token: string = response.data.token;
        const tokenExpiresIn: number = response.data.tokenExpiresIn;
        const user: User = response.data.user;
        const expirationDate: Date = new Date(
            new Date().getTime() + tokenExpiresIn * 1000
        );

        axios.defaults.headers.common.Authorization = token;

        yield localStorage.setItem('token', token);
        yield localStorage.setItem('expirationDate', expirationDate.toString());
        yield localStorage.setItem('user', JSON.stringify(user));

        yield put({
            type: actionTypes.LOGIN_USER_SUCCESS,
            response: { user, token }
        });

        yield put({
            type: actionTypes.AUTO_LOGOUT,
            expirationTime: expirationDate.getTime() - new Date().getTime()
        });
    } catch (err) {
        yield put({
            type: actionTypes.LOGIN_USER_ERROR,
            error: err.response ? err.response.data.message : 'Error'
        });
    }
}
