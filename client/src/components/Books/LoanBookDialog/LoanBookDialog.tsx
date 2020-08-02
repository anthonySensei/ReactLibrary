import React, { ChangeEvent, useState } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

import Student from '../../../interfaces/Student';
import { LoanBookDialogProps } from './LoanBookDialogProps';

import '../Dialogs.scss';

export const LoanBookDialog = (props: LoanBookDialogProps) => {
    const { onClose, open, students } = props;
    const [studentId, setStudentId] = useState('');

    const handleClose = () => {
        onClose('');
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
            <Autocomplete
                className='dialog-input'
                options={students}
                getOptionLabel={(student: Student) =>
                    `${student.name}(${student.studentId})`
                }
                onChange={(e: ChangeEvent<{}>, values: Student | null) => {
                    const studentId: string = values?._id || '';
                    setStudentId(studentId);
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Student"
                        placeholder="Student"
                    />
                )}
            />
            <div className="buttons-container">
                <Button
                    className="dialog-button"
                    variant="contained"
                    color="primary"
                    onClick={() => onClose(studentId)}
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
