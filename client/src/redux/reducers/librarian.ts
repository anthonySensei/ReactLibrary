import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    librarians: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_ALL_LIBRARIANS_SUCCESS:
            return updateObject(state, {
                librarians: action.librarians
            });
        default:
            return state;
    }
};

export default reducer;
