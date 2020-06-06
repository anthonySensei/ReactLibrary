import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Card, CircularProgress, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BooksList from '../../components/Books/BooksList/BooksList';
import { getBooks } from '../../redux/actions';

const useStyles = makeStyles({
    pageTitle: {
        textAlign: 'center',
        marginTop: '5%',
        marginBottom: '0.5%'
    },
    booksContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '50px 20px'
    }
});

const Home = (props: any) => {
    document.title = 'Home';
    const classes = useStyles();

    useEffect(() => {
        props.onGetBooks();
    }, []);

    return (
        <Container>
            <Card className={classes.pageTitle}>
                <h2>Book catalog</h2>
            </Card>
            <Card className={classes.booksContainer}>
                {props.isLoading ? (
                    <CircularProgress />
                ) : (
                    <BooksList books={props.books} />
                )}
            </Card>
        </Container>
    );
};

const mapStateToProps = (state: any) => ({
    books: state.book.books,
    isLoading: state.loading.loading
});

const mapDispatchToProps = (dispatch: any) => {
    return { onGetBooks: () => dispatch(getBooks()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
