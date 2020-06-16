import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getAuthorsSaga } from './getAuthorsSaga';

export default function* watchAuthors() {
    yield takeEvery(actionTypes.GET_AUTHORS, getAuthorsSaga);
}
