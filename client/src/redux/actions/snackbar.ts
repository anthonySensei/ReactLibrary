import * as actionTypes from './actionTypes';

export const setOpenSnackbar = (res: any) => {
    return {
        type: actionTypes.SET_OPEN_SNACKBAR,
        result: res
    };
};
