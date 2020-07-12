import React from 'react';

import {
    CommonWrapper,
    configure,
    mount,
    shallow,
    ShallowWrapper
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { activateUser } from '../../redux/actions';

import ConnectedActivationPage, { ActivationPage } from './ActivationPage';

import { Redirect } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { act } from 'react-test-renderer';

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
const initialState = {
    auth: {
        message: 'Message',
        activationError: null
    }
};

let props: any = {
    location: {
        search: '?token=token',
        hash: '/activation-page',
        state: undefined,
        pathname: ''
    }
};

describe('<ActivationPage />', () => {
    const store = mockStore(initialState);
    let wrapper: CommonWrapper | ShallowWrapper | any;
    let container: ShallowWrapper;

    const storeActivateUser = (token: string) => {
        store.dispatch(activateUser(token));
    };

    beforeEach(() => {
        store.dispatch = jest.fn();
        container = shallow(<ConnectedActivationPage store={store} />);
        props = { ...props, message: '', error: '' };
        wrapper = shallow(<ActivationPage {...props} />);
    });

    it('should render the connected(SMART) component and check if props match with initial state', () => {
        expect(container.length).toEqual(1);
        wrapper = container.children();
        expect(wrapper.prop('message')).toEqual(initialState.auth.message);
        expect(wrapper.prop('error')).toEqual(
            initialState.auth.activationError
        );
    });

    it('should dispatch "activateUser"', () => {
        act(() => {
            props = { ...props, onActivate: storeActivateUser };
            wrapper = mount(<ActivationPage {...props} />);
        });
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(activateUser('token'));
    });

    it('should render "p" with error message if error', () => {
        wrapper.setProps({ error: 'error' });
        expect(wrapper.find('p')).toHaveLength(1);
    });

    it('should redirect if token successfully verifying', () => {
        wrapper.setProps({ error: null, message: 'Done' });
        expect(wrapper.find(Redirect)).toHaveLength(1);
    });
});
