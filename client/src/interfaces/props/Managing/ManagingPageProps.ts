import Department from '../../Department';
import Author from '../../Author';

export default interface ManagingPageProps {
    authors: Author[];
    onGetAuthors: () => void;
    onAddDepartment: (department: Department) => void;
    onAddAuthor: (author: Author) => void;
    onUpdateAuthor: (author: Author) => void;
    onDeleteAuthor: (authorId: string) => void;
}
