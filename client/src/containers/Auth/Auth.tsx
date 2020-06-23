import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, registration, setLoginError } from '../../redux/actions';

import { Card } from '@material-ui/core';

import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegistrationForm from '../../components/Auth/RegistrationForm/RegistrationForm';

import LoginData from '../../interfaces/Login';
import RegistrationData from '../../interfaces/RegistrationData';

import { ClientLinks } from '../../constants/ClientLinks';
import { AuthTypes } from '../../constants/AuthTypes';

import './Auth.scss';
import {Dispatch} from "redux";

interface AuthProps {
    message: string;
    onLogin: (loginData: LoginData) => void;
    onRegistration: (registrationData: RegistrationData) => void;
    isLoggedIn: boolean;
    loginError: string;
    onSetLoginError: (isError: boolean) => void;
}

const Auth = (props: AuthProps) => {
    const [authType, setAuthType] = useState(AuthTypes.LOGIN);
    const message = props.message;

    let authRedirect = null;
    if (props.isLoggedIn) {
        authRedirect = <Redirect to={ClientLinks.HOME_PAGE} />;
    }
    const handleLogin = (loginData: LoginData): void => {
        props.onLogin(loginData);
    };

    const handleRegistration = (registrationData: RegistrationData): void => {
        props.onRegistration(registrationData);
    };

    const handleSwitchAuth = (authType: AuthTypes): void => {
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
                    message={message}
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
