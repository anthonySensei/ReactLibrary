import reducer from './student';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    students: []
};

describe('snackbar reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store students if fetching is successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.GET_ALL_STUDENTS_SUCCESS,
                students: [{ id: '123' }]
            })
        ).toEqual({
            ...initialState,
            students: [{ id: '123' }]
        });
    });
});
