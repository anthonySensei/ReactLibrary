import { call } from 'redux-saga/effects';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import {
    updateAuthorService
} from '../../services/authorService';

import { SnackbarTypes } from '../../constants/snackbarTypes';
import { AUTHOR_FORM } from '../../constants/reduxForms';

import { resetFormHandler } from '../../helper/form';

import Author from '../../interfaces/Author';

interface UpdateAuthorSagaPayload {
    type: string;
    author: Author;
}

export function* updateAuthorSaga(payload: UpdateAuthorSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(updateAuthorService, payload.author);
        resetFormHandler(AUTHOR_FORM);
        handleSnackbarOpenService(
            SnackbarTypes.SUCCESS,
            response.data.data.updateAuthor
        );
        setLoadingService(false);
    } catch (err) {
        const errorMessage =
            err.response?.data?.errors.length > 0
                ? err.response.data.errors[0].message
                : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
