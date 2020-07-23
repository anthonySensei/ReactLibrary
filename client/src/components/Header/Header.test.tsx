import React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Card, Typography } from '@material-ui/core';

import Header from './Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('should render 2 links if user is not authenticated', () => {
        expect(wrapper.find(Typography)).toHaveLength(2);
    });
});
