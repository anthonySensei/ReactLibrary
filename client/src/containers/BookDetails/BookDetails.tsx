import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { getBook, loanBook, moveBook, orderBook } from '../../redux/actions';
import { getAllStudents, getDepartments } from '../../redux/actions';

import { CircularProgress, Container } from '@material-ui/core';

import BookDetailsCard from '../../components/Books/BookDetailsCard/BookDetailsCard';
import MoveBookDialog from '../../components/Books/MoveBookDialog/MoveBookDialog';
import LoanBookDialog from '../../components/Books/LoanBookDialog/LoanBookDialog';

import Book from '../../interfaces/Book';
import Department from '../../interfaces/Department';
import Student from '../../interfaces/Student';
import BookDetailsProps from '../../interfaces/props/BookDetailsProps';

import ConfirmDialog from '../../share/ConfirmDialog/ConfirmDialog';

import { bookDetailsStyles } from '../../constants/styles';

const BookDetails = (props: BookDetailsProps) => {
    const classes = bookDetailsStyles();

    const [openMoveDialog, setOpenMoveDialog] = useState(false);
    const [openLoanDialog, setOpenLoanDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [quantityError, setQuantityError] = useState('');
    const [departmentError, setDepartmentError] = useState('');

    const { onGetBook, onGetDepartments, onGetStudents } = props;
    const { onLoanBook, onMoveBook, onOrderBook } = props;
    const { location, isLoading, user } = props;

    const book: Book = props.book;
    const quantity = book ? book.quantity : 0;
    const departments: Department[] = props.departments || [];
    const students: Student[] = props.students || [];
    const moveTo: Department[] = departments.filter(
        (department: Department) => department?._id !== book?.department?._id
    );

    const bookId: string | null = new URLSearchParams(location.search).get(
        'bookId'
    );

    useEffect(() => {
        onGetBook(bookId);
    }, [bookId]);

    const handleClickOpenMoveDialog = () => {
        onGetDepartments();
        setOpenMoveDialog(true);
    };

    const handleClickOpenLoanDialog = () => {
        onGetStudents();
        setOpenLoanDialog(true);
    };

    const handleMoveDialogClose = (
        departmentId: string,
        quantityToMove: number,
        submit: boolean
    ) => {
        if (!departmentId && !quantityToMove && submit) {
            setQuantityError(`Quantity is required`);
            setDepartmentError(`Department is required`);
            return;
        } else if (!departmentId && submit) {
            setDepartmentError(`Department is required`);
            return;
        } else if (!quantityToMove && submit) {
            setQuantityError(`Quantity is required`);
            return;
        } else if (quantityToMove > quantity && submit) {
            setQuantityError(`You cannot move more than ${quantity} books`);
            return;
        } else if (departmentId && quantityToMove > 0 && submit) {
            onMoveBook(book, departmentId, quantityToMove);
        }
        setOpenMoveDialog(false);
    };

    const handleLoanDialogClose = (studentId: string) => {
        if (studentId) {
            onLoanBook(studentId, book._id, user._id);
        }
        setOpenLoanDialog(false);
    };

    const handleConfirmDialogClose = async (confirm: boolean) => {
        if (confirm) {
            onOrderBook(user._id, book._id);
        }
        setOpenConfirmDialog(false);
    };

    return (
        <Container className={classes.container}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <MoveBookDialog
                        onSetQuantityError={setQuantityError}
                        quantityError={quantityError}
                        onSetDepartmentError={setDepartmentError}
                        departmentError={departmentError}
                        open={openMoveDialog}
                        onClose={handleMoveDialogClose}
                        departments={moveTo}
                    />
                    <LoanBookDialog
                        open={openLoanDialog}
                        onClose={handleLoanDialogClose}
                        students={students}
                    />
                    <ConfirmDialog
                        open={openConfirmDialog}
                        onClose={handleConfirmDialogClose}
                    />
                    <BookDetailsCard
                        book={book}
                        user={user}
                        onSetOpenMoveDialog={handleClickOpenMoveDialog}
                        onSetOpenLoanDialog={handleClickOpenLoanDialog}
                        onSetOpenConfirmDialog={setOpenConfirmDialog}
                    />
                </>
            )}
        </Container>
    );
};
const mapStateToProps = (state: any) => ({
    book: state.book.book,
    departments: state.department.departments,
    students: state.student.students,
    isLoading: state.loading.loading,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetBook: (bookId: string | null) => dispatch(getBook(bookId)),
        onGetDepartments: () => dispatch(getDepartments()),
        onGetStudents: () => dispatch(getAllStudents()),
        onMoveBook: (book: Book, departmentId: string, quantity: number) =>
            dispatch(moveBook(book, departmentId, quantity)),
        onLoanBook: (studentId: string, bookId: string, librarianId: string) =>
            dispatch(loanBook(studentId, bookId, librarianId)),
        onOrderBook: (studentId: string, bookId: string) =>
            dispatch(orderBook(studentId, bookId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
