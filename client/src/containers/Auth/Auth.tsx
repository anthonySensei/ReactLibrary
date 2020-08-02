import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loginUser, registration, setLoginError } from '../../redux/actions';

import { Card } from '@material-ui/core';

import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegistrationForm from '../../components/Auth/RegistrationForm/RegistrationForm';

import LoginData from '../../interfaces/formsData/LoginData';
import RegistrationData from '../../interfaces/formsData/RegistrationData';
import AuthProps from './AuthProps';

import { ClientLinks } from '../../constants/ClientLinks';
import { AuthTypes } from '../../constants/AuthTypes';

import './Auth.scss';

export const Auth = (props: AuthProps) => {
    const [authType, setAuthType] = useState(AuthTypes.LOGIN);
    const { message, isLoggedIn, loginError } = props;
    const { onLogin, onRegistration, onSetLoginError } = props;

    let authRedirect = null;
    if (isLoggedIn) {
        authRedirect = <Redirect to={ClientLinks.HOME_PAGE} />;
    }
    const handleLogin = (loginData: LoginData): void => {
        onLogin(loginData);
    };

    const handleRegistration = (registrationData: RegistrationData): void => {
        onRegistration(registrationData);
    };

    const handleSwitchAuth = (authType: AuthTypes): void => {
        setAuthType(authType);
    };

    let authPage;

    const loginForm = (
        <LoginForm
            onSubmit={handleLogin}
            loginError={loginError}
            setLoginError={onSetLoginError}
            switchAuth={handleSwitchAuth}
        />
    );

    switch (authType) {
        case AuthTypes.LOGIN:
            document.title = 'Login';
            authPage = loginForm;
            break;
        case AuthTypes.REGISTRATION:
            document.title = 'Registration';
            authPage = (
                <RegistrationForm
                    switchAuth={handleSwitchAuth}
                    onSubmit={handleRegistration}
                    message={message}
                />
            );
            break;
        default:
            document.title = 'Login';
            authPage = loginForm;
    }

    return (
        <Card className="card form">
            {authRedirect}
            {authPage}
        </Card>
    );
};

const mapStateToProps = (state: any) => ({
    isLoggedIn: !!state.auth.user,
    message: state.auth.message,
    loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onLogin: (loginData: LoginData) => dispatch(loginUser(loginData)),
        onSetLoginError: (data: boolean) => dispatch(setLoginError(data)),
        onRegistration: (registrationData: RegistrationData) =>
            dispatch(registration(registrationData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
