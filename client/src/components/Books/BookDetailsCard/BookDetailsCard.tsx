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
import { LocationOn } from '@material-ui/icons';

import { UserRoles } from '../../../constants/UserRoles';

import Book from '../../../interfaces/Book';
import User from '../../../interfaces/User';
import BookDetailsCardProps from '../../../interfaces/props/BookDetails/BookDetailsCardProps';

import './BookDetailsCard.scss';

const BookDetailsCard = (props: BookDetailsCardProps) => {
    const {
        onSetOpenConfirmDialog,
        onSetOpenLoanDialog,
        onSetOpenMoveDialog
    } = props;
    const book: Book = props.book || { author: {}, department: {} };
    const user: User = props.user || {};

    return (
        <Card className="book-card">
            <CardMedia
                component="img"
                alt={book.title}
                image={
                    'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg'
                }
                title={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="primary" component="p">
                    It was written by {book.author.name}. Genres of book are{' '}
                    {book.genres}. {book.description}.
                </Typography>
                <Typography variant="body2" color="primary" component="p">
                    Quantity: {book.quantity}.
                </Typography>
                <Typography
                    variant="body2"
                    color="primary"
                    component="p"
                    className="book-location"
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
