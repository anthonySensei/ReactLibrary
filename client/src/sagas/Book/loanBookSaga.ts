import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import { loanBookService } from '../../services/bookService';
import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

interface LoanBookSagaPayload {
    type: string;
    studentId: string;
    bookId: string;
    librarianId: string;
}

export function* loanBookSaga(payload: LoanBookSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(
            loanBookService,
            payload.studentId,
            payload.bookId,
            payload.librarianId
        );
        yield put({
            type: actionTypes.GET_BOOK,
            bookId: payload.bookId
        });
        yield setLoadingService(false);
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
