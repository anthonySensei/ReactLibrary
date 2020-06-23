import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { ClientLinks } from '../constants/ClientLinks';

import Auth from '../containers/Auth/Auth';
import Home from '../containers/Home/Home';
import BookDetails from '../containers/BookDetails/BookDetails';
import ActivationPage from '../containers/ActivationPage/ActivationPage';

import Header from '../components/Header/Header';
import Logout from '../components/Auth/Logout/Logout';

interface RoutersProps {
    isLoggedIn: boolean;
}

const Routers = (props: RoutersProps) => {
    return (
        <Router>
            <Header {...props} />
            <Switch>
                <Route path={ClientLinks.HOME_PAGE} exact component={Home} />
                <Route
                    path={ClientLinks.BOOK_DETAILS}
                    component={BookDetails}
                />
                <Route path={ClientLinks.LOGIN} component={Auth} />
                <Route
                    path={ClientLinks.ACTIVATION_PAGE}
                    component={ActivationPage}
                />
                {props.isLoggedIn ? (
                    <Route path={ClientLinks.LOGOUT} component={Logout} />
                ) : (
                    ''
                )}
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state: any) => ({
    isLoggedIn: !!state.auth.user
});

export default connect(mapStateToProps)(Routers);
