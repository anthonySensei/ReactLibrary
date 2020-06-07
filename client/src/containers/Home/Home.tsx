import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/all';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import {
    getAuthors,
    getBooks,
    getDepartments,
    getGenres,
    setDepartment,
    setSelectedGenres
} from '../../redux/actions';

import {
    Button,
    ButtonGroup,
    Card,
    CircularProgress,
    Container,
    Divider,
    Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BooksList from '../../components/Books/BooksList/BooksList';

import './Home.scss';
import Department from '../../interfaces/Department';
import FilterForm from '../../components/Books/FilterForm/FilterForm';
import Genre from '../../interfaces/Genre';

const useStyles = makeStyles({
    pageTitle: {
        textAlign: 'center',
        marginTop: '5%',
        marginBottom: '0.5%'
    },
    booksContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '50px 20px'
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0',
        padding: '10px 0'
    },
    formControl: {
        minWidth: 170,
        textAlign: 'left'
    }
});

const Home = (props: any) => {
    document.title = 'Home';
    const classes = useStyles();
    const department = props.department;
    const departments = props.departments;
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const shortId = require('shortid');

    useEffect(() => {
        props.onGetBooks({}, department);
        props.onGetDepartments();
        props.onGetGenres();
        props.onGetAuthors();
    }, []);

    const toggleDrawer = (isOpen: boolean) => () => {
        setIsOpenFilter(isOpen);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const departmentId: string = event.target.value as string;
        props.onSetDepartment(departmentId);
        props.onGetBooks({}, departmentId);
    };

    const filterBooks = (filterObj: any) => {
        if (filterObj.departmentId)
            props.onSetDepartment(filterObj.departmentId);
        props.onGetBooks(
            { ...filterObj, genres: JSON.stringify(props.selectedGenres) },
            filterObj.departmentId
        );
    };

    return (
        <Container>
            <Drawer anchor={'left'} open={isOpenFilter}>
                <FilterForm
                    onToggleDrawer={toggleDrawer}
                    departments={departments}
                    authors={props.authors}
                    genres={props.genres}
                    onSubmit={filterBooks}
                    onSetGenres={props.onSetSelectedGenres}
                />
            </Drawer>
            <Card className={classes.pageTitle}>
                <h2>Books catalog</h2>
                <div className="filter-container">
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<FiFilter />}
                        onClick={toggleDrawer(true)}
                    >
                        Filter
                    </Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Department</InputLabel>
                        <Select value={department} onChange={handleChange}>
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
                </div>
            </Card>
            <Card className={classes.booksContainer}>
                {props.isLoading ? (
                    <CircularProgress />
                ) : (
                    <BooksList
                        books={props.books}
                        departmentId={department}
                        shortId={shortId}
                    />
                )}
            </Card>
            {props.isLoading ? (
                <CircularProgress />
            ) : (
                <Card className={classes.paginationContainer}>
                    <ButtonGroup
                        variant="contained"
                        color="primary"
                        aria-label="contained primary button group"
                    >
                        <Button>Previous page</Button>
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>Next page</Button>
                    </ButtonGroup>
                </Card>
            )}
        </Container>
    );
};

const mapStateToProps = (state: any) => ({
    books: state.book.books,
    isLoading: state.loading.loading,
    department: state.department.department,
    departments: state.department.departments,
    genres: state.genre.genres,
    selectedGenres: state.genre.selectedGenres,
    authors: state.author.authors
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetBooks: (filterObj: any, departmentId: string) =>
            dispatch(getBooks(filterObj, departmentId)),
        onGetDepartments: () => dispatch(getDepartments()),
        onGetAuthors: () => dispatch(getAuthors()),
        onGetGenres: () => dispatch(getGenres()),
        onSetDepartment: (departmentId: string) =>
            dispatch(setDepartment(departmentId)),
        onSetSelectedGenres: (genres: Genre[]) =>
            dispatch(setSelectedGenres(genres))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
