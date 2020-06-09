import * as actionTypes from './actionTypes';

export const setLoading = (isLoading: boolean) => {
    return {
        type: actionTypes.SET_LOADING_INDICATOR,
        result: isLoading
    };
};
