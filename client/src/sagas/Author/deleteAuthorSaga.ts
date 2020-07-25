import { call } from 'redux-saga/effects';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { deleteAuthorService } from '../../services/authorService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

interface DeleteAuthorSagaPayload {
    type: string;
    authorId: string;
}

export function* deleteAuthorSaga(payload: DeleteAuthorSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(deleteAuthorService, payload.authorId);
        handleSnackbarOpenService(
            true,
            SnackbarTypes.SUCCESS,
            response.data.data.deleteAuthor
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