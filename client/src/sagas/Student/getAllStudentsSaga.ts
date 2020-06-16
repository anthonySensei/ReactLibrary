import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import Student from '../../interfaces/Student';
import { getAllStudents } from '../../redux/actions';
import {getAllStudentsService} from "../../services/studentService";

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
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
