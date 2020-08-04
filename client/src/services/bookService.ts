import axios from '../helper/axios';

import {
    BOOKS_ALL_URL,
    BOOK_DETAILS_URL,
    BOOK_MOVE_URL,
    BOOKS_URL,
    LOANS_URL,
    ORDERS_URL
} from '../constants/serverLinks';
import BooksFilter from '../interfaces/BooksFilter';
import Book from '../interfaces/Book';

export const getBooksService = async (
    page: string | number,
    filterObj: BooksFilter,
    departmentId: string
) => {
    return await axios.get(BOOKS_URL, {
        params: {
            ...filterObj,
            departmentId,
            page
        }
    });
};

export const getAllBooksService = async () => {
    return await axios.get(BOOKS_ALL_URL);
};

export const getBookService = async (bookId: string | null) => {
    return await axios.get(BOOK_DETAILS_URL, {
        params: {
            bookId
        }
    });
};

export const addBookService = async (book: Book) => {
    return await axios.post(BOOKS_URL, book);
};

export const moveBookService = async (
    book: Book,
    departmentId: string,
    quantity: number
) => {
    return await axios.post(BOOK_MOVE_URL, {
        book,
        departmentId,
        quantity
    });
};

export const loanBookService = async (
    studentId: string,
    bookId: string,
    librarianId: string
) => {
    return await axios.post(LOANS_URL, {
        studentId,
        bookId,
        librarianId,
        time: new Date()
    });
};

export const orderBookService = async (studentId: string, bookId: string) => {
    return await axios.post(ORDERS_URL, {
        studentId,
        bookId,
        time: new Date()
    });
};

export const addFilterToQueryParamsService = (
    filterObj: BooksFilter,
    history: any
) => {
    let authorIdQuery: string = '';
    let departmentIdQuery: string = '';
    let filterQuery: string = '';
    let fYearQuery: string = '';
    let tYearQuery: string = '';
    let valueQuery: string = '';
    if (filterObj.authorId) authorIdQuery = `authorId=${filterObj.authorId}&`;
    if (filterObj.departmentId)
        departmentIdQuery = `departmentId=${filterObj.departmentId}&`;
    if (filterObj.filter) filterQuery = `filter=${filterObj.filter}&`;
    if (filterObj.fYear) fYearQuery = `fYear=${filterObj.fYear}&`;
    if (filterObj.tYear) tYearQuery = `tYear=${filterObj.tYear}&`;
    if (filterObj.value) valueQuery = `value=${filterObj.value}&`;
    history.push(
        `/?${authorIdQuery}${departmentIdQuery}${filterQuery}${fYearQuery}${tYearQuery}${valueQuery}`
    );
};

export const getFilterObjService = (
    authorId: string | null,
    departmentId: string | null,
    filter: string | null,
    fYear: string | null,
    tYear: string | null,
    value: string | null
) => {
    let authorIdField = {};
    let departmentIdField = {};
    let filterField = {};
    let fYearField = {};
    let tYearField = {};
    let valueField = {};
    if (authorId) authorIdField = { authorId };
    if (departmentId) departmentIdField = { departmentId };
    if (filter) filterField = { filter };
    if (fYear) fYearField = { fYear };
    if (tYear) tYearField = { tYear };
    if (value) valueField = { value };
    return {
        ...authorIdField,
        ...departmentIdField,
        ...filterField,
        ...tYearField,
        ...fYearField,
        ...valueField
    };
};
