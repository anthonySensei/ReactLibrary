import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import '../../App.scss';

export const ConfirmDialog = (props: any) => {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            disableBackdropClick={true}
            onClose={handleClose}
            aria-labelledby="confirm-dialog-title"
            open={open}
        >
            <DialogTitle id="confirm-dialog-title">Are you sure?</DialogTitle>
            <div className="buttons-container">
                <Button
                    className="dialog-button"
                    variant="contained"
                    color="primary"
                    onClick={() => onClose()}
                >
                    Yes
                </Button>
                <Button
                    className="dialog-button"
                    variant="contained"
                    onClick={() => onClose('')}
                >
                    No
                </Button>
            </div>
        </Dialog>
    );
};

export default ConfirmDialog;
