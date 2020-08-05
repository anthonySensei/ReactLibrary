import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getBooksSaga } from './getBooksSaga';
import { getBookSaga } from './getBookSaga';
import { moveBookSaga } from './moveBookSaga';
import { loanBookSaga } from './loanBookSaga';
import { orderBookSaga } from './orderBookSaga';
import { addBookSaga } from './addBookSaga';
import { getAllBooksSaga } from './getAllBooksSaga';

export default function* watchBooks() {
    yield takeEvery(actionTypes.GET_BOOKS, getBooksSaga);
    yield takeEvery(actionTypes.GET_BOOK, getBookSaga);
    yield takeEvery(actionTypes.GET_ALL_BOOKS, getAllBooksSaga);
    yield takeLatest(actionTypes.MOVE_BOOK, moveBookSaga);
    yield takeLatest(actionTypes.LOAN_BOOK, loanBookSaga);
    yield takeLatest(actionTypes.ORDER_BOOK, orderBookSaga);
    yield takeLatest(actionTypes.ADD_BOOK, addBookSaga);
}
