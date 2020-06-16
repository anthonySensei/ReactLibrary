import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import Book from '../../interfaces/Book';

import { getBookService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { SnackbarTypes } from '../../constants/snackbarTypes';

export function* getBookSaga(payload: any) {
    try {
        setLoadingService(true);
        const response = yield call(getBookService, payload.bookId);
        const book: Book = response.data.book;
        yield put({
            type: actionTypes.GET_BOOK_SUCCESS,
            book
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
