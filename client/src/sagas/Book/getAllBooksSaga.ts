import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import Book from '../../interfaces/Book';

import { getAllBooksService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

export function* getAllBooksSaga() {
    try {
        setLoadingService(true);
        const response = yield call(getAllBooksService);
        const books: Book[] = response.data.books;
        yield put({
            type: actionTypes.GET_ALL_BOOKS_SUCCESS,
            books
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
