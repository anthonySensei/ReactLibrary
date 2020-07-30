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

import Info from '../../../share/textFields/Info';

import './BooksList.scss';

const BooksList = (props: BookListProps) => {
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
                        <Card className="book-card" key={shortId.generate()}>
                            <CardContent>
                                <h2 className="book-title">{book.title}</h2>
                                <CardMedia
                                    className="image"
                                    image={
                                        'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg'
                                    }
                                    title={book.description}
                                />
                                <Info
                                    header={'Author'}
                                    value={book.author.name}
                                />
                                <Info
                                    header={'Genre'}
                                    value={book.genres.toString()}
                                />
                                <Info header={'Year'} value={book.year} />
                                <Info
                                    header={'Quantity'}
                                    value={book.quantity}
                                />
                                {props.departmentId === 'all' && (
                                    <Info
                                        header={'Department'}
                                        value={`${book.department.name}(
                                        ${book.department.address})`}
                                    />
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="book-details-button"
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
