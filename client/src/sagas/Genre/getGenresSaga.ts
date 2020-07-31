import { call, put } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { setLoadingService } from '../../services/loadingIndicator';
import { handleSnackbarOpenService } from '../../services/snackbar';
import { getGenresService } from '../../services/genreService';

import { SnackbarTypes } from '../../constants/snackbarTypes';

import Genre from '../../interfaces/Genre';

export function* getGenresSaga() {
    try {
        const response = yield call(getGenresService);
        const genres: Genre[] = response.data.genres;
        yield put({
            type: actionTypes.GET_GENRES_SUCCESS,
            genres
        });
        setLoadingService(false);
    } catch (err) {
        const errorMessage = err.response ? err.response.data.message : 'Error';
        setLoadingService(false);
        handleSnackbarOpenService(SnackbarTypes.ERROR, errorMessage);
    }
}
