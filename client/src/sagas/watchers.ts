import { authSaga } from './loginSaga';
import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../redux/actions/actionTypes';

import { logoutSaga } from './logoutSaga';
import { checkAuthStateSaga } from './checkAuthStateSaga';
import { checkAuthTimeoutSaga } from './checkAuthTimeoutSaga';

export default function* watchUserAuthentication() {
    yield takeLatest(actionTypes.LOGIN_USER, authSaga);
    yield takeEvery(actionTypes.CHECK_STATE, checkAuthStateSaga);
    yield takeEvery(actionTypes.AUTO_LOGOUT, checkAuthTimeoutSaga);
    yield takeLatest(actionTypes.INITIATE_LOGOUT_USER, logoutSaga);
}
