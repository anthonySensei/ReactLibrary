import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getAllStudentsSaga } from './getAllStudentsSaga';

export default function* watchStudents() {
    yield takeEvery(actionTypes.GET_ALL_STUDENTS, getAllStudentsSaga);
}
