export const SERVER_URL =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
export const SERVER_API_URL = `${SERVER_URL}/api/`;
export const GRAPHQL_URL = 'graphql';

export const LOGIN_URL = 'login';
export const LOGOUT_URL = 'logout';
export const REGISTRATION_URL = 'registration';
export const REGISTRATION_CHECK_URL = `${REGISTRATION_URL}/check`;
export const ACTIVATE_USER_URL = `/check-activation-token`;

export const BOOKS_URL = 'books';
export const BOOKS_ALL_URL = `${BOOKS_URL}/all`;
export const BOOK_CHECK_URL = `${BOOKS_URL}/check`;
export const BOOK_DETAILS_URL = `${BOOKS_URL}/details`;
export const BOOK_MOVE_URL = `${BOOKS_URL}/move`;

export const LOANS_URL = 'loans';
export const LOANS_STATISTIC_URL = `${LOANS_URL}/statistic`;

export const LIBRARIANS_URL = 'librarians';
export const LIBRARIANS_ALL_URL = `${LIBRARIANS_URL}/all`;

export const ORDERS_URL = 'orders';

export const DEPARTMENTS_URL = 'departments';

export const STUDENTS_URL = 'students';
export const STUDENTS_ALL_URL = `${STUDENTS_URL}/all`;

export const GENRES_URL = 'genres';
