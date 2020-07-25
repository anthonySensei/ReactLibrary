import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button, Container, Divider } from '@material-ui/core';

import { DEPARTMENT_FORM } from '../../../constants/reduxForms';
import { departmentFormStyles } from '../../../constants/styles';

import DepartmentFormProps from '../../../interfaces/props/Managing/DepartmentFormProps';

import renderedTextField from '../../../share/renderedFields/input';

import { required } from '../../../validation/fields';

let DepartmentForm: any = (props: DepartmentFormProps) => {
    const classes = departmentFormStyles();
    const { handleSubmit, reset, invalid, pristine, submitting } = props;

    return (
        <Container className={classes.root}>
            <h2>Adding</h2>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    className={classes.formField}
                    type="text"
                    label="Name"
                    validate={[required]}
                    component={renderedTextField}
                />
                <Field
                    name="address"
                    className={classes.formField}
                    type="text"
                    label="Address"
                    validate={[required]}
                    component={renderedTextField}
                />
                <div className={classes.btnContainer}>
                    <Button
                        className="form-btn"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={invalid || submitting || pristine}
                    >
                        Add
                    </Button>
                    <Button
                        className="form-btn"
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={reset}
                        disabled={submitting}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Container>
    );
};

DepartmentForm = reduxForm({
    form: DEPARTMENT_FORM
})(DepartmentForm);

export default DepartmentForm;
