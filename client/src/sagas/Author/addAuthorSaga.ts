import { call } from 'redux-saga/effects';

import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';
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
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
