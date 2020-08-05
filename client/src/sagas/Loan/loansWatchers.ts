import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getStatisticSaga } from './getStatisticSaga';

export default function* watchLoans() {
    yield takeEvery(actionTypes.GET_STATISTIC, getStatisticSaga);
}
