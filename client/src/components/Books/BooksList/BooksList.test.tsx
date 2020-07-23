import React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Card } from '@material-ui/core';

import BooksList from './BooksList';

configure({ adapter: new Adapter() });

describe('<BooksList />', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<BooksList books={[]} departmentId={'all'} />);
    });

    it('should not render book <Card /> if there are no books', () => {
        wrapper.setProps({ books: [] });
        expect(wrapper.find(Card).exists()).toEqual(false);
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it('should not render department on book <Card /> if department is selected', () => {
        wrapper.setProps({
            departmentId: 1,
            books: [
                {
                    title: 'Title',
                    image: 'image',
                    description: 'description',
                    author: {
                        name: 'name'
                    },
                    genres: ['Genre'],
                    year: '2000',
                    quantity: '1'
                }
            ]
        });
        expect(wrapper.find('p')).toHaveLength(4);
    });
});
