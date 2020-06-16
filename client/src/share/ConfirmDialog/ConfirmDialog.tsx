import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import '../../App.scss';

export interface ConfirmDialogProps {
    open: boolean;
    onClose: (confirm: boolean) => void;
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
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
                    onClick={() => onClose(true)}
                >
                    Yes
                </Button>
                <Button
                    className="dialog-button"
                    variant="contained"
                    onClick={() => onClose(false)}
                >
                    No
                </Button>
            </div>
        </Dialog>
    );
};

export default ConfirmDialog;
