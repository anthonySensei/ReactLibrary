import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia
} from '@material-ui/core';

import Book from '../../../interfaces/Book';
import BookListProps from '../../../interfaces/props/Home/BookListProps';

import { ClientLinks } from '../../../constants/ClientLinks';
import { bookListStyles } from '../../../constants/styles';

const BooksList = (props: BookListProps) => {
    const classes = bookListStyles();
    const history = useHistory();

    const books: Book[] = props.books || [];
    const shortId = require('shortid');

    const showBookDetails = (bookId: string) => {
        history.push(`${ClientLinks.BOOK_DETAILS}?bookId=${bookId}`);
    };

    return (
        <>
            {books.length > 0 ? (
                <>
                    {books.map((book: Book) => (
                        <Card
                            className={classes.bookCard}
                            key={shortId.generate()}
                        >
                            <CardContent>
                                <h2 className={classes.title}>{book.title}</h2>
                                <CardMedia
                                    className={classes.image}
                                    image={'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}
                                    title={book.description}
                                />
                                <p className={classes.info}>
                                    <span className="secondary-text">
                                        Author:{' '}
                                    </span>
                                    {book.author.name}
                                </p>
                                <p className={classes.info}>
                                    <span className="secondary-text">
                                        Genre:{' '}
                                    </span>
                                    {book.genres}
                                </p>
                                <p className={classes.info}>
                                    <span className="secondary-text">
                                        Year:{' '}
                                    </span>
                                    {book.year}
                                </p>
                                <p className={classes.info}>
                                    <span className="secondary-text">
                                        Quantity:{' '}
                                    </span>
                                    {book.quantity}
                                </p>
                                {props.departmentId === 'all' && (
                                    <p className={classes.info}>
                                        <span className="secondary-text">
                                            Department:{' '}
                                        </span>
                                        {book.department.name}(
                                        {book.department.address})
                                    </p>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => showBookDetails(book._id)}
                                >
                                    Details
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </>
            ) : (
                <h2>There are no books</h2>
            )}
        </>
    );
};

export default BooksList;
