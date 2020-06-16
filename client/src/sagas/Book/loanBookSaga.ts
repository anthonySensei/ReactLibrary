import { call } from 'redux-saga/effects';

import { loanBookService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import { store } from '../../index';

import { getBook } from '../../redux/actions';

export function* loanBookSaga(payload: any) {
    try {
        setLoadingService(true);
        const response = yield call(
            loanBookService,
            payload.studentId,
            payload.bookId,
            payload.librarianId
        );
        yield handleSnackbarOpenService(
            true,
            SnackbarTypes.SUCCESS,
            response.data.message
        );
        store.dispatch(getBook(payload.bookId));
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
