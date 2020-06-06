import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    loading: false
};

const reducer = (state = initialState, action: any) => {
    if (action.type === actionTypes.SET_LOADING_INDICATOR) {
        return updateObject(state, {
            loading: action.result
        });
    } else {
        return state;
    }
};

export default reducer;
