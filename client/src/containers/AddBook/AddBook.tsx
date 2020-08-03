import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import {
    addBook,
    getAuthors,
    getDepartments,
    getGenres
} from '../../redux/actions';

import openSocket from 'socket.io-client';

import AddBookForm from '../../components/AddBook/AddBookForm/AddBookForm';
import ChooseImageDialog from '../../components/AddBook/ChooseImage/ChooseImageDialog';

import AddBookProps from './AddBookProps';

import { Card } from '@material-ui/core';

import Genre from '../../interfaces/Genre';

import { SERVER_URL } from '../../constants/serverLinks';

import 'react-image-crop/dist/ReactCrop.css';
import Book from '../../interfaces/Book';

const AddBook = (props: AddBookProps) => {
    const [openChooseImageDialog, setOpenChooseImageDialog] = useState(false);
    const [image, setImage] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    const { onGetAuthors, onGetDepartments, onGetGenres, onAddBook } = props;
    const { authors, genres, departments } = props;

    const handleSubmit = (book: Book): void => {
        onAddBook({ ...book, image, genres: selectedGenres });
    };

    const handleOpenChooseImageDialog = () => {
        setOpenChooseImageDialog(true);
    };

    const handleCloseChooseImageDialog = (image: string) => {
        if (image) setImage(image);
        setOpenChooseImageDialog(false);
    };

    useEffect(() => {
        onGetAuthors();
        onGetGenres();
        onGetDepartments();
    }, []);

    useEffect(() => {
        const socket = openSocket(SERVER_URL);
        socket.on('departments', () => {
            onGetDepartments();
        });
        socket.on('authors', () => {
            onGetAuthors();
        });
        socket.on('genres', () => {
            onGetGenres();
        });
    }, []);

    return (
        <Card className="card form">
            <ChooseImageDialog
                open={openChooseImageDialog}
                onClose={handleCloseChooseImageDialog}
            />
            <AddBookForm
                onSubmit={handleSubmit}
                image={image}
                onOpenChooseImageDialog={handleOpenChooseImageDialog}
                authors={authors}
                departments={departments}
                genres={genres}
                selectedGenres={selectedGenres}
                onSetGenres={setSelectedGenres}
            />
        </Card>
    );
};

const mapStateToProps = (state: any) => ({
    genres: state.genre.genres,
    authors: state.author.authors,
    departments: state.department.departments,
    userRole: state.auth.user?.role
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetDepartments: () => dispatch(getDepartments()),
        onGetAuthors: () => dispatch(getAuthors()),
        onGetGenres: () => dispatch(getGenres()),
        onAddBook: (book: Book) => dispatch(addBook(book))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
