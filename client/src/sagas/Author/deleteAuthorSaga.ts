import { call } from 'redux-saga/effects';

import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';
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
        handleSnackbarOpenService( SnackbarTypes.ERROR, errorMessage);
    }
}
