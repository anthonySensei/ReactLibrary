import BooksFilter from '../BooksFilter';
import Author from '../Author';
import Genre from '../Genre';
import Department from '../Department';

export default interface FilterFormProps {
    handleSubmit: () => BooksFilter;
    reset: (form: string) => void;
    filter: string;
    authors: Author[];
    genres: Genre[];
    departments: Department[];
    filterObj: BooksFilter;
    initialize: (filterObj: any) => void;
    onToggleDrawer: (open: boolean) => any;
    selectedGenres: Genre[];
    onSetGenres: (genres: Genre[]) => void;
    onPaginate: (page: number) => void;
}
