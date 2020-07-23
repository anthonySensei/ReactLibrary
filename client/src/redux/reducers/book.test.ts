import reducer from './book';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    books: [],
    book: null,
    paginationData: {}
};

describe('book reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store books if fetching is successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.GET_BOOKS_SUCCESS,
                books: [{ id: '123' }],
                paginationData: { page: 1 }
            })
        ).toEqual({
            ...initialState,
            books: [{ id: '123' }],
            paginationData: { page: 1 }
        });
    });

    it('should store book if fetching is successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.GET_BOOK_SUCCESS,
                book: { id: '123' }
            })
        ).toEqual({
            ...initialState,
            book: { id: '123' }
        });
    });
});
