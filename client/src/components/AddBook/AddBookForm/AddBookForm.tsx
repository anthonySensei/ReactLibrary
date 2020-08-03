import React, { ChangeEvent } from 'react';
import { Field, reduxForm } from 'redux-form';

import renderedTextField from '../../../share/renderedFields/input';
import renderedSelectField from '../../../share/renderedFields/select';
import AddBookFormProps from './AddBookFormProps';

import { ADD_BOOK_FORM } from '../../../constants/reduxForms';

import {
    Button,
    Divider,
    MenuItem,
    Step,
    StepLabel,
    Stepper,
    TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import {
    biggerThanCurrentYear,
    departmentRequired,
    isbn,
    lessThanZero,
    required
} from '../../../validation/fields';
import { asyncBookAddingValidate } from '../../../validation/asyncValidation';

import Department from '../../../interfaces/Department';
import Author from '../../../interfaces/Author';
import Genre from '../../../interfaces/Genre';

let AddBookForm: any = (props: AddBookFormProps) => {
    const shortId = require('shortid');

    const { handleSubmit, invalid, onOpenChooseImageDialog } = props;
    const { authors, departments, genres, onSetGenres } = props;
    const { image } = props;

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
                validate={[required, isbn, departmentRequired]}
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
            <Field
                name="department"
                className="form-field"
                label="Department"
                validate={[required]}
                component={renderedSelectField}
            >
                <MenuItem>-</MenuItem>
                {departments.map((department: Department) => (
                    <MenuItem key={shortId.generate()} value={department._id}>
                        {department.name}({department.address})
                    </MenuItem>
                ))}
            </Field>
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
            <Field
                name="author"
                className="form-field"
                label="Author"
                validate={[required]}
                component={renderedSelectField}
            >
                <MenuItem>-</MenuItem>
                {authors.map((author: Author) => (
                    <MenuItem key={shortId.generate()} value={author._id}>
                        {author.name}({author.country})
                    </MenuItem>
                ))}
            </Field>
            <Autocomplete
                multiple
                className="autocomplete"
                options={genres}
                value={props.selectedGenres}
                getOptionLabel={(genre: Genre) => genre.name}
                onChange={(e: ChangeEvent<{}>, values: Genre[]) => {
                    onSetGenres(values);
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Genres"
                        placeholder="Genres"
                    />
                )}
            />
            <Field
                name="language"
                className="form-field"
                type="text"
                label="Language"
                validate={[required]}
                component={renderedTextField}
            />
            <Field
                name="year"
                className="form-field"
                type="number"
                label="Year"
                validate={[required, lessThanZero, biggerThanCurrentYear]}
                component={renderedTextField}
            />
        </>
    );

    const step3 = (
        <>
            <Button
                type="button"
                color="secondary"
                variant="outlined"
                onClick={onOpenChooseImageDialog}
            >
                Choose image
            </Button>
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
                        type="button"
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
                            disabled={invalid || !image}
                        >
                            Add
                        </Button>
                    ) : (
                        <Button
                            type="button"
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
    form: ADD_BOOK_FORM,
    asyncValidate: asyncBookAddingValidate
})(AddBookForm);

export default AddBookForm;
