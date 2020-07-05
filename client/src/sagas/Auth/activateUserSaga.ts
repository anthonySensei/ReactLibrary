import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import { activateUserService } from '../../services/authService';

interface ActivateUserSagaPayload {
    type: string;
    result: string;
}

export function* activateUserSaga(payload: ActivateUserSagaPayload) {
    try {
        const response = yield call(activateUserService, payload.result);
        yield put({
            type: actionTypes.ACTIVATE_USER_SUCCESS,
            message: response.data.message
        });
        yield put({ type: actionTypes.SET_LOADING_INDICATOR, result: false });
    } catch (error) {
        yield put({
            type: actionTypes.ACTIVATE_USER_ERROR,
            error: error.response ? error.response.data.message : 'Error'
        });
        yield put({ type: actionTypes.SET_LOADING_INDICATOR, result: false });
    }
}
