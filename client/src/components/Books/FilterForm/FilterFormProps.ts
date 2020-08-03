import BooksFilter from '../../../interfaces/BooksFilter';
import Author from '../../../interfaces/Author';
import Genre from '../../../interfaces/Genre';
import Department from '../../../interfaces/Department';
import FormProps from '../../../interfaces/props/FormProps';

export default interface FilterFormProps extends FormProps {
    filter: string;
    authors: Author[];
    genres: Genre[];
    departments: Department[];
    filterObj: BooksFilter;
    onToggleDrawer: (open: boolean) => any;
    selectedGenres: Genre[];
    onSetGenres: (genres: Genre[]) => void;
    onPaginate: (page: number) => void;
}
