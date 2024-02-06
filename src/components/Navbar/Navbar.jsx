import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/img/king.png';

function Navbar() {
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
                            <Link className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" to="/twitter"><i className="fab fa-twitter fw-normal"></i></Link>
                            <Link className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" to="/facebook"><i className="fab fa-facebook-f fw-normal"></i></Link>
                            <Link className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" to="/linkedin"><i className="fab fa-linkedin-in fw-normal"></i></Link>
                            <Link className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" to="/instagram"><i className="fab fa-instagram fw-normal"></i></Link>
                            <Link className="btn btn-sm btn-outline-light btn-sm-square rounded-circle" to="/youtube"><i className="fab fa-youtube fw-normal"></i></Link>
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
                        <Link to="/login" className="btn rounded-pill py-2 px-4" style={{backgroundColor: '#FFD700', color: 'black'}}>Login</Link>
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
