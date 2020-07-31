import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ClientLinks } from '../../constants/ClientLinks';
import { UserRoles } from '../../constants/UserRoles';

import RouterProps from '../../interfaces/props/RouterProps';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import './Header.scss';

const Header = (props: RouterProps) => {
    const [isToggled, setIsToggled] = useState(false);
    const handleToggle = () => {
        const items = Array.from(document.getElementsByClassName('menu__item'));
        if (items[0].classList.contains('visible')) {
            items.forEach(item => {
                item.classList.remove('visible');
            });
            setIsToggled(false);
        } else {
            items.forEach(item => {
                item.classList.add('visible');
            });
            setIsToggled(true);
        }
    };

    return (
        <nav className="menu">
            <Link
                to={ClientLinks.HOME_PAGE}
                className="menu__logo"
                onClick={handleToggle}
            >
                Library
            </Link>
            <NavLink
                exact={true}
                activeClassName="active"
                to={ClientLinks.HOME_PAGE}
                className="menu__item"
                onClick={handleToggle}
            >
                Home
            </NavLink>
            {props.userRole === UserRoles.MANAGER && (
                <NavLink
                    to={ClientLinks.MANAGING_PAGE}
                    className="menu__item"
                    onClick={handleToggle}
                >
                    Managing
                </NavLink>
            )}
            {!props.isLoggedIn ? (
                <NavLink
                    to={ClientLinks.LOGIN}
                    className="menu__item"
                    onClick={handleToggle}
                >
                    Login
                </NavLink>
            ) : (
                <NavLink
                    to={ClientLinks.LOGOUT}
                    className="menu__item"
                    onClick={handleToggle}
                >
                    Logout
                </NavLink>
            )}
            {isToggled ? (
                <span className="menu__toggle" onClick={handleToggle}>
                    <CloseIcon color="secondary" />
                </span>
            ) : (
                <span className="menu__toggle" onClick={handleToggle}>
                    <MenuIcon color="secondary" />
                </span>
            )}
        </nav>
    );
};

export default Header;
