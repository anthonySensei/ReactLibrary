import Book from '../../../interfaces/Book';
import User from '../../../interfaces/User';

export default interface BookDetailsCardProps {
    book: Book;
    user: User;
    onSetOpenMoveDialog: () => void;
    onSetOpenConfirmDialog: (isOpen: boolean) => void;
    onSetOpenLoanDialog: () => void;
}
