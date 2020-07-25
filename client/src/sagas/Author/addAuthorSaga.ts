import { call } from 'redux-saga/effects';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { addAuthorService } from '../../services/authorService';

import { SnackbarTypes } from '../../constants/snackbarTypes';
import { AUTHOR_FORM } from '../../constants/reduxForms';

import { resetFormHandler } from '../../helper/form';

import Author from '../../interfaces/Author';

interface AddAuthorSagaPayload {
    type: string;
    author: Author;
}

export function* addAuthorSaga(payload: AddAuthorSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(addAuthorService, payload.author);
        resetFormHandler(AUTHOR_FORM);
        handleSnackbarOpenService(
            true,
            SnackbarTypes.SUCCESS,
            response.data.data.addAuthor
        );
        setLoadingService(false);
    } catch (err) {
        const errorMessage =
            err.response?.data?.errors.length > 0
                ? err.response.data.errors[0].message
                : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
