import { RouteComponentProps } from 'react-router-dom';

import Department from '../Department';
import Genre from '../Genre';
import BooksFilter from '../BooksFilter';
import Book from "../Book";
import Author from "../Author";
import MainPagination from "../MainPagination";

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
