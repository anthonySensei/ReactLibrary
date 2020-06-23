import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { activateUser } from '../../redux/actions';

import { ClientLinks } from '../../constants/ClientLinks';
import { SnackbarTypes } from '../../constants/snackbarTypes';

import { CircularProgress } from '@material-ui/core';

import { handleSnackbarOpenService } from '../../services/snackbar';

import './ActivationPage.scss';

import { Dispatch } from 'redux';

interface ActivationPageProps extends RouteComponentProps<{}> {
    message: string;
    error: string;
    onActivate: (token: string) => void;
}

const ActivationPage = (props: ActivationPageProps) => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get('token');

    const message = props.message;
    let error = props.error;

    if (!token) error = 'Token is not found';

    let redirect = null;

    if (message) {
        redirect = <Redirect to={ClientLinks.LOGIN} />;
        handleSnackbarOpenService(true, SnackbarTypes.SUCCESS, message);
    }

    let main = (
        <>
            <h2>Token is being verified</h2>
            <CircularProgress />
        </>
    );

    if (error) {
        main = (
            <>
                <h2>Token error</h2>
                <p>{error}</p>
            </>
        );
    }

    useEffect(() => {
        if (token) {
            props.onActivate(token);
        }
    }, [token]);

    return (
        <>
            <section className="activation-page-container">
                {redirect}
                <section className="card activation-section">{main}</section>
            </section>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    message: state.auth.message,
    error: state.auth.activationError
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onActivate: (activationToken: string) =>
            dispatch(activateUser(activationToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivationPage);
