import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {logout} from '../../../redux/actions/index';

const Logout = (props: any) => {
    props.onLogout();

    return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);
