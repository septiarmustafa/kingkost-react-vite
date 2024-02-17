import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Logo1 from '../../assets/img/logo_king.png';

function ForgotPasswordCustomer() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async () => {
        try {

            const response = await axios.post('http://localhost:8080/reset/request-customer', {
                email: email
            });

            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError('Failed to send reset password request.');
            setMessage('');
            console.error('Error sending reset password request:', error);
        }
    };

    const validateEmail = (email) => {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());

    };

    return (
        <>
            <section className="nav"
                     style={{background: 'linear-gradient(to bottom, #a36903, #873f00)', padding: '4em'}}>
                <div className="container" style={{padding: '2em'}}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-12">
                            <div className="card" style={{borderRadius: '2rem'}}>
                                <div className="row container-fluid">
                                    <div className="col-md-6 col-lg-6 d-none d-md-block py-5 px-5">
                                        <img src={Logo1} alt="login form" className="img-fluid"
                                             style={{borderRadius: '1rem 0 0 1rem', paddingTop: '5em'}}/>
                                    </div>
                                    <div className="col-md-6 col-lg-6 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <div className="container mt-5">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-12">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <Link to="/login" className="btn btn-outline-primary"
                                                                      style={{borderRadius: '10px'}}>
                                                                    <i className="fas fa-arrow-left"> Back </i>
                                                                </Link>
                                                                <h2 className="m-2">Forgot Password</h2>
                                                                {message && <div
                                                                    className="alert alert-success">{message}</div>}
                                                                {error &&
                                                                    <div className="alert alert-danger">{error}</div>}
                                                                <form>
                                                                    <div className="mb-3">
                                                                        <label htmlFor="email" className="form-label">Email
                                                                            address</label>
                                                                        <input
                                                                            type="email"
                                                                            className="form-control"
                                                                            id="email"
                                                                            value={email}
                                                                            onChange={(e) => {
                                                                                setEmail(e.target.value)
                                                                                if (!validateEmail(e.target.value)) {
                                                                                    setError('Please enter a valid email address.');
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        onClick={handleForgotPassword}
                                                                        disabled={!email || !validateEmail(email)}
                                                                    >
                                                                        Send Reset Link
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgotPasswordCustomer;
