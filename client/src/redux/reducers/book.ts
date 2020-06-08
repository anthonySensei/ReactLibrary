import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    books: [],
    paginationData: {}
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_BOOKS_SUCCESS:
            return updateObject(state, {
                books: action.books,
                paginationData: action.paginationData
            });
        default:
            return state;
    }
};

export default reducer;
