import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/updateObj';

const initialState = {
    genres: [],
    selectedGenres: []
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_GENRES_SUCCESS:
            return updateObject(state, {
                genres: action.genres
            });
        case actionTypes.SET_SELECTED_GENRES:
            return updateObject(state, {
                selectedGenres: action.genres
            });
        default:
            return state;
    }
};

export default reducer;
