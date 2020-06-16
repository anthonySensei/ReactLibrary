import { call } from 'redux-saga/effects';

import { orderBookService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import { getBook } from '../../redux/actions';

import { store } from '../../index';

export function* orderBookSaga(payload: any) {
    try {
        setLoadingService(true);
        const response = yield call(
            orderBookService,
            payload.studentId,
            payload.bookId
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
