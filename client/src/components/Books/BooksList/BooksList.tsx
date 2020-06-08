import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Book from '../../../interfaces/Book';

const useStyles = makeStyles({
    bookCard: {
        flex: '20%',
        maxWidth: '25%',
        margin: '10px'
    },
    image: {
        height: 0,
        paddingTop: '120%'
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    info: {
        fontSize: 16,
        marginTop: 5
    },
    button: {
        width: '100%'
    }
});

const BooksList = (props: any) => {
    const classes = useStyles();
    const books = props.books || [];
    const shortId = props.shortId;
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
                                <Typography
                                    className={classes.title}
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    {book.title}
                                </Typography>
                                <CardMedia
                                    className={classes.image}
                                    image={book.image}
                                    title={book.description}
                                />
                                <Typography
                                    variant="body2"
                                    component="p"
                                    className={classes.info}
                                >
                                    <Typography
                                        color="textSecondary"
                                        component="span"
                                    >
                                        Author:{' '}
                                    </Typography>
                                    {book.author.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="p"
                                    className={classes.info}
                                >
                                    <Typography
                                        color="textSecondary"
                                        component="span"
                                    >
                                        Genre:{' '}
                                    </Typography>
                                    {book.genres}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="p"
                                    className={classes.info}
                                >
                                    <Typography
                                        color="textSecondary"
                                        component="span"
                                    >
                                        Year:{' '}
                                    </Typography>
                                    {book.year}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="p"
                                    className={classes.info}
                                >
                                    <Typography
                                        color="textSecondary"
                                        component="span"
                                    >
                                        Quantity:{' '}
                                    </Typography>
                                    {book.quantity}
                                </Typography>
                                {props.departmentId === 'all' ? (
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        className={classes.info}
                                    >
                                        <Typography
                                            color="textSecondary"
                                            component="span"
                                        >
                                            Department:{' '}
                                        </Typography>
                                        {book.department.name}(
                                        {book.department.address})
                                    </Typography>
                                ) : (
                                    ''
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
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