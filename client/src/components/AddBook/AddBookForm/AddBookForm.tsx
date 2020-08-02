import React from 'react';
import { Field, reduxForm } from 'redux-form';

import renderedTextField from '../../share/renderedFields/input';
import renderedSelectField from '../../share/renderedFields/select';
import AddBookFormProps from './AddBookFormProps';

import { ADD_BOOK_FORM } from '../../constants/reduxForms';

import { Button, Divider, Step, StepLabel, Stepper } from '@material-ui/core';

import { isbn, lessThanZero, required } from '../../validation/fields';

let AddBookForm: any = (props: AddBookFormProps) => {
    const { handleSubmit, invalid } = props;

    const getSteps = (): string[] => {
        return ['Main', 'Secondary', 'Finish'];
    };

    const step1 = (
        <>
            <Field
                name="isbn"
                className="form-field"
                type="text"
                label="ISBN"
                validate={[required, isbn]}
                component={renderedTextField}
            />
            <Field
                name="title"
                className="form-field"
                type="text"
                label="Title"
                validate={[required]}
                component={renderedTextField}
            />
            <Field
                name="quantity"
                className="form-field"
                type="number"
                label="Quantity"
                validate={[required, lessThanZero]}
                component={renderedTextField}
            />
            {/*<Field*/}
            {/*    name="departmentId"*/}
            {/*    className="form-field"*/}
            {/*    label="Department"*/}
            {/*    validate={[required]}*/}
            {/*    component={renderedSelectField}*/}
            {/*/>*/}
        </>
    );

    const step2 = (
        <>
            <Field
                name="description"
                className="form-field"
                type="text"
                label="Description"
                validate={[required]}
                component={renderedTextField}
            />
            {/*<Field*/}
            {/*    name="authorId"*/}
            {/*    className="form-field"*/}
            {/*    label="Author"*/}
            {/*    validate={[required]}*/}
            {/*    component={renderedSelectField}*/}
            {/*/>*/}
            <Field
                name="language"
                className="form-field"
                type="text"
                label="Language"
                validate={[required]}
                component={renderedTextField}
            />
        </>
    );

    const step3 = (
        <>
            {/*<Field*/}
            {/*    name="image"*/}
            {/*    className="form-field"*/}
            {/*    type="file"*/}
            {/*    label="Image"*/}
            {/*    validate={[required]}*/}
            {/*    component={renderedTextField}*/}
            {/*/>*/}
        </>
    );

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return step1;
            case 1:
                return step2;
            case 2:
                return step3;
            default:
                return step1;
        }
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <>
            <h2>Book Adding</h2>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label: string) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep)}
                <div className="form-btn-container">
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                        className="form-btn"
                    >
                        Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                        <Button
                            className="form-btn"
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={invalid}
                        >
                            Create
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            className="form-btn"
                            color="primary"
                            onClick={handleNext}
                            disabled={invalid}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </form>
        </>
    );
};

AddBookForm = reduxForm({
    form: ADD_BOOK_FORM
})(AddBookForm);

export default AddBookForm;
