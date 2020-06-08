import React, {ChangeEvent, useEffect} from 'react';
import {IoMdClose} from 'react-icons/all';
import {Field, reduxForm} from 'redux-form';

import {
    Button,
    Container,
    Divider,
    IconButton,
    MenuItem,
    TextField
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Autocomplete} from '@material-ui/lab';

import {FILTER_FORM} from '../../../constants/reduxForms';
import {bookFilters} from '../../../constants/bookFilters';

import renderedSelectField from '../../../share/renderedFields/select';
import renderedTextField from '../../../share/renderedFields/input';

import Department from '../../../interfaces/Department';
import Author from '../../../interfaces/Author';
import Genre from '../../../interfaces/Genre';
import BooksFilter from '../../../interfaces/BooksFilter';

const useStyles = makeStyles({
    formControl: {
        minWidth: '100%',
        textAlign: 'left',
        margin: '10px auto'
    },
    closeBtnPanel: {
        backgroundColor: '#2196F3',
        textAlign: 'right',
        width: 250
    },
    closeBtn: {
        color: '#fff'
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    container: {
        maxWidth: 250
    }
});

let FilterForm: any = (props: any) => {
    const classes = useStyles();
    const { handleSubmit } = props;
    const authors = props.authors || [];
    const genres = props.genres || [];
    const departments = props.departments || [];
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
            <div className={classes.closeBtnPanel}>
                <IconButton onClick={props.onToggleDrawer(false)}>
                    <IoMdClose className={classes.closeBtn} />
                </IconButton>
            </div>
            <Container className={classes.container}>
                <Field
                    className={classes.formControl}
                    component={renderedSelectField}
                    name="filter"
                    label="Filter"
                >
                    <MenuItem value="nothing">
                        <em>Nothing</em>
                    </MenuItem>
                    <Divider />
                    {bookFilters.map(filter => (
                        <MenuItem
                            key={shortId.generate()}
                            className={
                                filter === 'isbn'
                                    ? classes.uppercase
                                    : classes.capitalize
                            }
                            value={filter}
                        >
                            {filter}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    name="value"
                    className={classes.formControl}
                    type="text"
                    label="Value"
                    component={renderedTextField}
                />
                <Field
                    className={classes.formControl}
                    component={renderedSelectField}
                    name="authorId"
                    label="Author"
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
                    onChange={(e: ChangeEvent<{}>, values: Genre[]) => {
                        props.onSetGenres(values);
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
                    name="fYear"
                    className={classes.formControl}
                    type="number"
                    label="From year"
                    component={renderedTextField}
                />
                <Field
                    name="tYear"
                    className={classes.formControl}
                    type="number"
                    label="To year"
                    component={renderedTextField}
                />
                <Field
                    className={classes.formControl}
                    component={renderedSelectField}
                    name="departmentId"
                    label="Department"
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
