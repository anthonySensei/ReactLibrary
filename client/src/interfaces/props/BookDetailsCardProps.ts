import Book from '../Book';
import User from '../User';

export default interface BookDetailsCardProps {
    book: Book;
    user: User;
    onSetOpenMoveDialog: () => void;
    onSetOpenConfirmDialog: (isOpen: boolean) => void;
    onSetOpenLoanDialog: () => void;
}
