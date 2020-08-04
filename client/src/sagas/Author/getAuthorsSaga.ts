import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';
import { getAuthorsService } from '../../services/authorService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import Author from '../../interfaces/Author';

export function* getAuthorsSaga() {
    try {
        const response = yield call(getAuthorsService);
        const authors: Author[] = response.data.data.authors;
        yield put({
            type: actionTypes.GET_AUTHORS_SUCCESS,
            authors
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
