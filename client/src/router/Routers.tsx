import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from '../containers/Auth/Auth';
import { ClientLinks } from '../constants/clientLinks';
import Header from '../components/Header/Header';
import { connect } from 'react-redux';

const Routers = (props: any) => {
    return (
        <Router>
            <Header {...props} />
            <Switch>
                <Route path={ClientLinks.LOGIN} component={Auth} />
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state: any) => ({
    isLoggedIn: !!state.auth.user
});

export default connect(mapStateToProps)(Routers);
