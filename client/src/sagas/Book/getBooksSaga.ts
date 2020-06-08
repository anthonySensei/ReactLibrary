import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import Book from '../../interfaces/Book';

import { getBooksService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { SnackbarTypes } from '../../constants/snackbarTypes';

export function* getBooksSaga(payload: any) {
    try {
        setLoadingService(true);
        const response = yield call(
            getBooksService,
            payload.page,
            payload.filterObj,
            payload.departmentId
        );
        const books: Book[] = response.data.books;
        const paginationData = response.data.paginationData;
        yield put({
            type: actionTypes.GET_BOOKS_SUCCESS,
            books,
            paginationData
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
