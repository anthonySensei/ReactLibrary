import reducer from './auth';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    loginError: null,
    message: null,
    activationError: null
};

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store user if login is successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.LOGIN_USER_SUCCESS,
                response: {
                    user: {
                        id: '123'
                    }
                }
            })
        ).toEqual({
            ...initialState,
            user: {
                id: '123'
            }
        });
    });

    it('should store message if registration is success', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.REGISTRATION_SUCCESS,
                response: { message: 'Message' }
            })
        ).toEqual({ ...initialState, message: 'Message' });
    });

    it('should store login error if login is not successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.LOGIN_USER_ERROR,
                error: 'error'
            })
        ).toEqual({ ...initialState, loginError: 'error' });
    });

    it('should set login error', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.SET_LOGIN_ERROR,
                result: 'error'
            })
        ).toEqual({ ...initialState, loginError: 'error' });
    });

    it('should clear user if logout', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.LOGOUT_USER
            })
        ).toEqual(initialState);
    });

    it('should store message if user is activated successfully', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.ACTIVATE_USER_SUCCESS,
                message: 'message'
            })
        ).toEqual({ ...initialState, message: 'message' });
    });

    it('should store activation error if user activation is not successful', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.ACTIVATE_USER_ERROR,
                error: 'error'
            })
        ).toEqual({ ...initialState, activationError: 'error' });
    });
});
