import Genre from '../../interfaces/Genre';
import Author from '../../interfaces/Author';
import Department from '../../interfaces/Department';
import Book from '../../interfaces/Book';

export default interface AddBookProps {
    genres: Genre[];
    authors: Author[];
    departments: Department[];
    onGetDepartments: () => void;
    onGetAuthors: () => void;
    onGetGenres: () => void;
    onAddBook: (book: Book) => void;
}
