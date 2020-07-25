import Author from '../../Author';

export default interface ManagingFormProps {
    authors: Author[];
    isManaging: boolean;
    invalid: boolean;
    pristine: boolean;
    submitting: boolean;
    handleSubmit: () => void;
    onDelete: (authorId: string) => void;
    reset: () => void;
    initialize: (author: Author | null | {}) => void;
}
