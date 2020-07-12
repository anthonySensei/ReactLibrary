import reducer from './loadingIndicator';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false
};

describe('loading indicator reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set whether loading indicator is loading', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.SET_LOADING_INDICATOR,
                result: true
            })
        ).toEqual({
            ...initialState,
            loading: true
        });
    });
});
