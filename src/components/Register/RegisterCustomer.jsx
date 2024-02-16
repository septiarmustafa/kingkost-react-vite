import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eye from '../../assets/img/eye.svg';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaGenderless, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../../store/axiosInterceptor';
import Swal from 'sweetalert2';

import logo from '../../assets/img/login-tenant.svg';

function RegisterCustomer() {

    const navigate = useNavigate();

    const [newCustomer, setNewCustomer] = useState({
        fullName: "",
        genderTypeId: "",
        email: "",
        address: "",
        phoneNumber: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        genderTypeId: "",
        email: "",
        address: "",
        phoneNumber: "",
        username: "",
        password: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(false); // State to track if the password matches the requirements
    const [passwordIndicator, setPasswordIndicator] = useState(""); // State to control the password indicator message

    const [emailMatch, setEmailMatch] = useState(false);
    const [emailIndicator, setEmailIndicator] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [genderTypes, setGenderTypes] = useState([]);
  
    useEffect(() => {
        // Fetch gender types from API
        axios.get('http://localhost:8080/gender/v1')
            .then(response => {
                setGenderTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching gender types:', error);
            });
    }, []);

    const handleShowPass = () => {
        let input = document.getElementById("setPassword");
        if (input.type === "password") input.type = "text";
        else input.type = "password";
    };

    const handleChangeEmail = (e) => {
        const newEmail = e.target.value;
        setNewCustomer({ ...newCustomer, email: newEmail });

        if (validateEmail(newEmail)) {
            setEmailMatch(true);
            setEmailIndicator("Email is valid");
        } else {
            setEmailMatch(false);
            setEmailIndicator("Email must be an format @gmail.com");
        }
    };

    const validatePassword = (password) => {
        return /(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,}/.test(password);
    }

    const validateEmail = (email) => {
        return /^\S+@\S+\.\S+$/.test(email);
    }

    const validatePhoneNumber = (phoneNumber) => {
        return /^\d+$/.test(phoneNumber);
    }

    const handleChangePassword = (e) => {
        const newPassword = e.target.value;
        setNewCustomer({ ...newCustomer, password: newPassword });

        // Check if the password matches the requirements
        if (validatePassword(newPassword)) {
            setPasswordMatch(true);
            setPasswordIndicator("Password is valid");
        } else {
            setPasswordMatch(false);
            setPasswordIndicator("Password must contain at least 8 characters, including at least one number, one letter, and one symbol");
        }
    };

    const validateForm = () => {
        const validationErrors = {
            fullName: newCustomer.fullName.trim() === "" ? "Full Name is required" : "",
            genderTypeId: newCustomer.genderTypeId === "" ? "Gender is required" : "",
            email: !validateEmail(newCustomer.email) ? "Please enter a valid email address" : "",
            address: newCustomer.address.trim() === "" ? "Address is required" : "",
            phoneNumber: !validatePhoneNumber(newCustomer.phoneNumber) ? "Phone number must contain only numbers" : "",
            username: newCustomer.username.trim() === "" ? "Username is required" : "",
            password: newCustomer.password.trim() === "" ? "Password is required" : "",
        };

        // Validate username does not contain spaces
        if (newCustomer.username.includes(" ")) {
            validationErrors.username = "Username cannot contain spaces";
        }

        setErrors(validationErrors);

        // Check if all fields are valid
        const isFormValid = Object.values(validationErrors).every(error => error === "");

        return isFormValid;
    };

    const handleAddCustomer = (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        axios.post(`/api/auth/register/customer`, newCustomer)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Your registration customer was successful!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/login");
                });
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'An error occurred during registration. Please try again later.',
                    confirmButtonText: 'OK'
                });
            });
    };


    return (
        <div>
            <section className="h-100 container-fluid" style={{ background: 'linear-gradient(to bottom, #a36903, #873f00)' }}>
                <div className="container-fluid h-100" style={{ padding: "2em" }}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className='w-20 '>
                                            <Link to="/register" className="btn btn-outline-secondary" style={{borderRadius: '10px'}}>
                                                <i className="fas fa-arrow-left"></i>
                                            </Link>
                                        </div>
                                     
                                        <div className="col-md-10 col-lg-6 col-xl-7 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontFamily: 'initial'}}>
                                                Customer Registration
                                            </p>
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center ms-5">
                                                    <div className="form-outline flex-fill mt-2">
                                                        <label htmlFor="fullName" className="form-label">
                                                            <FaUser className="me-2" />
                                                            Full Name:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            onChange={e => setNewCustomer({ ...newCustomer, fullName: e.target.value })}
                                                        />
                                                        <div className="text-danger">{errors.fullName}</div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center ms-5">
                                                    <div className="form-outline flex-fill mt-4">
                                                        <label htmlFor="genderTypeId" className="form-label">
                                                            <FaGenderless className="me-2" />
                                                            Gender:
                                                        </label>
                                                        <select
                                                            style={{borderColor: 'black'}}
                                                            id="form3Example1c"
                                                            className="form-select"
                                                            onChange={e => setNewCustomer({ ...newCustomer, genderTypeId: e.target.value })}
                                                        >
                                                            <option value="" disabled selected>Select gender</option>
                                                            {genderTypes.map(gender => (
                                                                <option key={gender.id} value={gender.id}>{gender.name}</option>
                                                            ))}
                                                        </select>
                                                        <div className="text-danger">{errors.genderTypeId}</div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center ms-5">
                                                    <div className="form-outline flex-fill mt-4">
                                                        <label htmlFor="password" className="form-label">
                                                            <FaLock className="me-2" />
                                                            Password:
                                                        </label>
                                                        <div className="input-group">
                                                            <input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handleChangePassword}  className="form-control" />
                                                            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                            </span>
                                                        </div>
                                                        <div className={passwordMatch ? "text-success" : "text-danger"}>{passwordIndicator}</div>
                                                        <div className="text-danger">{errors.password}</div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center ms-5">
                                                    <div className="form-outline flex-fill mb-0 mt-4">
                                                        <label htmlFor="username" className="form-label">
                                                            <FaUser className="me-2" />
                                                            Username:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            onChange={e => setNewCustomer({ ...newCustomer, username: e.target.value })}
                                                        />
                                                        <div className="text-danger">{errors.username}</div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center ms-5">
                                                    <div className="form-outline flex-fill mb-0 mt-4">
                                                        <label htmlFor="address" className="form-label">
                                                            <FaMapMarkerAlt className="me-2" />
                                                            Address:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                                                        />
                                                        <div className="text-danger">{errors.address}</div>
                                                    </div>
                                                </div>

                                               <div className="d-flex flex-row align-items-center ms-5">
                                                    <div className="form-outline flex-fill mb-0 mt-4">
                                                    <label htmlFor="phoneNumber" className="form-label">
                                                        <FaPhone className="me-2" />
                                                        Phone Number
                                                        </label>
                                                    <input
                                                        type="text"
                                                        id="phoneNumber"
                                                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                                        value={newCustomer.phoneNumber}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/, ''); // Hanya menerima digit/angka
                                                            setNewCustomer({ ...newCustomer, phoneNumber: value });
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center ms-5">
                                                    <div className="form-outline flex-fill mb-0 mt-4">
                                                    <label htmlFor="email" className="form-label">
                                                        <FaEnvelope className="me-2" />
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        value={newCustomer.email}
                                                        onChange={handleChangeEmail}
                                                    />
                                                    <div className={emailMatch ? "text-success" : "text-danger"}>{emailIndicator}</div>
                                                    <div className="invalid-feedback">{errors.email}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 mx-4 mb-3 mb-lg-4" style={{ paddingLeft: '1em' }}>
                                                    <button type="button" style={{borderRadius: '15px'}} className="btn btn-secondary" onClick={handleAddCustomer}>
                                                        Register
                                                    </button>
                                                </div>
                                                <p className="pb-lg-2" style={{ color: '#393f81', paddingLeft: '2.8em' }}>
                                                    Have an account ?
                                                    <Link to="/login" className="mx-2" style={{ color: 'blue' }}>
                                                        Login here
                                                    </Link>
                                                </p>
                                              
                                                <Link to="#!" className="small text-muted ms-5">Terms of use . </Link>
                                                <Link to="#!" className="small text-muted ms-2">Privacy policy</Link>
                                            </form>
                                        </div>
                                        <div className="col-md-2 col-lg-6 col-xl-5 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src={logo}
                                                className="img-fluid"
                                                alt="Sample image"
                                                style={{height: '60%' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RegisterCustomer;
