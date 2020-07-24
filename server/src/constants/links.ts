export enum AuthUrls {
    REGISTRATION = '/registration',
    CHECK_UNIQUENESS = '/registration/check',
    CHECK_ACTIVATION_TOKEN = '/check-activation-token',
    LOGIN = '/login',
    LOGOUT = '/logout'
}

export enum BookUrls {
    BASE = '/books',
    DETAILS = '/details',
    MOVE = '/move'
}

export const AUTH_CLIENT_ACTIVATION_PAGE_URL = '/activation-page';

export enum AuthorUrls {
    BASE = '/authors'
}

export enum DepartmentUrls {
    BASE = '/departments'
}

export enum GenreUrls {
    BASE = '/genres'
}

export enum LoanUrls {
    BASE = '/loans'
}

export enum OrderUrls {
    BASE = '/orders'
}

export enum StudentUrl {
    BASE = '/students',
    ALL = '/all'
}
