import { authSaga } from './loginSaga';
import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../redux/actions/actionTypes';
import { logoutSaga } from './logoutSaga';

export default function* watchUserAuthentication() {
    yield takeLatest(actionTypes.LOGIN_USER, authSaga);
    yield takeLatest(actionTypes.INITIATE_LOGOUT_USER, logoutSaga);
}
