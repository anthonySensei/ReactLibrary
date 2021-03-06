export enum AuthUrls {
    REGISTRATION = '/registration',
    CHECK_UNIQUENESS = '/registration/check',
    CHECK_ACTIVATION_TOKEN = '/check-activation-token',
    LOGIN = '/login',
    LOGOUT = '/logout'
}

export enum BookUrls {
    BASE = '/api/books',
    DETAILS = '/details',
    MOVE = '/move',
    CHECK = '/check',
    ALL = '/all'
}

export const AUTH_CLIENT_ACTIVATION_PAGE_URL = '/activation-page';

export enum DepartmentUrls {
    BASE = '/api/departments'
}

export enum GenreUrls {
    BASE = '/api/genres'
}

export enum LoanUrls {
    BASE = '/api/loans',
    STATISTIC = '/statistic'
}

export enum OrderUrls {
    BASE = '/api/orders'
}

export enum StudentUrl {
    BASE = '/api/students',
    ALL = '/all'
}

export enum LibrarianUrl {
    BASE = '/api/librarians',
    ALL = '/all'
}
