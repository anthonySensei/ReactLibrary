import reducer from './department';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    department: 'all',
    departments: []
};

describe('department reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set department', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.SET_SELECTED_DEPARTMENT,
                department: { id: '123' }
            })
        ).toEqual({
            ...initialState,
            department: { id: '123' }
        });
    });

    it('should store departments if fetching is successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.GET_DEPARTMENTS_SUCCESS,
                departments: [{ id: '123' }]
            })
        ).toEqual({
            ...initialState,
            departments: [{ id: '123' }]
        });
    });
});
