import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import FilterForm from '../../components/Books/FilterForm/FilterForm';
import PaginationContainer from '../../components/Books/PaginationContainer/PaginationContainer';

import Department from '../../interfaces/Department';
import Genre from '../../interfaces/Genre';
import BooksFilter from '../../interfaces/BooksFilter';

import './Home.scss';

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
    const history = useHistory();
    const department = props.department;
    const departments = props.departments;
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const shortId = require('shortid');
    const params = new URLSearchParams(props.location.search);
    const page: string | number = params.get('page') || 1;

    const authorId: string | null = params.get('authorId');
    const departmentId: string | null = params.get('departmentId');
    const filter: string | null = params.get('filter');
    const fYear: string | null = params.get('fYear');
    const tYear: string | null = params.get('tYear');
    const value: string | null = params.get('value');

    const getFilterObj = () => {
        let authorIdField = {};
        let departmentIdField = {};
        let filterField = {};
        let fYearField = {};
        let tYearField = {};
        let valueField = {};
        if (authorId) authorIdField = { authorId };
        if (departmentId) departmentIdField = { departmentId };
        if (filter) filterField = { filter };
        if (fYear) fYearField = { fYear };
        if (tYear) tYearField = { tYear };
        if (value) valueField = { value };
        return {
            ...authorIdField,
            ...departmentIdField,
            ...filterField,
            ...tYearField,
            ...fYearField,
            ...valueField
        };
    };

    useEffect(() => {
        props.onGetBooks(page, getFilterObj(), department);
        props.onGetDepartments();
        props.onGetGenres();
        props.onGetAuthors();
    }, []);

    useEffect(() => {
        props.onGetBooks(page, getFilterObj(), department);
    }, [page]);

    const toggleDrawer = (isOpen: boolean) => (): void => {
        setIsOpenFilter(isOpen);
    };

    const handleChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ): void => {
        const departmentId: string = event.target.value as string;
        props.onSetDepartment(departmentId);
        props.onGetBooks(page, {}, departmentId);
    };

    const filterBooks = (filterObj: BooksFilter): void => {
        if (filterObj.departmentId)
            props.onSetDepartment(filterObj.departmentId);
        handleFilter(filterObj);
        props.onGetBooks(
            page,
            { ...filterObj, genres: JSON.stringify(props.selectedGenres) },
            filterObj.departmentId
        );
    };

    const handlePagination = (page: string | number): void => {
        history.push('/?page=' + page);
    };

    const handleFilter = (filterObj: BooksFilter): void => {
        let authorIdQuery: string = '';
        let departmentIdQuery: string = '';
        let filterQuery: string = '';
        let fYearQuery: string = '';
        let tYearQuery: string = '';
        let valueQuery: string = '';
        if (filterObj.authorId)
            authorIdQuery = `authorId=${filterObj.authorId}&`;
        if (filterObj.departmentId)
            departmentIdQuery = `departmentId=${filterObj.departmentId}&`;
        if (filterObj.filter) filterQuery = `filter=${filterObj.filter}&`;
        if (filterObj.fYear) fYearQuery = `fYear=${filterObj.fYear}&`;
        if (filterObj.tYear) tYearQuery = `tYear=${filterObj.tYear}&`;
        if (filterObj.value) valueQuery = `value=${filterObj.value}&`;
        history.push(
            `/?${authorIdQuery}${departmentIdQuery}${filterQuery}${fYearQuery}${tYearQuery}${valueQuery}`
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
                    filterObj={getFilterObj()}
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
            {props.isLoading ||
            !props.paginationData.hasPreviousPage ||
            !props.paginationData.hasNextPage ? (
                ''
            ) : (
                <Card className={classes.paginationContainer}>
                    <PaginationContainer
                        paginationData={props.paginationData}
                        onHandlePagination={handlePagination}
                    />
                </Card>
            )}
        </Container>
    );
};

const mapStateToProps = (state: any) => ({
    books: state.book.books,
    paginationData: state.book.paginationData,
    isLoading: state.loading.loading,
    department: state.department.department,
    departments: state.department.departments,
    genres: state.genre.genres,
    selectedGenres: state.genre.selectedGenres,
    authors: state.author.authors
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetBooks: (
            page: string | number,
            filterObj: any,
            departmentId: string
        ) => dispatch(getBooks(page, filterObj, departmentId)),
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
