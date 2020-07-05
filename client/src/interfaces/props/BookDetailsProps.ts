import { RouteComponentProps } from 'react-router-dom';

import Book from '../Book';
import Department from '../Department';
import Student from '../Student';
import User from '../User';

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
