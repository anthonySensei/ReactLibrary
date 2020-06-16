import React, { Component } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Tooltip,
    Typography
} from '@material-ui/core';
import { GoLocation } from 'react-icons/all';
import { UserRoles } from '../../../constants/UserRoles';
import Book from '../../../interfaces/Book';
import User from '../../../interfaces/User';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    bookCard: {
        maxWidth: '30%'
    },
    location: {
        marginTop: 20
    }
});

const BookDetailsCard = (props: any) => {
    const classes = useStyles();
    const book: Book = props.book || { author: {}, department: {} };
    const user: User = props.user || {};

    return (
        <Card className={classes.bookCard}>
            <CardMedia
                component="img"
                alt={book.title}
                image={book.image}
                title={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    It was written by {book.author.name}. Genres of book are{' '}
                    {book.genres}. {book.description}.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Quantity: {book.quantity}.
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
                {user.role === UserRoles.MANAGER ? (
                    <Tooltip title="Move book to another department">
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => props.onSetOpenMoveDialog()}
                        >
                            Move
                        </Button>
                    </Tooltip>
                ) : (
                    ''
                )}
                {user.role === UserRoles.STUDENT ? (
                    <Tooltip title="Order this book">
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => props.onSetOpenConfirmDialog(true)}
                        >
                            Order
                        </Button>
                    </Tooltip>
                ) : (
                    ''
                )}
                {user.role === UserRoles.LIBRARIAN ? (
                    <Tooltip title="Loan book">
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => props.onSetOpenLoanDialog()}
                        >
                            Loan
                        </Button>
                    </Tooltip>
                ) : (
                    ''
                )}
            </CardActions>
        </Card>
    );
};

export default BookDetailsCard;
