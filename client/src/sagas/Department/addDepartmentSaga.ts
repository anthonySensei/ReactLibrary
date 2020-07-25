import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import {
    addDepartmentService,
    getDepartmentsService
} from '../../services/departmentService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import Department from '../../interfaces/Department';
import LoginData from '../../interfaces/formsData/LoginData';
import { resetFormHandler } from '../../helper/form';
import { DEPARTMENT_FORM } from '../../constants/reduxForms';

interface AddDepartmentSagaPayload {
    type: string;
    department: Department;
}

export function* addDepartmentSaga(payload: AddDepartmentSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(addDepartmentService, payload.department);
        resetFormHandler(DEPARTMENT_FORM);
        handleSnackbarOpenService(
            true,
            SnackbarTypes.SUCCESS,
            response.data.message
        );
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
