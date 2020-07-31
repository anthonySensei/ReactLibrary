import React, { ChangeEvent, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Field, reduxForm } from 'redux-form';

import {
    Button,
    Container,
    Divider,
    IconButton,
    MenuItem,
    TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { FILTER_FORM } from '../../../constants/reduxForms';
import { BookFilters } from '../../../constants/BookFilters';

import renderedSelectField from '../../../share/renderedFields/select';
import renderedTextField from '../../../share/renderedFields/input';

import Department from '../../../interfaces/Department';
import Author from '../../../interfaces/Author';
import Genre from '../../../interfaces/Genre';
import BooksFilter from '../../../interfaces/BooksFilter';
import FilterFormProps from '../../../interfaces/props/Home/FilterFormProps';

import {
    higherThanToYear,
    lessThanZero,
    notEmptyFilterValue
} from '../../../validation/fields';

import './FilterForm.scss';

let FilterForm: any = (props: FilterFormProps) => {
    const { handleSubmit, reset, filter } = props;
    const { onPaginate, onSetGenres, onToggleDrawer } = props;

    const authors: Author[] = props.authors || [];
    const genres: Genre[] = props.genres || [];
    const departments: Department[] = props.departments || [];
    const shortId = require('shortid');

    const filterObj: BooksFilter = props.filterObj;

    useEffect(() => {
        props.initialize(filterObj);
    }, [
        filterObj.value,
        filterObj.tYear,
        filterObj.fYear,
        filterObj.filter,
        filterObj.departmentId,
        filterObj.authorId
    ]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="close-panel-button">
                <IconButton onClick={onToggleDrawer(false)}>
                    <CloseIcon className="close-btn" />
                </IconButton>
            </div>
            <Container className="filter-panel-container">
                <Field
                    className={[
                        'form-control',
                        filter === BookFilters.ISBN ? 'uppercase' : 'capitalize'
                    ].join(' ')}
                    component={renderedSelectField}
                    name="filter"
                    label="Filter"
                >
                    {Object.values(BookFilters).map(filter => (
                        <MenuItem
                            key={shortId.generate()}
                            className={
                                filter === BookFilters.ISBN
                                    ? 'uppercase'
                                    : 'capitalize'
                            }
                            value={filter}
                        >
                            {filter}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    name="value"
                    className="form-control"
                    type="text"
                    label="Value"
                    validate={[notEmptyFilterValue]}
                    disabled={!filter || filter === BookFilters.NOTHING}
                    component={renderedTextField}
                />
                <Field
                    className="form-control"
                    name="authorId"
                    label="Author"
                    disabled={filter === BookFilters.ISBN}
                    component={renderedSelectField}
                >
                    <MenuItem value="">
                        <em>Nothing</em>
                    </MenuItem>
                    <Divider />
                    {authors.map((author: Author) => (
                        <MenuItem key={shortId.generate()} value={author._id}>
                            {author.name}({author.country})
                        </MenuItem>
                    ))}
                </Field>
                <Autocomplete
                    multiple
                    options={genres}
                    getOptionLabel={(genre: Genre) => genre.name}
                    value={props.selectedGenres}
                    onChange={(e: ChangeEvent<{}>, values: Genre[]) => {
                        onSetGenres(values);
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Genres"
                            placeholder="Genres"
                            disabled={filter === BookFilters.ISBN}
                        />
                    )}
                />
                <Field
                    name="fYear"
                    className="form-control"
                    type="number"
                    label="From year"
                    validate={[lessThanZero, higherThanToYear]}
                    disabled={filter === BookFilters.ISBN}
                    component={renderedTextField}
                />
                <Field
                    name="tYear"
                    className="form-control"
                    type="number"
                    label="To year"
                    validate={[lessThanZero]}
                    disabled={filter === BookFilters.ISBN}
                    component={renderedTextField}
                />
                <Field
                    className="form-control"
                    component={renderedSelectField}
                    name="departmentId"
                    label="Department"
                    disabled={filter === BookFilters.ISBN}
                >
                    <MenuItem value="all">
                        <em>All</em>
                    </MenuItem>
                    <Divider />
                    {departments.map((department: Department) => (
                        <MenuItem
                            key={shortId.generate()}
                            value={department._id}
                        >
                            {department.name}({department.address})
                        </MenuItem>
                    ))}
                </Field>
                <div className="form-btn-container">
                    <Button
                        type="submit"
                        className="form-btn"
                        variant="outlined"
                        color="primary"
                    >
                        Search
                    </Button>
                    <Button
                        type="button"
                        className="form-btn"
                        variant="outlined"
                        onClick={() => {
                            reset(FILTER_FORM);
                            onSetGenres([]);
                            onPaginate(1);
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </Container>
        </form>
    );
};

FilterForm = reduxForm({
    form: FILTER_FORM
})(FilterForm);

export default FilterForm;
