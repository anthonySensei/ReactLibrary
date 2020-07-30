import React, { useEffect } from 'react';

import Routers from './router/Routers';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { checkState } from './redux/actions';

import SnackbarComponent from './share/snackbar/Snackbar';

import { handleSnackbarCloseService } from './services/snackbar';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

import './App.scss';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        secondary: deepOrange,
        type: 'dark'
    }
});

const App = (props: any) => {
    const { isSnackbarOpen, snackbarType, snackbarMessage } = props;

    useEffect(() => {
        props.onTryAutoLogin();
    }, [props]);
    return (
        <ThemeProvider theme={theme}>
            <Routers />
            <SnackbarComponent
                message={snackbarMessage}
                type={snackbarType}
                isOpen={isSnackbarOpen}
                handleSnackbarClose={handleSnackbarCloseService}
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state: any) => ({
    isSnackbarOpen: state.snackbar.isSnackbarOpen,
    snackbarType: state.snackbar.snackbarType,
    snackbarMessage: state.snackbar.message
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onTryAutoLogin: () => dispatch(checkState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
