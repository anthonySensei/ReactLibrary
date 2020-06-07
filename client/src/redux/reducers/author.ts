import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    authors: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_AUTHORS:
            return updateObject(state, {
                authors: action.authors
            });
        default:
            return state;
    }
};

export default reducer;
