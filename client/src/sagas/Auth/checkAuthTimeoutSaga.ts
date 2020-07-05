import { call, delay } from 'redux-saga/effects';

import { logoutSaga } from './logoutSaga';

interface CheckAuthTimeoutSagaPayload {
    type: string;
    expirationTime: number;
}

export function* checkAuthTimeoutSaga(payload: CheckAuthTimeoutSagaPayload) {
    yield delay(payload.expirationTime);
    yield call(logoutSaga);
}
