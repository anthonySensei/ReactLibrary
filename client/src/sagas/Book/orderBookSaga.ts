import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import { orderBookService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

interface OrderBookSagaPayload {
    type: string;
    studentId: string;
    bookId: string;
}

export function* orderBookSaga(payload: OrderBookSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(
            orderBookService,
            payload.studentId,
            payload.bookId
        );
        yield handleSnackbarOpenService(
            SnackbarTypes.SUCCESS,
            response.data.message
        );
        yield put({
            type: actionTypes.GET_BOOK,
            bookId: payload.bookId
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
