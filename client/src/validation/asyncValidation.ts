import axios from '../helper/axios';

import {
    BOOK_CHECK_URL,
    REGISTRATION_CHECK_URL
} from '../constants/serverLinks';

import RegistrationData from '../interfaces/formsData/RegistrationData';
import Book from '../interfaces/Book';

export const asyncStudentRegistrationValidate = (values: RegistrationData) => {
    return axios
        .post(REGISTRATION_CHECK_URL, {
            studentId: values.studentId,
            email: values.email
        })
        .then(response => {
            if (response.data.isNotUniqueId && response.data.isNotUniqueEmail)
                throw {
                    studentId: 'Student ID is taken',
                    email: 'Email is taken'
                };
            else if (response.data.isNotUniqueId)
                throw { studentId: 'Student ID is taken' };
            else if (response.data.isNotUniqueEmail)
                throw { email: 'Email is taken' };
        });
};

export const asyncBookAddingValidate = (book: Book) => {
    return axios
        .post(BOOK_CHECK_URL, {
            department: book.department,
            isbn: book.isbn
        })
        .then(response => {
            if (response.data.isNotUnique)
                throw {
                    isbn: 'Book with this isbn exists in this department',
                    department: ' '
                };
        });
};
