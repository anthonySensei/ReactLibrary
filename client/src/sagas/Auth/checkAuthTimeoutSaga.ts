import { call, delay } from 'redux-saga/effects';

import { logoutSaga } from './logoutSaga';

export function* checkAuthTimeoutSaga(action: any) {
    yield delay(action.expirationTime);
    yield call(logoutSaga);
}
