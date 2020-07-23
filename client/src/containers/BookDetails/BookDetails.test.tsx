import React from 'react';
import configureStore from 'redux-mock-store';
import { act } from 'react-test-renderer';

import {
    CommonWrapper,
    configure,
    mount,
    shallow,
    ShallowWrapper
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { getBook } from '../../redux/actions';

import { BookDetails } from './BookDetails';

import BookDetailsCard from '../../components/Books/BookDetailsCard/BookDetailsCard';

import { CircularProgress } from '@material-ui/core';

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
const initialState = {
    book: {
        title: 'Title',
        image: 'image',
        description: 'description',
        author: {
            name: 'name'
        },
        genres: ['Genre'],
        year: '2000',
        quantity: '1'
    },
    department: {
        department: {
            _id: '1'
        }
    },
    student: {
        student: {
            name: 'Name'
        }
    },
    loading: {
        isLoading: false
    },
    auth: {
        user: {
            _id: '1'
        }
    }
};

let props: any = {
    location: {
        search: '?bookId=1',
        hash: '/book-details',
        state: undefined,
        pathname: ''
    }
};

describe('<ConnectedBookDetails />', () => {
    const store = mockStore(initialState);
    let wrapper: CommonWrapper | ShallowWrapper | any;

    const storeGetBook = (bookId: string | null) => {
        store.dispatch(getBook(bookId));
    };

    beforeEach(() => {
        store.dispatch = jest.fn();
        wrapper = shallow(<BookDetails {...props} />);
    });

    it('should dispatch "getBook"', () => {
        props = { ...props, onGetBook: storeGetBook };
        act(() => {
            wrapper = mount(<BookDetails {...props} />);
        });
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(getBook('1'));
    });

    it('should not render book details if page is loading', function () {
        wrapper.setProps({ isLoading: true });
        expect(wrapper.find(CircularProgress).exists()).toEqual(true);
        expect(wrapper.find(BookDetailsCard).exists()).toEqual(false);
    });
});
