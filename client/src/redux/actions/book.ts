import * as actionTypes from './actionTypes';

export const getBooks = (
    page: string | number,
    filterObj: any,
    departmentId: string
) => {
    return {
        type: actionTypes.GET_BOOKS,
        page,
        filterObj,
        departmentId
    };
};

export const getBook = (bookId: string | null) => {
    return {
        type: actionTypes.GET_BOOK,
        bookId
    };
};
