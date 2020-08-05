import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getAllLibrariansSaga } from './getAllLibrariansSaga';

export default function* watchLibrarians() {
    yield takeEvery(actionTypes.GET_ALL_STUDENTS, getAllLibrariansSaga);
}
