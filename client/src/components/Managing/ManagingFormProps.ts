import Author from '../../interfaces/Author';
import FormProps from "../../interfaces/props/FormProps";

export default interface ManagingFormProps extends FormProps{
    authors: Author[];
    isManaging: boolean;
    onDelete: (authorId: string) => void;
}
