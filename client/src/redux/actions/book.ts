import * as actionTypes from './actionTypes';
import Book from '../../interfaces/Book';
import BooksFilter from "../../interfaces/BooksFilter";

export const getBooks = (
    page: string | number,
    filterObj: BooksFilter,
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

export const loanBook = (
    studentId: string,
    bookId: string,
    librarianId: string
) => {
    return {
        type: actionTypes.LOAN_BOOK,
        studentId,
        bookId,
        librarianId
    };
};

export const orderBook = (
    studentId: string,
    bookId: string
) => {
    return {
        type: actionTypes.ORDER_BOOK,
        studentId,
        bookId
    };
};
