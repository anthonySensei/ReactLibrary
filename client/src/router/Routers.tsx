import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { ClientLinks } from '../constants/ClientLinks';
import { UserRoles } from '../constants/UserRoles';

import Header from '../components/Header/Header';
import Logout from '../components/Auth/Logout/Logout';
import LoadingPage from '../components/LoadingPage/LoadingPage';

import Managing from '../containers/Managing/Managing';

import RouterProps from './RouterProps';

import history from '../helper/history';

const Home = lazy(() => import('../containers/Home/Home'));
const Statistic = lazy(() => import('../containers/Statistic/Statistic'));
const Auth = lazy(() => import('../containers/Auth/Auth'));
const AddBook = lazy(() => import('../containers/AddBook/AddBook'));
const BookDetails = lazy(() => import('../containers/BookDetails/BookDetails'));
const ActivationPage = lazy(() =>
    import('../containers/ActivationPage/ActivationPage')
);

const Routers = (props: RouterProps) => {
    return (
        <>
            <Router history={history}>
                <Header {...props} />
                <Suspense fallback={<LoadingPage />}>
                    <Switch>
                        <Route
                            path={ClientLinks.HOME_PAGE}
                            exact
                            component={Home}
                        />
                        <Route
                            path={ClientLinks.BOOK_DETAILS}
                            component={BookDetails}
                        />
                        <Route path={ClientLinks.LOGIN} component={Auth} />
                        <Route
                            path={ClientLinks.ACTIVATION_PAGE}
                            component={ActivationPage}
                        />
                        <Route
                            path={ClientLinks.STATISTIC_PAGE}
                            component={Statistic}
                        />
                        {props.isLoggedIn && (
                            <Route
                                path={ClientLinks.LOGOUT}
                                component={Logout}
                            />
                        )}
                        {props.userRole === UserRoles.MANAGER && (
                            <Route
                                path={ClientLinks.MANAGING_PAGE}
                                component={Managing}
                            />
                        )}
                        {(props.userRole === UserRoles.MANAGER ||
                            props.userRole === UserRoles.LIBRARIAN) && (
                            <Route
                                path={ClientLinks.ADD_BOOK_PAGE}
                                component={AddBook}
                            />
                        )}
                    </Switch>
                </Suspense>
            </Router>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    isLoggedIn: !!state.auth.user,
    userRole: state.auth.user?.role
});

export default connect(mapStateToProps)(Routers);
