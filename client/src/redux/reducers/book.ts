import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    books: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_BOOKS_SUCCESS:
            return updateObject(state, {
                books: action.books
            });
        default:
            return state;
    }
};

export default reducer;
