import * as actionTypes from './actionTypes';
import Book from '../../interfaces/Book';

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

export const moveBook = (
    book: Book,
    departmentId: string,
    quantity: number
) => {
    return {
        type: actionTypes.MOVE_BOOK,
        book,
        departmentId,
        quantity
    };
};
