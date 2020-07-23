import React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BookDetailsCard from './BookDetailsCard';

import { UserRoles } from '../../../constants/UserRoles';

import { Button } from '@material-ui/core';

configure({ adapter: new Adapter() });

describe('<BookDetailsCard />', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<BookDetailsCard />);
    });

    it('should not render <Button /> if user is unauthenticated', () => {
        expect(wrapper.find(Button).exists()).toEqual(false);
    });

    it('should render one <Button /> if user is authenticated', () => {
        wrapper.setProps({ user: { role: UserRoles.STUDENT } });
        expect(wrapper.find(Button).exists()).toEqual(true);
    });
});
