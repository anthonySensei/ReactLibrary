import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { getAuthorsService } from '../../services/authorService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import Author from '../../interfaces/Author';

export function* getAuthorsSaga() {
    try {
        setLoadingService(true);
        const response = yield call(getAuthorsService);
        const authors: Author[] = response.data.authors;
        yield put({
            type: actionTypes.GET_AUTHORS,
            authors
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
