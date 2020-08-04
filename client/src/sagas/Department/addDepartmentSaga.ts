import { call } from 'redux-saga/effects';

import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';
import { addDepartmentService } from '../../services/departmentService';

import { SnackbarTypes } from '../../constants/snackbarTypes';
import { DEPARTMENT_FORM } from '../../constants/reduxForms';

import Department from '../../interfaces/Department';

import { resetFormHandler } from '../../helper/form';


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
            SnackbarTypes.SUCCESS,
            response.data.message
        );
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
