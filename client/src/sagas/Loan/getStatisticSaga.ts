import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicatorService';
import { handleSnackbarOpenService } from '../../services/snackbarService';
import { getStatisticService } from '../../services/loanService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

interface GetStatisticSagaPayload {
    type: string;
    model: string;
    value: string;
}

export function* getStatisticSaga(payload: GetStatisticSagaPayload) {
    try {
        const response = yield call(
            getStatisticService,
            payload.model,
            payload.value
        );
        yield put({
            type: actionTypes.GET_STATISTIC_SUCCESS,
            statistic: response.data.statistic
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
