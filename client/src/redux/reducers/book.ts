import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    books: null,
    error: null
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_BOOKS_SUCCESS:
            return updateObject(state, {
                books: action.books,
                error: null
            });
        case actionTypes.GET_BOOKS_ERROR:
            return updateObject(state, {
                error: action.error
            });
        default:
            return state;
    }
};

export default reducer;
