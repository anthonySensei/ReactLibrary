import Book from '../Book';

export default interface BookListProps {
    books: Book[];
    departmentId: string;
    shortId: any;
}
