import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getDepartmentsSaga } from './getDepartmentsSaga';
import { addDepartmentSaga } from './addDepartmentSaga';

export default function* watchDepartments() {
    yield takeEvery(actionTypes.GET_DEPARTMENTS, getDepartmentsSaga);
    yield takeLatest(actionTypes.ADD_DEPARTMENT, addDepartmentSaga);
}
