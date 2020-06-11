import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getBook } from '../../redux/actions/book';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Book from '../../interfaces/Book';
import {GoLocation} from "react-icons/all";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 0'
    },
    bookCard: {
        maxWidth: '30%'
    },
    location: {
        marginTop: 20
    }
});

const BookDetails = (props: any) => {
    const classes = useStyles();
    const book: Book = props.book || { author: {}, department: {} };

    const bookId: string | null = new URLSearchParams(
        props.location.search
    ).get('bookId');

    useEffect(() => {
        props.onGetBook(bookId);
    }, [bookId]);

    return (
        <Container className={classes.container}>
            {props.isLoading ? (
                <CircularProgress />
            ) : (
                <Card className={classes.bookCard}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={book.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {book.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            It was written by {book.author.name}. Genres of book
                            are {book.genres}. {book.description}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.location}
                        >
                            <GoLocation />
                            {book.department.name}({book.department.address})
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained">
                            Move
                        </Button>
                        <Button size="small" color="primary" variant="contained">
                            Order
                        </Button>
                        <Button size="small" color="primary" variant="contained">
                            Loan
                        </Button>
                    </CardActions>
                </Card>
            )}
        </Container>
    );
};
const mapStateToProps = (state: any) => ({
    book: state.book.book,
    isLoading: state.loading.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetBook: (bookId: string | null) => dispatch(getBook(bookId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
