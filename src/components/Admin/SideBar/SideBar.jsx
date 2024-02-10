import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/Admin/css/style.min.css';
import './Style.css';
import img from '../../../assets/Admin/img/avatar/avatar-illustrated-01.png'
import img2 from '../../../assets/img/king.png'

function SideBar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-start">
            <div className="sidebar-head">
            <Link to="/" className="logo-wrapper" title="Home">
                <span className="sr-only">Home</span>
                <img
                    src={img2}
                    alt=""
                    style={{ width: '49px', height: 'auto' }} 
                />
                <div className="logo-text ms-3">
                    <span className="logo-title">Kingkos</span>
                    <span className="logo-subtitle" style={{color: 'gold'}}>Dashboard</span>
                </div>
            </Link>
            <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
                <span className="sr-only">Toggle menu</span>
                <span className="icon menu-toggle" aria-hidden="true"></span>
            </button>
        </div>
                <div className="sidebar-body">
                    <ul className="sidebar-body-menu">
                        <li>
                            <Link className="active" to="/"><span className="icon home" aria-hidden="true"></span>Dashboard</Link>
                        </li>
                        <li>
                            <Link className="show-cat-btn" to="#">
                                <span className="icon user-3" aria-hidden="true"></span>All Users
                                <span className="category__btn transparent-btn" title="Open list">
                                    <span className="sr-only">Open list</span>
                                    <span className="icon arrow-down" aria-hidden="true"></span>
                                </span>
                            </Link>
                            <ul className="cat-sub-menu">
                                <li>
                                    <Link to="/customer">Customer</Link>
                                </li>
                                <li>
                                    <Link to="/seller">Seller</Link>
                                </li>
                                <li>
                                    <Link to="/admin">Admin</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link className="show-cat-btn" to="#">
                                <span className="icon folder" aria-hidden="true"></span>Categories
                                <span className="category__btn transparent-btn" title="Open list">
                                    <span className="sr-only">Open list</span>
                                    <span className="icon arrow-down" aria-hidden="true"></span>
                                </span>
                            </Link>
                            <ul className="cat-sub-menu">
                                <li>
                                    <Link to="categories.html">All categories</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link className="show-cat-btn" to="#">
                                <span className="icon image" aria-hidden="true"></span>Media
                                <span className="category__btn transparent-btn" title="Open list">
                                    <span className="sr-only">Open list</span>
                                    <span className="icon arrow-down" aria-hidden="true"></span>
                                </span>
                            </Link>
                            <ul className="cat-sub-menu">
                                <li>
                                    <Link to="media-01.html">Media-01</Link>
                                </li>
                                <li>
                                    <Link to="media-02.html">Media-02</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link className="show-cat-btn" to="#">
                                <span className="icon paper" aria-hidden="true"></span>Pages
                                <span className="category__btn transparent-btn" title="Open list">
                                    <span className="sr-only">Open list</span>
                                    <span className="icon arrow-down" aria-hidden="true"></span>
                                </span>
                            </Link>
                            <ul className="cat-sub-menu">
                                <li>
                                    <Link to="pages.html">All pages</Link>
                                </li>
                                <li>
                                    <Link to="new-page.html">Add new page</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="comments.html">
                                <span className="icon message" aria-hidden="true"></span>
                                Comments
                            </Link>
                            <span className="msg-counter">7</span>
                        </li>
                    </ul>
                    <span className="system-menu__title">system</span>
                    <ul className="sidebar-body-menu">
                        <li>
                            <Link to="appearance.html"><span className="icon edit" aria-hidden="true"></span>Appearance</Link>
                        </li>
                        <li>
                            <Link className="show-cat-btn" to="#">
                                <span className="icon category" aria-hidden="true"></span>Extentions
                                <span className="category__btn transparent-btn" title="Open list">
                                    <span className="sr-only">Open list</span>
                                    <span className="icon arrow-down" aria-hidden="true"></span>
                                </span>
                            </Link>
                            <ul className="cat-sub-menu">
                                <li>
                                    <Link to="extention-01.html">Extentions-01</Link>
                                </li>
                                <li>
                                    <Link to="extention-02.html">Extentions-02</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link className="show-cat-btn" to="#">
                                <span className="icon user-3" aria-hidden="true"></span>Users
                                <span className="category__btn transparent-btn" title="Open list">
                                    <span className="sr-only">Open list</span>
                                    <span className="icon arrow-down" aria-hidden="true"></span>
                                </span>
                            </Link>
                            <ul className="cat-sub-menu">
                                <li>
                                    <Link to="users-01.html">Users-01</Link>
                                </li>
                                <li>
                                    <Link to="users-02.html">Users-02</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#"><span className="icon setting" aria-hidden="true"></span>Settings</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-footer">
                <Link to="##" className="sidebar-user">
                    <span className="sidebar-user-img">
                        <picture>
                            <img src={img} alt="User name" />
                        </picture>
                    </span>
                    <div className="sidebar-user-info">
                        <span className="sidebar-user__title">Joo Admin</span>
                        <span className="sidebar-user__subtitle">Admin</span>
                    </div>
                </Link>
            </div>
        </aside>
    );
}

export default SideBar;
