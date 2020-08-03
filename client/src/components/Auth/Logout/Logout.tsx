import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { logout } from '../../../redux/actions';

import LogoutProps from './LogoutProps';


export const Logout = (props: LogoutProps) => {
    props.onLogout();

    return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onLogout: () => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);
