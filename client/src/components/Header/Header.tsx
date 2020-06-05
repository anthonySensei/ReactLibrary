import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import './Header.scss';
import { Link } from 'react-router-dom';
import { ClientLinks } from '../../constants/clientLinks';

const Header = (props: any) => {
    return (
        <AppBar position="static">
            <Toolbar className="navbar main-navbar">
                <div className="header-block">
                    <Typography variant="h6">
                        <Link
                            to={ClientLinks.HOME_PAGE}
                            className="navbar-link"
                        >
                            Books
                        </Link>
                    </Typography>
                </div>
                <div className="header-block">
                    {!props.isLoggedIn ? (
                        <Typography variant="h6">
                            <Link
                                to={ClientLinks.LOGIN}
                                className="navbar-link link-right"
                            >
                                Login
                            </Link>
                        </Typography>
                    ) : (
                        <Typography variant="h6">
                            <Link
                                to={ClientLinks.LOGOUT}
                                className="navbar-link link-right"
                            >
                                Logout
                            </Link>
                        </Typography>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
