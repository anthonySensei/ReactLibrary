import { call, put } from 'redux-saga/effects';
import { registrationService } from '../../services/authService';
import * as actionTypes from '../../redux/actions/actionTypes';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { SnackbarTypes } from '../../constants/snackbarTypes';

export function* registrationSaga(payload: any) {
    try {
        const response = yield call(registrationService, payload.result);
        yield put({
            type: actionTypes.REGISTRATION_SUCCESS,
            response: { message: response.data.message }
        });
        yield put({ type: actionTypes.SET_LOADING_INDICATOR, result: false });
    } catch (err) {
        const error = err.response ? err.response.data.message : 'Error';
        handleSnackbarOpenService(true, SnackbarTypes.ERROR, error);
    }
}
