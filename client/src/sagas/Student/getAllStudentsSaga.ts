import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { getAllStudentsService } from '../../services/studentService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import Student from '../../interfaces/Student';

export function* getAllStudentsSaga() {
    try {
        setLoadingService(true);
        const response = yield call(getAllStudentsService);
        const students: Student[] = response.data.students;
        yield put({
            type: actionTypes.GET_ALL_STUDENTS_SUCCESS,
            students
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
