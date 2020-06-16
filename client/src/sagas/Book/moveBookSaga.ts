import {call} from 'redux-saga/effects';

import {moveBookService} from '../../services/bookService';
import {setLoadingService} from '../../services/loadingIndicator';
import {handleSnackbarOpenService} from '../../services/snackbar';
import {SnackbarTypes} from '../../constants/snackbarTypes';

export function* moveBookSaga(payload: any) {
    try {
        setLoadingService(true);
        const response = yield call(
            moveBookService,
            payload.book,
            payload.departmentId,
            payload.quantity
        );
        yield handleSnackbarOpenService(
            true,
            SnackbarTypes.SUCCESS,
            response.data.message
        );
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, errorMessage);
    }
}
