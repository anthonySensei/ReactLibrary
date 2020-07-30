import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import { ClientLinks } from '../../constants/ClientLinks';
import { UserRoles } from '../../constants/UserRoles';

import RouterProps from '../../interfaces/props/RouterProps';

import './Header.scss';

const Header = (props: RouterProps) => {
    return (
        <nav className="navbar">
            <div className="header-block">
                <NavLink exact={true} activeClassName='active' to={ClientLinks.HOME_PAGE} className="navbar-link">
                    Books
                </NavLink>
                {props.userRole === UserRoles.MANAGER && (
                    <NavLink
                        to={ClientLinks.MANAGING_PAGE}
                        className="navbar-link"
                    >
                        Managing
                    </NavLink>
                )}
            </div>
            <div className="header-block">
                {!props.isLoggedIn ? (
                    <NavLink
                        to={ClientLinks.LOGIN}
                        className="navbar-link"
                    >
                        Login
                    </NavLink>
                ) : (
                    <NavLink
                        to={ClientLinks.LOGOUT}
                        className="navbar-link"
                    >
                        Logout
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Header;
