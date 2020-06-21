import React from 'react';

import { Button, Divider, Step, StepLabel, Stepper } from '@material-ui/core';

import { Field, reduxForm } from 'redux-form';

import { AuthTypes } from '../../../constants/AuthTypes';
import { REGISTRATION_FORM } from '../../../constants/reduxForms';

import renderedTextField from '../../../share/renderedFields/input';

import {
    email,
    id,
    password,
    required,
    retypePassword
} from '../../../validation/fields';
import { asyncStudentIdValidate } from '../../../validation/asyncValidation';
import { handleSnackbarOpenService } from '../../../services/snackbar';
import { SnackbarTypes } from '../../../constants/snackbarTypes';

let RegistrationForm: any = (props: any) => {
    const { handleSubmit, invalid } = props;
    const message = props.message;

    if (message) {
        props.switchAuth(AuthTypes.LOGIN);
        handleSnackbarOpenService(true, SnackbarTypes.SUCCESS, message);
    }

    const getSteps = () => {
        return ['Main', 'Password', 'Finish'];
    };

    const step1 = (
        <>
            <Field
                name="studentId"
                className="form-field"
                type="text"
                label="Student ID"
                validate={[required, id]}
                component={renderedTextField}
            />
            <Field
                name="email"
                className="form-field"
                type="text"
                label="Email"
                validate={[required, email]}
                component={renderedTextField}
            />
        </>
    );

    const step2 = (
        <>
            <Field
                name="password"
                className="form-field"
                type="password"
                label="Password"
                validate={[required, password]}
                component={renderedTextField}
            />
            <Field
                name="retypePassword"
                className="form-field"
                type="password"
                label="Retype password"
                validate={[required, password, retypePassword]}
                component={renderedTextField}
            />
        </>
    );

    const step3 = (
        <>
            <Field
                name="name"
                className="form-field"
                type="text"
                label="Name"
                validate={[required]}
                component={renderedTextField}
            />
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
            <h2>Registration</h2>
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
                <Divider />
                <div className="links-group">
                    <p
                        className="auth-link"
                        onClick={() => props.switchAuth(AuthTypes.LOGIN)}
                    >
                        Have an account?
                    </p>
                </div>
            </form>
        </>
    );
};

RegistrationForm = reduxForm({
    form: REGISTRATION_FORM,
    asyncValidate: asyncStudentIdValidate
})(RegistrationForm);

export default RegistrationForm;
