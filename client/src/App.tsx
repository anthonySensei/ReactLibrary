import React, {useEffect} from 'react';
import './App.scss';

import Routers from './router/Routers';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {checkState} from './redux/actions';

import SnackbarComponent from './share/snackbar/Snackbar';

import {handleSnackbarCloseService} from './services/snackbar';

import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import {blue, lightBlue} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: lightBlue
    }
});

const App = (props: any) => {
    const { isSnackbarOpen, snackbarType, snackbarMessage } = props;
    const handleSnackbarClose = () => {
        handleSnackbarCloseService();
    };

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
                handleSnackbarClose={handleSnackbarClose}
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
