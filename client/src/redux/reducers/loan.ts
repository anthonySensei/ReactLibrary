import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    statistic: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_STATISTIC_SUCCESS:
            return updateObject(state, {
                statistic: action.statistic
            });
        default:
            return state;
    }
};

export default reducer;
