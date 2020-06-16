import React, { useState } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import '../../../App.scss';
import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import Department from '../../../interfaces/Department';
import { makeStyles } from '@material-ui/core/styles';

export interface MoveDialogProps {
    open: boolean;
    quantityError: string;
    departmentError: string;
    departments: Department[];
    onClose: (departmentId: string, quantity: number, submit: boolean) => void;
    onSetQuantityError: (error: string) => void;
    onSetDepartmentError: (error: string) => void;
}

const useStyles = makeStyles({
    input: {
        width: '92%',
        margin: '5px auto'
    }
});

export const MoveBookDialog = (props: MoveDialogProps) => {
    const {
        onClose,
        open,
        departments,
        quantityError,
        onSetQuantityError,
        departmentError,
        onSetDepartmentError
    } = props;
    const classes = useStyles();
    const [departmentId, setDepartmentId] = useState('');
    const [quantityToMove, setQuantityToMove] = useState(0);
    const shortId = require('shortid');

    const handleDepartmentChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ): void => {
        onSetDepartmentError('');
        const departmentId: string = event.target.value as string;
        setDepartmentId(departmentId);
    };

    const handleQuantityChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ): void => {
        onSetQuantityError('');
        const quantity: number = event.target.value as number;
        setQuantityToMove(+quantity);
    };

    return (
        <Dialog
            disableBackdropClick={true}
            aria-labelledby="confirm-dialog-title"
            open={open}
            maxWidth={'xs'}
        >
            <DialogTitle id="confirm-dialog-title">
                Please select department and quantity of book to move:
            </DialogTitle>
            <FormControl className={classes.input}>
                <InputLabel>Department</InputLabel>
                <Select
                    value={departmentId}
                    onChange={handleDepartmentChange}
                    error={!!departmentError}
                >
                    <MenuItem value="all">
                        <em>All</em>
                    </MenuItem>
                    <Divider />
                    {departments.map((department: Department) => (
                        <MenuItem
                            value={department._id}
                            key={shortId.generate()}
                        >
                            {department.name}({department.address})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                required
                label="Quantity"
                className={classes.input}
                value={quantityToMove}
                onChange={handleQuantityChange}
                error={!!quantityError}
                helperText={quantityError}
            />
            <div className="buttons-container">
                <Button
                    className="dialog-button"
                    variant="contained"
                    color="primary"
                    onClick={() => onClose(departmentId, quantityToMove, true)}
                >
                    Move
                </Button>
                <Button
                    className="dialog-button"
                    variant="contained"
                    onClick={() => onClose('', 0, false)}
                >
                    Cancel
                </Button>
            </div>
        </Dialog>
    );
};

export default MoveBookDialog;
