import React, { useState } from 'react';

import AddBookForm from '../../components/AddBook/AddBookForm/AddBookForm';

import AddBookProps from './AddBookProps';
import { Button, Card } from '@material-ui/core';
import 'react-image-crop/dist/ReactCrop.css';
import ChooseImageDialog from '../../components/AddBook/ChooseImage/ChooseImageDialog';

const AddBook = (props: AddBookProps) => {
    const [openChooseImageDialog, setOpenChooseImageDialog] = useState(false);
    const [image, setImage] = useState('');

    const handleSubmit = (data: any): void => {};

    const handleOpenChooseImageDialog = () => {
        setOpenChooseImageDialog(true);
    };

    const handleCloseChooseImageDialog = (image: string) => {
        if (image) setImage(image);
        setOpenChooseImageDialog(false);
    };

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
            />
        </Card>
    );
};

export default AddBook;
