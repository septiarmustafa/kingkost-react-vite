import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/king.png';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated } from "../../store/authSlice.js";
import Swal from 'sweetalert2'; 
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import img1 from "../../assets/img/team-1.jpg";

const clientId = "574506119134-iobilhshvcia2ums2k0h0bp9kaoetcma.apps.googleusercontent.com";

function Navbar() {

    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
    const username = useSelector((state) => state.authentication.username);
    const role = useSelector((state) => state.authentication.role);
  
    console.log('isAuthenticated:', isAuthenticated);
    console.log('username:', username);
    console.log('role:', role);
  
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

    const [userData, setUserData] = useState(null);

    const onSuccess = (res) => {
        setUserData(res.profileObj);
    };

    const onFailure = (res) => {
        console.log("Login Failed, Res : " + res);
    };

    const onLogoutSuccess = (res) => {
        console.log("Successfully loggout ");
        navigate('/login'); 
    }

    return (
        <>
            <div className="container-fluid bg-dark px-5 d-none d-lg-block">
                <div className="row gx-0">
                    <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
                            <small className="me-3 text-light"><i className="fa fa-map-marker-alt me-2"></i>Kosan, Ragunan City</small>
                            <small className="me-3 text-light"><i className="fa fa-phone-alt me-2"></i>+012 345 6789</small>
                            <small className="text-light"><i className="fa fa-envelope-open me-2"></i>info@kingkos.com</small>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
                            {userData ? (
                                <div className="dropdown">
                                    <button className="btn btn-outline-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={img1} alt="Profile" className="me-2 rounded-circle" style={{ width: '30px', height: '30px' }} />
                                        {userData.name}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><span className="dropdown-item-text">Email: {userData.email}</span></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><NavLink to="/profile" className="dropdown-item" activeClassName="active">Profile</NavLink></li>
                                        <li><NavLink to="/mykosan" className="dropdown-item" activeClassName="active">My Kosan</NavLink></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className='ms-3'>
                                            <div id="signInButton">
                                                <GoogleLogout 
                                                    clientId={clientId}
                                                    buttonText="Logout"
                                                    onLogoutSuccess={onLogoutSuccess}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <GoogleLogin 
                                    clientId={clientId}
                                    buttonText="Login"
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                    className="google-login-button" // Menambahkan kelas CSS di sini
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid position-relative p-0">
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <Link to="/" className="navbar-brand p-0">
                        <p className="m-0" style={{ color: '#cfb000', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="KingKos Logo" className="logo-image" style={{ marginRight: '1rem', height: '30px' }} />
                            KingKos
                        </p>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <NavLink to="/" className="nav-item nav-link" activeClassName="active">Home</NavLink>
                            <div className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Cari Apa? </Link>
                                <div className="dropdown-menu m-0">
                                    <Link to="/kosan" className="dropdown-item" activeClassName="active">Kosan</Link>
                                    <Link to="/booking" className="dropdown-item" activeClassName="active">Booking</Link>
                                    <Link to="/testimonial" className="dropdown-item" activeClassName="active">Testimonial</Link>
                                </div>
                            </div>
                            <NavLink to="/about" className="nav-item nav-link" activeClassName="active">About</NavLink>
                            <NavLink to="/team" className="nav-item nav-link" activeClassName="active">Team</NavLink>
                            <NavLink to="/contact" className="nav-item nav-link" activeClassName="active">Contact</NavLink>
                            <NavLink to="/TermsAndConditions" className="nav-item nav-link" activeClassName="active">Terms And Conditions</NavLink>
                        </div>
                        {isAuthenticated ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" style={{borderRadius: '5px'}} id="dropdown-basic" className="text-black fw-bold">
                                    <img src={img1} alt="User" style={{ width: '30px', height: '30px', marginRight: '8px', borderRadius: '50%' }} />
                                    {username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item  className="text-black">{role}</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item  className="text-black">
                                        <NavLink to="/profile" className="dropdown-item" activeClassName="active">Profile</NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item  className="text-black">
                                        <NavLink to="/mykosan" className="dropdown-item" activeClassName="active">My Kosan</NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout} className="white text-white">
                                        <Button variant="danger" className="w-100" style={{borderRadius: '15px',}}>
                                            Logout
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <button className="btn btn-warning mt1" style={{ borderRadius: '10px', color: 'black', fontWeight: 'bold' }} type="submit">
                                    LOGIN
                                </button>
                            </Link>
                        )}
                    </div>
                </nav>

                <div className="container-fluid py-4 mb-5 hero-header">
                    <div className="container">
                        <div className="row justify-content-center py-5">
                            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                                <h1 className="display-3 text-white mb-4 animated slideInDown">Mau Cari Kos ?</h1>
                                <h3 className=" text-white mb-3 animated slideInDown">Find Your Ideal Kosan</h3>
                                <p className="fs-4 text-white mb-4 animated slideInDown">Discover comfortable and affordable kosan options tailored for you.</p>
                                <div className="position-relative w-75 mx-auto animated slideInDown">
                                    <input className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Enter Location or Keyword" />
                                    <button type="button" className="btn btn-warning rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ marginTop: '7px' }}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
