import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../../redux/actions/actionTypes';

import { getGenresSaga } from './getGenresSaga';

export default function* watchGenres() {
    yield takeEvery(actionTypes.GET_GENRES, getGenresSaga);
}
