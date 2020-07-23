import React from 'react';
import { act } from 'react-test-renderer';

import { configure, mount, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from './Home';

import BooksList from '../../components/Books/BooksList/BooksList';
import PaginationContainer from '../../components/Books/PaginationContainer/PaginationContainer';

import { CircularProgress } from '@material-ui/core';

import BooksFilter from '../../interfaces/BooksFilter';

import configureStore from 'redux-mock-store';
import { getBooks, getDepartments } from '../../redux/actions';

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

const initialState = {
    book: {
        books: [],
        paginationData: {}
    },
    department: {
        department: null,
        departments: []
    },
    loading: {
        loading: false
    },
    genre: {
        genres: [],
        selectedGenres: []
    },
    author: {
        authors: []
    }
};

let props: any = {
    location: {
        search: '',
        pathname: '/',
        state: undefined,
        hash: ''
    },
    departmentId: '',
    paginationData: {
        hasNextPage: false,
        hasPreviousPage: false,
        nextPage: 0,
        lastPage: 0,
        previousPage: 0,
        currentPage: 0
    },
    formValues: {}
};

describe('<Home />', () => {
    let wrapper: ShallowWrapper | any;
    const store = mockStore(initialState);

    const storeGetBooks = (
        page: string | number,
        filterObj: {} | BooksFilter,
        departmentId: string
    ) => {
        store.dispatch(getBooks(page, filterObj, departmentId));
    };

    const storeGetDepartments = () => {
        store.dispatch(getDepartments());
    };

    beforeEach(() => {
        wrapper = shallow(<Home {...props} />);
        store.dispatch = jest.fn();
    });

    it('should not render <BookList /> and <PaginationContainer /> if page is loading', async () => {
        wrapper.setProps({
            isLoading: true
        });
        expect(wrapper.find(CircularProgress).exists()).toEqual(true);
        expect(wrapper.find(BooksList).exists()).toEqual(false);
        expect(wrapper.find(PaginationContainer).exists()).toEqual(false);
    });

    it('should dispatch "getBooks" if page is rendered', function () {
        props = {
            ...props,
            onGetBooks: storeGetBooks,
            onGetDepartments: storeGetDepartments
        };
        act(() => {
            wrapper = mount(<Home {...props} />);
        });
        expect(store.dispatch).toHaveBeenCalledTimes(3);
        expect(store.dispatch).toHaveBeenCalledWith(getBooks(1, {}, ''));
        expect(store.dispatch).toHaveBeenCalledWith(getDepartments());
    });
});
