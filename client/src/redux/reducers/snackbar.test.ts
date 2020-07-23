import reducer from './snackbar';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isSnackbarOpen: false,
    snackbarType: null,
    message: null
};

describe('snackbar reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set whether snackbar is open', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.SET_OPEN_SNACKBAR,
                result: {
                    isOpen: true,
                    type: 'type',
                    message: 'message'
                }
            })
        ).toEqual({
            ...initialState,
            isSnackbarOpen: true,
            snackbarType: 'type',
            message: 'message'
        });
    });
});
