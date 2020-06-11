import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getBooksSaga } from './getBooksSaga';
import { getBookSaga } from './getBookSaga';

export default function* watchBooks() {
    yield takeEvery(actionTypes.GET_BOOKS, getBooksSaga);
    yield takeEvery(actionTypes.GET_BOOK, getBookSaga);
}
