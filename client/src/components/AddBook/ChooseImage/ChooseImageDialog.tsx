import React, { ChangeEvent, useState } from 'react';
import ReactCrop from 'react-image-crop';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import ChooseImageDialogProps from './ChooseImageDialogProps';

import './ChooseImageDialog.scss';

export const ChooseImageDialog = (props: ChooseImageDialogProps) => {
    const { onClose, open } = props;

    const [src, selectFile] = useState<any>(null);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files!;
        const image = files[0];
        selectFile(URL.createObjectURL(image));
    };

    const [image, setImage] = useState<any>(null);
    const [crop, setCrop] = useState<any>({
        maxWidth: 300,
        maxHeight: 400,
        aspect: 3 / 4
    });

    const getCroppedImg = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL('image/jpeg');
        onClose(base64Image);
    };

    const handleClose = () => {
        onClose('');
    };

    return (
        <Dialog
            disableBackdropClick={true}
            fullWidth={true}
            maxWidth={'md'}
            onClose={handleClose}
            aria-labelledby="choose-image-dialog-title"
            open={open}
        >
            <DialogTitle id="choose-image-dialog-title">
                Please choose book image
            </DialogTitle>
            <Container className="dialog-container">
                <div className="upload-block">
                    <input
                        id="file"
                        type="file"
                        className="upload-block__input-file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="file"
                        className={[
                            src
                                ? 'upload-block__upload_btn_uploaded'
                                : 'upload-block__upload_btn',
                            'label'
                        ].join(' ')}
                    >
                        {src ? (
                            <CheckCircleIcon
                                fontSize="large"
                                className="upload-block__upload_btn__icon"
                            />
                        ) : (
                            <CloudUploadIcon
                                fontSize="large"
                                className="upload-block__upload_btn__icon"
                            />
                        )}
                        {src ? 'Upload another image' : 'Upload image'}
                    </label>
                </div>
                {src && (
                    <div className="cropper">
                        <ReactCrop
                            src={src}
                            onImageLoaded={setImage}
                            crop={crop}
                            onChange={setCrop}
                        />
                    </div>
                )}
                <div className="dialog-btn-container">
                    <Button
                        className="dialog-btn-container__dialog-btn"
                        variant="contained"
                        color="primary"
                        disabled={!src}
                        onClick={getCroppedImg}
                    >
                        Crop
                    </Button>
                    <Button
                        className="dialog-btn-container__dialog-btn"
                        variant="outlined"
                        color="primary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </div>
            </Container>
        </Dialog>
    );
};

export default ChooseImageDialog;
