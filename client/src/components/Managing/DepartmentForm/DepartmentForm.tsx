import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button, Container, Divider } from '@material-ui/core';

import { DEPARTMENT_FORM } from '../../../constants/reduxForms';

import ManagingFormProps from '../../../interfaces/props/Managing/ManagingFormProps';

import renderedTextField from '../../../share/renderedFields/input';

import { required } from '../../../validation/fields';

import '../ManagingForms.scss';

let DepartmentForm: any = (props: ManagingFormProps) => {
    const { handleSubmit, reset, invalid, pristine, submitting } = props;

    return (
        <Container className="form-container">
            <h2>Adding</h2>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    className="form-field"
                    type="text"
                    label="Name"
                    validate={[required]}
                    component={renderedTextField}
                />
                <Field
                    name="address"
                    className="form-field"
                    type="text"
                    label="Address"
                    validate={[required]}
                    component={renderedTextField}
                />
                <div className="btn-container">
                    <Button
                        className="btn-container__form-btn"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={invalid || submitting || pristine}
                    >
                        Add
                    </Button>
                    <Button
                        className="btn-container__form-btn"
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
