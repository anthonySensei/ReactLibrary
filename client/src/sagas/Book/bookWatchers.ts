import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getBooksSaga } from './getBooksSaga';
import { getBookSaga } from './getBookSaga';
import {moveBookSaga} from "./moveBookSaga";

export default function* watchBooks() {
    yield takeEvery(actionTypes.GET_BOOKS, getBooksSaga);
    yield takeEvery(actionTypes.GET_BOOK, getBookSaga);
    yield takeLatest(actionTypes.MOVE_BOOK, moveBookSaga);
}
