import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { ClientLinks } from '../constants/ClientLinks';

import Auth from '../containers/Auth/Auth';
import Home from "../containers/Home/Home";

import Header from '../components/Header/Header';
import Logout from "../components/Auth/Logout/Logout";

const Routers = (props: any) => {
    return (
        <Router>
            <Header {...props} />
            <Switch>
                <Route path={ClientLinks.HOME_PAGE} exact component={Home} />
                <Route path={ClientLinks.LOGIN} component={Auth} />
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
