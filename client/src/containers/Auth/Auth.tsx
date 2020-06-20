import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, setLoginError } from '../../redux/actions';

import { Card } from '@material-ui/core';

import LoginForm from '../../components/Auth/LoginForm/LoginForm';

import LoginData from '../../interfaces/Login';

import { ClientLinks } from '../../constants/ClientLinks';

import './Auth.scss';
import { AuthTypes } from '../../constants/AuthTypes';
import RegistrationForm from '../../components/Auth/RegistrationForm/RegistrationForm';

const Auth = (props: any) => {
    const [authType, setAuthType] = useState(AuthTypes.LOGIN);

    let authRedirect = null;
    if (props.isLoggedIn) {
        authRedirect = <Redirect to={ClientLinks.HOME_PAGE} />;
    }
    const handleLogin = (loginData: LoginData) => {
        props.onLogin(loginData);
    };

    const handleRegistration = (registrationData: any) => {
        console.log(registrationData);
    };

    const handleSwitchAuth = (authType: AuthTypes) => {
        setAuthType(authType);
    };

    let authPage;

    switch (authType) {
        case AuthTypes.LOGIN:
            document.title = 'Login';
            authPage = (
                <LoginForm
                    onSubmit={handleLogin}
                    loginError={props.loginError}
                    setLoginError={props.onSetLoginError}
                    switchAuth={handleSwitchAuth}
                />
            );
            break;
        case AuthTypes.REGISTRATION:
            document.title = 'Registration';
            authPage = (
                <RegistrationForm
                    switchAuth={handleSwitchAuth}
                    onSubmit={handleRegistration}
                />
            );
            break;
        default:
            document.title = 'Login';
            authPage = (
                <LoginForm
                    onSubmit={handleLogin}
                    loginError={props.loginError}
                    setLoginError={props.onSetLoginError}
                    switchAuth={handleSwitchAuth}
                />
            );
    }

    return (
        <Card className="card auth-form">
            {authRedirect}
            {authPage}
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
