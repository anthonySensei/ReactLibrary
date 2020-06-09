import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import { loginUserService } from '../../services/authService';

import axios from '../../helper/axios';

export function* authSaga(payload: any) {
    try {
        const response = yield call(loginUserService, payload);
        const token: string = response.data.token;
        const tokenExpiresIn: number = response.data.tokenExpiresIn;
        const user = response.data.user;
        const expirationDate: Date = new Date(
            new Date().getTime() + tokenExpiresIn * 1000
        );

        axios.defaults.headers.common.Authorization = token;

        yield localStorage.setItem('token', token);
        yield localStorage.setItem(
            'expirationDate',
            expirationDate.toString()
        );
        yield localStorage.setItem('user', JSON.stringify(user));

        yield put({
            type: actionTypes.LOGIN_USER_SUCCESS,
            response: { user, token }
        });

        yield put({
            type: actionTypes.AUTO_LOGOUT,
            expirationTime: tokenExpiresIn * 1000 - new Date().getTime()
        });
    } catch (err) {
        yield put({
            type: actionTypes.LOGIN_USER_ERROR,
            error: err.response ? err.response.data.message : 'Error'
        });
    }
}
