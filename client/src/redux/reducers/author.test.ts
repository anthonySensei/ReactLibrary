import reducer from './author';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authors: []
};

describe('author reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store authors if fetching is successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.GET_AUTHORS_SUCCESS,
                authors: [{ id: '123' }]
            })
        ).toEqual({ ...initialState, authors: [{ id: '123' }] });
    });
});
