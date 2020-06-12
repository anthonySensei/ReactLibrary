import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import '../../../App.scss';

export const LoanBookDialog = (props: any) => {
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
            <DialogTitle id="confirm-dialog-title">
                Please input student id to loan book
            </DialogTitle>
            <div className="buttons-container">
                <Button
                    className="dialog-button"
                    variant="contained"
                    color="primary"
                    onClick={() => onClose()}
                >
                    Loan
                </Button>
                <Button
                    className="dialog-button"
                    variant="contained"
                    onClick={() => onClose('')}
                >
                    Cancel
                </Button>
            </div>
        </Dialog>
    );
};

export default LoanBookDialog;
