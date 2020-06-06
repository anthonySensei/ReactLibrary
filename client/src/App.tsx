import React, { useEffect } from 'react';
import './App.scss';

import Routers from './router/Routers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { checkState } from './redux/actions';

const App = (props: any) => {
    useEffect(() => {
        props.onTryAutoLogin();
    }, [props]);
    return <Routers />;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onTryAutoLogin: () => dispatch(checkState())
    };
};

export default connect(null, mapDispatchToProps)(App);
