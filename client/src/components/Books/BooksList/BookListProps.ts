import Book from '../../../interfaces/Book';

export default interface BookListProps {
    books: Book[];
    departmentId: string;
}
