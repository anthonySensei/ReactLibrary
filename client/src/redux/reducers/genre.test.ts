import reducer from './genre';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    genres: [],
    selectedGenres: []
};

describe('genre reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store genres if fetching is successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.GET_GENRES_SUCCESS,
                genres: [{ id: '123' }]
            })
        ).toEqual({
            ...initialState,
            genres: [{ id: '123' }]
        });
    });

    it('should set selected genres(genres for filter)', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.SET_SELECTED_GENRES,
                genres: [{ id: '123' }]
            })
        ).toEqual({
            ...initialState,
            selectedGenres: [{ id: '123' }]
        });
    });
});
