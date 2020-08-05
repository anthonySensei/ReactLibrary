import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';
import { getAllStudentsService } from '../../services/studentService';

import { SnackbarTypes } from '../../constants/snackbarTypes';
import Librarian from '../../interfaces/Librarian';
import { getAllLibrariansService } from '../../services/librarianService';

export function* getAllLibrariansSaga() {
    try {
        setLoadingService(true);
        const response = yield call(getAllLibrariansService);
        const librarians: Librarian[] = response.data.librarians;
        yield put({
            type: actionTypes.GET_ALL_LIBRARIANS_SUCCESS,
            librarians
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
