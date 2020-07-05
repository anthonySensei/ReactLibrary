import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiFilter } from 'react-icons/all';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
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

import BooksList from '../../components/Books/BooksList/BooksList';
import FilterForm from '../../components/Books/FilterForm/FilterForm';
import PaginationContainer from '../../components/Books/PaginationContainer/PaginationContainer';

import Department from '../../interfaces/Department';
import BooksFilter from '../../interfaces/BooksFilter';
import HomePageProps from '../../interfaces/props/HomePageProps';
import Genre from '../../interfaces/Genre';

import {
    addFilterToQueryParamsService,
    getFilterObjService
} from '../../services/bookService';

import { homePageStyles } from '../../constants/styles';
import { FILTER_FORM } from '../../constants/reduxForms';

import './Home.scss';

const Home = (props: HomePageProps) => {
    document.title = 'Home';

    const shortId = require('shortid');

    const classes = homePageStyles();
    const history = useHistory();
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const department: string = props.departmentId;
    const departments: Department[] = props.departments;

    const params = new URLSearchParams(props.location.search);
    const page: string | number = params.get('page') || 1;
    const authorId: string | null = params.get('authorId');
    const departmentId: string | null = params.get('departmentId');
    const filter: string | null = params.get('filter');
    const fYear: string | null = params.get('fYear');
    const tYear: string | null = params.get('tYear');
    const value: string | null = params.get('value');

    const { authors, genres, books } = props;
    const { onGetBooks, onGetDepartments, onGetAuthors, onGetGenres } = props;
    const { onSetDepartment, onSetSelectedGenres } = props;
    const { isLoading, paginationData, selectedGenres, formValues } = props;

    const getFilterObj = () => {
        return getFilterObjService(
            authorId,
            departmentId,
            filter,
            fYear,
            tYear,
            value
        );
    };

    useEffect(() => {
        onGetBooks(page, getFilterObj(), department);
        onGetDepartments();
    }, []);

    useEffect(() => {
        onGetBooks(page, getFilterObj(), department);
    }, [page]);

    const toggleDrawer = (isOpen: boolean) => (): void => {
        setIsOpenFilter(isOpen);
        if (isOpen) {
            onGetAuthors();
            onGetGenres();
        }
    };

    const handleChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ): void => {
        const departmentId: string = event.target.value as string;
        onSetDepartment(departmentId);
        onGetBooks(page, {}, departmentId);
    };

    const filterBooks = (filterObj: BooksFilter): void => {
        if (filterObj.departmentId) onSetDepartment(filterObj.departmentId);
        addFilterToQueryParams(filterObj);
        onGetBooks(
            page,
            { ...filterObj, genres: JSON.stringify(props.selectedGenres) },
            filterObj.departmentId
        );
    };

    const handlePagination = (page: string | number): void => {
        history.push('/?page=' + page);
    };

    const addFilterToQueryParams = (filterObj: BooksFilter): void => {
        addFilterToQueryParamsService(filterObj, history);
    };

    return (
        <Container>
            <Drawer anchor={'left'} open={isOpenFilter}>
                <FilterForm
                    onToggleDrawer={toggleDrawer}
                    departments={departments}
                    authors={authors}
                    genres={genres}
                    onSubmit={filterBooks}
                    filterObj={getFilterObj()}
                    onPaginate={handlePagination}
                    filter={formValues?.filter}
                    onSetGenres={onSetSelectedGenres}
                    selectedGenres={selectedGenres}
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
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <BooksList
                        departmentId={department}
                        shortId={shortId}
                        books={books}
                    />
                )}
            </Card>
            {!isLoading &&
                (paginationData.hasPreviousPage ||
                    paginationData.hasNextPage) && (
                    <Card className={classes.paginationContainer}>
                        <PaginationContainer
                            paginationData={paginationData}
                            onHandlePagination={handlePagination}
                        />
                    </Card>
                )}
        </Container>
    );
};

const mapStateToProps = (state: any) => ({
    books: state.book.books,
    genres: state.genre.genres,
    authors: state.author.authors,
    paginationData: state.book.paginationData,
    isLoading: state.loading.loading,
    department: state.department.department,
    departments: state.department.departments,
    selectedGenres: state.genre.selectedGenres,
    formValues: getFormValues(FILTER_FORM)(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onGetBooks: (
            page: string | number,
            filterObj: any,
            departmentId: string
        ) => dispatch(getBooks(page, filterObj, departmentId)),
        onGetDepartments: () => dispatch(getDepartments()),
        onSetDepartment: (departmentId: string) =>
            dispatch(setDepartment(departmentId)),
        onSetSelectedGenres: (genres: Genre[]) =>
            dispatch(setSelectedGenres(genres)),
        onGetAuthors: () => dispatch(getAuthors()),
        onGetGenres: () => dispatch(getGenres())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
