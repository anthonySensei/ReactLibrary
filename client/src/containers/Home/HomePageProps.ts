import { RouteComponentProps } from 'react-router-dom';

import Department from '../../interfaces/Department';
import Genre from '../../interfaces/Genre';
import BooksFilter from '../../interfaces/BooksFilter';
import Book from "../../interfaces/Book";
import Author from "../../interfaces/Author";
import MainPagination from "../../interfaces/MainPagination";

export default interface HomePageProps extends RouteComponentProps<{}> {
    books: Book[];
    genres: Genre[];
    authors: Author[];
    departmentId: string;
    departments: Department[];
    selectedGenres: Genre[];
    isLoading: boolean;
    paginationData: MainPagination;
    formValues: any;
    onGetBooks: (
        page: string | number,
        filterObj: BooksFilter | {},
        departmentId: string
    ) => void;
    onGetDepartments: () => void;
    onSetDepartment: (departmentId: string) => void;
    onSetSelectedGenres: (genres: Genre[]) => void;
    onGetAuthors: () => void;
    onGetGenres: () => void;
}
