import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { getDepartmentsService } from '../../services/departmentService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import Department from '../../interfaces/Department';

export function* getDepartmentsSaga() {
    try {
        setLoadingService(true);
        const response = yield call(getDepartmentsService);
        const departments: Department[] = response.data.departments;
        yield put({
            type: actionTypes.GET_DEPARTMENTS_SUCCESS,
            departments
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
