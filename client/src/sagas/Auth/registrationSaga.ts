import { call, put } from 'redux-saga/effects';
import * as actionTypes from '../../redux/actions/actionTypes';

import { registrationService } from '../../services/authService';
import { handleSnackbarOpenService } from '../../services/snackbarService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import RegistrationData from '../../interfaces/formsData/RegistrationData';

interface RegistrationSagePayload {
    type: string;
    registrationData: RegistrationData;
}

export function* registrationSaga(payload: RegistrationSagePayload) {
    try {
        const response = yield call(
            registrationService,
            payload.registrationData
        );
        yield put({
            type: actionTypes.REGISTRATION_SUCCESS,
            response: { message: response.data.message }
        });
        yield put({ type: actionTypes.SET_LOADING_INDICATOR, result: false });
    } catch (err) {
        const error = err.response ? err.response.data.message : 'Error';
        handleSnackbarOpenService(SnackbarTypes.ERROR, error);
        yield put({ type: actionTypes.SET_LOADING_INDICATOR, result: false });
    }
}
