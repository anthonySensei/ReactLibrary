import React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Auth } from './Auth';

import LoginForm from '../../components/Auth/LoginForm/LoginForm';

configure({ adapter: new Adapter() });

describe('<Auth />', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Auth />);
    });

    it('should render <LoginForm /> by default', () => {
        expect(wrapper.find(LoginForm).exists()).toEqual(true);
    });
});
