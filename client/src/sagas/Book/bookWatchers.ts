import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getBooksSaga } from './getBooksSaga';

export default function* watchBooks() {
    yield takeEvery(actionTypes.GET_BOOKS, getBooksSaga);
}
