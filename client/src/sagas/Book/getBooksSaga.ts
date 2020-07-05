import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import Book from '../../interfaces/Book';
import MainPagination from '../../interfaces/MainPagination';
import BooksFilter from '../../interfaces/BooksFilter';

import { getBooksService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';

import { SnackbarTypes } from '../../constants/snackbarTypes';

interface GetBooksSagaPayload {
    type: string;
    page: string | number;
    filterObj: BooksFilter;
    departmentId: string;
}

export function* getBooksSaga(payload: GetBooksSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(
            getBooksService,
            payload.page,
            payload.filterObj,
            payload.departmentId
        );
        const books: Book[] = response.data.books;
        const paginationData: MainPagination = response.data.paginationData;
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
