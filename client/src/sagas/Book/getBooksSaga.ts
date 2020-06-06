import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import Book from '../../interfaces/Book';

import { getBooksService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { SnackbarTypes } from '../../constants/snackbarTypes';

export function* getBooksSaga() {
    try {
        setLoadingService(true);
        const response = yield call(getBooksService);
        const books: Book[] = response.data.books;
        yield put({
            type: actionTypes.GET_BOOKS_SUCCESS,
            books
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
        yield put({
            type: actionTypes.GET_BOOKS_ERROR,
            error: errorMessage
        });
    }
}
