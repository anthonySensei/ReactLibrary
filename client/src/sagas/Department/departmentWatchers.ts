import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getDepartmentsSaga } from './getDepartmentsSaga';

export default function* watchDepartments() {
    yield takeEvery(actionTypes.GET_DEPARTMENTS, getDepartmentsSaga);
}
