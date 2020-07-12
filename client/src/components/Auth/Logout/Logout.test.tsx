import React from 'react';
import { Redirect } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { logout } from '../../../redux/actions';

import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Logout } from './Logout';

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

describe('<BookDetailsCard />', () => {
    let wrapper: ShallowWrapper;
    const store = mockStore({});

    const storeLogout = () => {
        store.dispatch(logout());
    };

    beforeEach(() => {
        store.dispatch = jest.fn();
        wrapper = shallow(<Logout onLogout={storeLogout} />);
    });

    it('should dispatch "logout" and redirect to main page', () => {
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(logout());
        expect(wrapper.find(Redirect).exists()).toEqual(true);
    });
});
