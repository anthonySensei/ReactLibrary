import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getAuthorsSaga } from './getAuthorsSaga';
import { addAuthorSaga } from './addAuthorSaga';
import { deleteAuthorSaga } from './deleteAuthorSaga';
import { updateAuthorSaga } from './updateAuthorSaga';

export default function* watchAuthors() {
    yield takeEvery(actionTypes.GET_AUTHORS, getAuthorsSaga);
    yield takeLatest(actionTypes.ADD_AUTHOR, addAuthorSaga);
    yield takeLatest(actionTypes.DELETE_AUTHOR, deleteAuthorSaga);
    yield takeLatest(actionTypes.UPDATE_AUTHOR, updateAuthorSaga);
}
