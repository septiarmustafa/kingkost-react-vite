import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/Admin/img/avatar/avatar-illustrated-02.png';

function NavbarAdmin() {
    return (
        <>
        <div class="layer"></div>
        <nav className="main-nav--bg">
            <div className="container main-nav">
                <div className="main-nav-start">
                    <div className="search-wrapper">
                        <i data-feather="search" aria-hidden="true"></i>
                        <input type="text" placeholder="Enter keywords ..." required />
                    </div>
                </div>
                <div className="main-nav-end">
                    <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
                        <span className="sr-only">Toggle menu</span>
                        <span className="icon menu-toggle--gray" aria-hidden="true"></span>
                    </button>
                    <div className="lang-switcher-wrapper">
                        <button className="lang-switcher transparent-btn" type="button">
                            EN
                            <i data-feather="chevron-down" aria-hidden="true"></i>
                        </button>
                        <ul className="lang-menu dropdown">
                            <li><Link to="/">English</Link></li>
                            <li><Link to="/">French</Link></li>
                            <li><Link to="/">Uzbek</Link></li>
                        </ul>
                    </div>
                    <button className="theme-switcher gray-circle-btn" type="button" title="Switch theme">
                        <span className="sr-only">Switch theme</span>
                        <i className="sun-icon" data-feather="sun" aria-hidden="true"></i>
                        <i className="moon-icon" data-feather="moon" aria-hidden="true"></i>
                    </button>
                    <div className="notification-wrapper">
                        <button className="gray-circle-btn dropdown-btn" title="To messages" type="button">
                            <span className="sr-only">To messages</span>
                            <span className="icon notification active" aria-hidden="true"></span>
                        </button>
                        <ul className="users-item-dropdown notification-dropdown dropdown">
                            <li>
                                <Link to="/">
                                    <div className="notification-dropdown-icon info">
                                        <i data-feather="check"></i>
                                    </div>
                                    <div className="notification-dropdown-text">
                                        <span className="notification-dropdown__title">System just updated</span>
                                        <span className="notification-dropdown__subtitle">The system has been successfully upgraded. Read more
                                            here.</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <div className="notification-dropdown-icon danger">
                                        <i data-feather="info" aria-hidden="true"></i>
                                    </div>
                                    <div className="notification-dropdown-text">
                                        <span className="notification-dropdown__title">The cache is full!</span>
                                        <span className="notification-dropdown__subtitle">Unnecessary caches take up a lot of memory space and
                                            interfere ...</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <div className="notification-dropdown-icon info">
                                        <i data-feather="check" aria-hidden="true"></i>
                                    </div>
                                    <div className="notification-dropdown-text">
                                        <span className="notification-dropdown__title">New Subscriber here!</span>
                                        <span className="notification-dropdown__subtitle">A new subscriber has subscribed.</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className="link-to-page" to="/">Go to Notifications page</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-user-wrapper">
                        <button href="##" className="nav-user-btn dropdown-btn" title="My profile" type="button">
                            <span className="sr-only">My profile</span>
                            <span className="nav-user-img">
                                <picture>
                                    <img src={img} alt="User name" />
                                </picture>
                            </span>
                        </button>
                        <ul className="users-item-dropdown nav-user-dropdown dropdown">
                            <li>
                                <Link to="/">
                                    <i data-feather="user" aria-hidden="true"></i>
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i data-feather="settings" aria-hidden="true"></i>
                                    <span>Account settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="danger" to="/">
                                    <i data-feather="log-out" aria-hidden="true"></i>
                                    <span>Log out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
}

export default NavbarAdmin;
