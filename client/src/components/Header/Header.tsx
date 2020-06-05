import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import './Header.scss';
import { Link } from 'react-router-dom';
import { ClientLinks } from '../../constants/clientLinks';

const Header = (props: any) => {
    return (
        <AppBar position="static" className="navbar main-navbar">
            <Toolbar>
                {!props.isLoggedIn ? (
                    <Typography variant="h6">
                        <Link to={ClientLinks.LOGIN} className="navbar-link">
                            Login
                        </Link>
                    </Typography>
                ) : (
                    ''
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
