import * as actionTypes from './actionTypes';
import Author from '../../interfaces/Author';

export const getAuthors = () => {
    return {
        type: actionTypes.GET_AUTHORS
    };
};

export const addAuthor = (author: Author) => {
    return {
        type: actionTypes.ADD_AUTHOR,
        author
    };
};

export const updateAuthor = (author: Author) => {
    return {
        type: actionTypes.UPDATE_AUTHOR,
        author
    };
};

export const deleteAuthor = (authorId: string) => {
    return {
        type: actionTypes.DELETE_AUTHOR,
        authorId
    };
};
