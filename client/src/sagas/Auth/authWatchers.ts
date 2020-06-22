import { authSaga } from './loginSaga';
import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { logoutSaga } from './logoutSaga';
import { checkAuthStateSaga } from './checkAuthStateSaga';
import { checkAuthTimeoutSaga } from './checkAuthTimeoutSaga';
import { registrationSaga } from './registrationSage';
import { activateUserSaga } from './activateUserSaga';

export default function* watchUserAuthentication() {
    yield takeLatest(actionTypes.LOGIN_USER, authSaga);
    yield takeEvery(actionTypes.CHECK_STATE, checkAuthStateSaga);
    yield takeEvery(actionTypes.AUTO_LOGOUT, checkAuthTimeoutSaga);
    yield takeLatest(actionTypes.INITIATE_LOGOUT_USER, logoutSaga);
    yield takeLatest(actionTypes.REGISTRATION, registrationSaga);
    yield takeLatest(actionTypes.ACTIVATE_USER, activateUserSaga);
}
