import React from 'react';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Tooltip,
    Typography
} from '@material-ui/core';

import { UserRoles } from '../../../constants/UserRoles';
import { bookDetailsCardStyles } from '../../../constants/styles';

import Book from '../../../interfaces/Book';
import User from '../../../interfaces/User';
import BookDetailsCardProps from '../../../interfaces/props/BookDetailsCardProps';
import { LocationOn } from '@material-ui/icons';

const BookDetailsCard = (props: BookDetailsCardProps) => {
    const classes = bookDetailsCardStyles();
    const {
        onSetOpenConfirmDialog,
        onSetOpenLoanDialog,
        onSetOpenMoveDialog
    } = props;
    const book: Book = props.book || { author: {}, department: {} };
    const user: User = props.user || {};

    return (
        <Card className={classes.bookCard}>
            <CardMedia
                component="img"
                alt={book.title}
                image={'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}
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
                    <LocationOn />
                    {book.department.name}({book.department.address})
                </Typography>
            </CardContent>
            <CardActions>
                {user.role === UserRoles.MANAGER && (
                    <Tooltip title="Move book to another department">
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => onSetOpenMoveDialog()}
                        >
                            Move
                        </Button>
                    </Tooltip>
                )}
                {user.role === UserRoles.STUDENT && (
                    <Tooltip title="Order this book">
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => onSetOpenConfirmDialog(true)}
                        >
                            Order
                        </Button>
                    </Tooltip>
                )}
                {user.role === UserRoles.LIBRARIAN && (
                    <Tooltip title="Loan book">
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => onSetOpenLoanDialog()}
                        >
                            Loan
                        </Button>
                    </Tooltip>
                )}
            </CardActions>
        </Card>
    );
};

export default BookDetailsCard;
