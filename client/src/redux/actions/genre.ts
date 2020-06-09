import * as actionTypes from './actionTypes';
import Genre from '../../interfaces/Genre';

export const setSelectedGenres = (genres: Genre[]) => {
    return {
        type: actionTypes.SET_SELECTED_GENRES,
        genres
    };
};

export const getGenres = () => {
    return {
        type: actionTypes.GET_GENRES
    };
};
