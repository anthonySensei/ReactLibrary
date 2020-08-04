import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    books: [],
    book: null,
    paginationData: {}
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_BOOKS_SUCCESS:
            return updateObject(state, {
                books: action.books,
                paginationData: action.paginationData
            });
        case actionTypes.GET_ALL_BOOKS_SUCCESS:
            return updateObject(state, {
                books: action.books
            });
        case actionTypes.GET_BOOK_SUCCESS:
            return updateObject(state, {
                book: action.book
            });
        default:
            return state;
    }
};

export default reducer;
