import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    isSnackbarOpen: false,
    snackbarType: null,
    message: null
};

const reducer = (state = initialState, action: any) => {
    if (action.type === actionTypes.SET_OPEN_SNACKBAR) {
        return updateObject(state, {
            isSnackbarOpen: action.result.isOpen,
            snackbarType: action.result.type,
            message: action.result.message
        });
    } else {
        return state;
    }
};

export default reducer;
