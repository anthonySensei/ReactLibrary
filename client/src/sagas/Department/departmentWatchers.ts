import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getDepartmentsSaga } from './getDepartmentsSaga';
import { addDepartmentSaga } from './addDepartmentSaga';

export default function* watchDepartments() {
    yield takeEvery(actionTypes.GET_DEPARTMENTS, getDepartmentsSaga);
    yield takeEvery(actionTypes.ADD_DEPARTMENT, addDepartmentSaga);
}
