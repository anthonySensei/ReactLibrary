import Department from '../../interfaces/Department';
import Author from '../../interfaces/Author';

export default interface ManagingPageProps {
    authors: Author[];
    onGetAuthors: () => void;
    onAddDepartment: (department: Department) => void;
    onAddAuthor: (author: Author) => void;
    onUpdateAuthor: (author: Author) => void;
    onDeleteAuthor: (authorId: string) => void;
}
