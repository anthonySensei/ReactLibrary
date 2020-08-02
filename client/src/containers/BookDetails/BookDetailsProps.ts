import { RouteComponentProps } from 'react-router-dom';

import Book from '../../interfaces/Book';
import Department from '../../interfaces/Department';
import Student from '../../interfaces/Student';
import User from '../../interfaces/User';

export default interface BookDetailsProps extends RouteComponentProps<{}> {
    book: Book;
    departments: Department[];
    students: Student[];
    user: User;
    isLoading: boolean;
    onGetBook: (bookId: string | null) => void;
    onGetDepartments: () => void;
    onGetStudents: () => void;
    onMoveBook: (book: Book, departmentId: string, quantity: number) => void;
    onLoanBook: (
        studentId: string,
        bookId: string,
        librarianId: string
    ) => void;
    onOrderBook: (studentId: string, bookId: string) => void;
}
