import { put } from 'redux-saga/effects';

import * as actionTypes from '../redux/actions/actionTypes';

export function* checkAuthStateSaga(payload: any) {
    if (!payload.token) {
        yield put({ type: actionTypes.LOGOUT_USER });
    } else {
        let date: Date = new Date();
        const localStorageDate: string | null = localStorage.getItem(
            'expirationDate'
        );
        if (localStorageDate) {
            date = new Date(localStorageDate);
        }
        const expirationDate: Date = new Date(date);
        if (expirationDate <= new Date()) {
            yield put({ type: actionTypes.LOGOUT_USER });
        } else {
            yield put({
                type: actionTypes.LOGIN_USER_SUCCESS,
                response: {
                    token: payload.token,
                    user: payload.user
                }
            });
        }
    }
}
