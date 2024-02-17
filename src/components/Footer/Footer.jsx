import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/img/kosan1.jpg'
import img2 from '../../assets/img/kosan2.jpg'
import img3 from '../../assets/img/kosan3.jpg'

import logogplay from '../../assets/img/get-it-on-playstore.svg'
import logoapp from '../../assets/img/get-it-on-appstore.svg'
import logo from '../../assets/img/king.png';
import { Button } from 'bootstrap';

function Footer() {
    return (
        <div className="container-fluid footer pt-5 mt-5 wow fadeIn">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <p className="mb-4" style={{ color: 'orange', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="KingKos Logo" className="logo-image" style={{ marginRight: '1rem', height: '30px' }} />
                            KingKos
                        </p>
                        <p className="mb-2">Dapatkan "info kost murah" hanya di Kingkos App. Mau "Sewa Kost Murah"? </p>
                        <Link className="btn btn-link text-black" to="/about">About Us</Link>
                        <Link className="btn btn-link text-black" to="/contact">Contact Us</Link>
                        <Link className="btn btn-link text-black" to="/testimonial">Testimonial</Link>
                        <Link className="btn btn-link text-black" to="/TermsAndConditions">Terms & Condition</Link>
                        <Link className="btn btn-link text-black" to="/team">Our Team</Link>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="mb-3">Contact</h4>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Jalan H Dahlan, Ragunan Pasar Minggu Jakarta</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@kingkosan.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="mb-3">Gallery</h4>
                        <div className="row g-2 pt-2">
                            <div className="col-4">
                                <img className="img-fluid bg-light p-1" src={img1} alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid bg-light p-1" src={img2} alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid bg-light p-1" src={img3} alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid bg-light p-1" src={img1} alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid bg-light p-1" src={img2} alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid bg-light p-1" src={img3} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 ps-5">
                        <h4 className="mb-3">Newsletter</h4>
                        <p>Stay updated with our latest offers and news. Sign up for our newsletter!</p>
                        <div className="mx-auto" >
                            <Link to="/register/customer" type="button" className="btn btn-primary mt-2 me-2" style={{padding: '2px 10px 2px 10px ', borderRadius: '15px'}}>Sign Up</Link>
                        </div>
                        <div style={{ marginTop: '20px', padding: '10px 0' }}>
                            <img src={logogplay} alt="Google Play" style={{ marginRight: '10px' }} />
                            <img src={logoapp} alt="App Store" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <Link to="#" className="border-bottom text-black">King Kosan</Link>, All Right Reserved.
                            Designed By <Link to="/" className="border-bottom text-black">Kelompok 2 Pascal || Enigmacamp</Link>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <Link to="/" className="text-black">Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
