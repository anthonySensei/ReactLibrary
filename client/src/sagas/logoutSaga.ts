import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../redux/actions/actionTypes';

import { logoutUserService } from '../services/authService';

export function* logoutSaga() {
    try {
        yield call(logoutUserService);
        yield put({
            type: actionTypes.LOGOUT_USER
        });
    } catch (error) {}
}
