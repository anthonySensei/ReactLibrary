import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import { moveBookService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';

import { SnackbarTypes } from '../../constants/snackbarTypes';
import Book from '../../interfaces/Book';

interface MoveBookSagaPayload {
    type: string;
    book: Book;
    departmentId: string;
    quantity: number;
}

export function* moveBookSaga(payload: MoveBookSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(
            moveBookService,
            payload.book,
            payload.departmentId,
            payload.quantity
        );
        yield put({
            type: actionTypes.GET_BOOK,
            bookId: payload.book._id
        });
        setLoadingService(false);
        yield handleSnackbarOpenService(
            SnackbarTypes.SUCCESS,
            response.data.message
        );
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
