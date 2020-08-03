import FormProps from '../../../interfaces/props/FormProps';
import Genre from '../../../interfaces/Genre';
import Author from '../../../interfaces/Author';
import Department from '../../../interfaces/Department';

export default interface AddBookFormProps extends FormProps {
    image: string;
    onOpenChooseImageDialog: () => void;
    onSetGenres: (genres: Genre[]) => void;
    genres: Genre[];
    selectedGenres: Genre[];
    authors: Author[];
    departments: Department[];
}
