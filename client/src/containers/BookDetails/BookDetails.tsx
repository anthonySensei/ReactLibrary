import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getBook, moveBook } from '../../redux/actions/book';
import { CircularProgress, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BookDetailsCard from '../../components/Books/BookDetailsCard/BookDetailsCard';
import MoveBookDialog from '../../components/Books/MoveBookDialog/MoveBookDialog';
import { getDepartments } from '../../redux/actions';
import Book from '../../interfaces/Book';
import Department from '../../interfaces/Department';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 0'
    }
});

const BookDetails = (props: any) => {
    const classes = useStyles();
    const [openMoveDialog, setOpenMoveDialog] = useState(false);
    const [quantityError, setQuantityError] = useState('');
    const [departmentError, setDepartmentError] = useState('');
    const book: Book = props.book;
    const quantity = book ? book.quantity : 0;
    const departments: Department[] = props.departments || [];
    const moveTo: Department[] = departments.filter(
        (department: Department) => department._id !== book.department._id
    );

    const bookId: string | null = new URLSearchParams(
        props.location.search
    ).get('bookId');

    useEffect(() => {
        props.onGetBook(bookId);
    }, [bookId]);

    const handleClickOpenMoveDialog = () => {
        props.onGetDepartments();
        setOpenMoveDialog(true);
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
            props.onMoveBook(props.book, departmentId, quantityToMove);
        }
        setOpenMoveDialog(false);
    };

    return (
        <Container className={classes.container}>
            {props.isLoading ? (
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
                    <BookDetailsCard
                        book={props.book}
                        user={props.user}
                        onSetOpenMoveDialog={handleClickOpenMoveDialog}
                    />
                </>
            )}
        </Container>
    );
};
const mapStateToProps = (state: any) => ({
    book: state.book.book,
    departments: state.department.departments,
    isLoading: state.loading.loading,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetBook: (bookId: string | null) => dispatch(getBook(bookId)),
        onGetDepartments: () => dispatch(getDepartments()),
        onMoveBook: (book: Book, departmentId: string, quantity: number) =>
            dispatch(moveBook(book, departmentId, quantity))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
