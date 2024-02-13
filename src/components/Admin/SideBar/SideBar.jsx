// import '../../../assets/Admin/css/style.min.css';
import './Style.css';

import img from '../../../assets/Admin/img/avatar/avatar-illustrated-01.png'
import img2 from '../../../assets/img/king.png'

import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated} from "../../../store/authSlice"; // Menambahkan import setUserData
import Swal from 'sweetalert2';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';


function SideBar() {

    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
    const username = useSelector((state) => state.authentication.username);
    const role = useSelector((state) => state.authentication.role);
  
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hapus deklarasi navigate yang kedua
  
    const handleLogout = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
        }).then((result) => {
          if (result.isConfirmed) {
            // Hapus data dari localStorage
            localStorage.removeItem('userLogin');
            localStorage.removeItem('isLoggedIn');
    
            localStorage.removeItem('customerData');
            localStorage.removeItem('isLoggedIn');
    
            dispatch(setAuthenticated(false));
            Swal.fire({
              icon: 'success',
              title: 'Logout Successful!',
              text: 'You have been logged out.',
              showConfirmButton: true,
              timer: 2000
            }).then(() => {
              navigate("/login"); 
            });
          }
        });
      };

    return (
        <aside className="sidebar">
            <div className="sidebar-start">
                <div className="sidebar-head">
                    <NavLink to="/" className="logo-wrapper" title="Home">
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
                    </NavLink>
                    <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
                        <span className="sr-only">Toggle menu</span>
                        <span className="icon menu-toggle" aria-hidden="true"></span>
                    </button>
                </div> 
                <div className="sidebar-body">
                    <span className="system-menu__title">Manage Data</span>
                    <ul className="sidebar-body-menu">
                        <li>
                            <NavLink to="/dashboard"><span className="icon"><i className="fas fa-home"></i></span>Dashboard</NavLink>
                        </li>
                    </ul>
                    <span className="system-menu__title">Manage Data Users</span>
                    <ul className="sidebar-body-menu">
                        <li>
                            <NavLink to="/customer"><span className="icon"><i className="fas fa-users"></i></span>Customer</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dataSeller"><span className="icon"><i className="fas fa-user"></i></span>Seller</NavLink>
                        </li>
                    </ul>
                    <span className="system-menu__title">Manage Data Kosan</span>
                    <ul className="sidebar-body-menu">
                        <li>
                            <NavLink to="/datakosan"><span className="icon"><i className="fas fa-building"></i></span>Kosan</NavLink>
                        </li>
                        <li>
                            <NavLink to="/manage-order"><span className="icon"><i className="fas fa-shopping-cart"></i></span>Order</NavLink>
                        </li>
                    </ul>
                    <span className="system-menu__title">Manage Data Testimonial</span>
                    <ul className="sidebar-body-menu">
                        <li>
                            <NavLink to="/testimoni"><span className="icon"><i className="fas fa-comment"></i></span>Testimoni</NavLink>
                        </li>
                        <li>
                            <NavLink to="/manage-order"><span className="icon"><i className="fas fa-shopping-cart"></i></span>Order</NavLink>
                        </li>
                    </ul>
                    <span className="system-menu__title">System</span>
                    <ul className="sidebar-body-menu">
                        <li>
                            <NavLink to="/ss"><span className="icon"><i className="fas fa-cog"></i></span>Settings</NavLink>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="sidebar-footer">
                {isAuthenticated ? (
                    <Link to="##" className="sidebar-user">
                        <span className="sidebar-user-img">
                            <picture>
                                <img src={img} alt="User name" />
                            </picture>
                        </span>
                        <div className="sidebar-user-info">
                            <span className="sidebar-user__title">{username}</span>
                            <span className="sidebar-user__subtitle">{role}</span>
                        </div>
                    </Link>
                ) : (
                    // Jika tidak terautentikasi, Anda bisa menambahkan tindakan alternatif di sini
                    <span>Anda tidak terautentikasi</span>
                )}
            </div>
        </aside>
    );
}

export default SideBar;
