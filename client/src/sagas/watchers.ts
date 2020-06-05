import { authSaga } from './loginSaga';
import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../redux/actions/actionTypes';

export default function* watchUserAuthentication() {
    yield takeLatest(actionTypes.LOGIN_USER, authSaga);
}
