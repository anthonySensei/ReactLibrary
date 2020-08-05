import { call } from 'redux-saga/effects';

import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';
import { addBookService } from '../../services/bookService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import history from '../../helper/history';

import Book from '../../interfaces/Book';
import { ClientLinks } from '../../constants/ClientLinks';
import { resetFormHandler } from '../../helper/form';
import { ADD_BOOK_FORM } from '../../constants/reduxForms';

interface AddBookSagaPayload {
    type: string;
    book: Book;
}

export function* addBookSaga(payload: AddBookSagaPayload) {
    try {
        setLoadingService(true);
        const response = yield call(addBookService, payload.book);
        handleSnackbarOpenService(SnackbarTypes.SUCCESS, response.data.message);
        resetFormHandler(ADD_BOOK_FORM);
        history.push(ClientLinks.HOME_PAGE);
        setLoadingService(false);
    } catch (err) {
        setLoadingService(false);
        handleSnackbarOpenService(
            SnackbarTypes.ERROR,
            err.response ? err.response.data.message : 'Error'
        );
    }
}
