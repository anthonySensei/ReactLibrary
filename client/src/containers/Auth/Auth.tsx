import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, setLoginError } from '../../redux/actions';

import { Card } from '@material-ui/core';

import LoginForm from '../../components/Auth/LoginForm/LoginForm';

import LoginData from '../../interfaces/Login';

import { ClientLinks } from '../../constants/ClientLinks';

import './Auth.scss';

const Auth = (props: any) => {
    let authRedirect = null;
    if (props.isLoggedIn) {
        authRedirect = <Redirect to={ClientLinks.HOME_PAGE} />;
    }
    const loginHandler = (loginData: LoginData) => {
        props.onLogin(loginData);
    };

    return (
        <Card className="card auth-form">
            {authRedirect}
            <LoginForm
                onSubmit={loginHandler}
                loginError={props.loginError}
                setLoginError={props.onSetLoginError}
            />
        </Card>
    );
};

const mapStateToProps = (state: any) => ({
    isLoggedIn: !!state.auth.user,
    loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: (data: any) => dispatch(loginUser(data)),
        onSetLoginError: (data: boolean) => dispatch(setLoginError(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
