import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaGenderless, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import axios from '../../../store/axiosInterceptor';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function AddCustomer() {
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

    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordIndicator, setPasswordIndicator] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [genderTypes, setGenderTypes] = useState([]);

    useEffect(() => {
        axios.get('/gender/v1')
            .then(response => {
                setGenderTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching gender types:', error);
            });
    }, []);


    const handleShowPass = () => {
        let input = document.getElementById("password");
        if (input.type === "password") input.type = "text";
        else input.type = "password";
    };

    const validatePassword = (password) => {
        return /(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,}/.test(password);
    }

    const handleChangePassword = (e) => {
        const newPassword = e.target.value;
        setNewCustomer({ ...newCustomer, password: newPassword });

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
            email: !/^\S+@\S+\.\S+$/.test(newCustomer.email) ? "Please enter a valid email address" : "",
            address: newCustomer.address.trim() === "" ? "Address is required" : "",
            phoneNumber: !/^\d+$/.test(newCustomer.phoneNumber) ? "Phone number must contain only numbers" : "",
            username: newCustomer.username.trim() === "" ? "Username is required" : "",
            password: newCustomer.password.trim() === "" ? "Password is required" : "",
        };

        if (newCustomer.username.includes(" ")) {
            validationErrors.username = "Username cannot contain spaces";
        }

        setErrors(validationErrors);

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
                    title: 'Add Customer Successful',
                    text: 'Your customer adding was successful!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/customer");
                });
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Add Customer Failed',
                    text: 'An error occurred during add Customer. Please try again later.',
                    confirmButtonText: 'OK'
                });
            });
            
    };

    const handleResetForm = () => {
        setNewCustomer({
            fullName: "",
            genderTypeId: "",
            email: "",
            address: "",
            phoneNumber: "",
            username: "",
            password: "",
        });
        setErrors({
            fullName: "",
            genderTypeId: "",
            email: "",
            address: "",
            phoneNumber: "",
            username: "",
            password: "",
        });
    };

    return (
        <section className="section">
            <h2 style={{ margin: "30px 0px 10px 10px" }}>Dashboard</h2>
            <nav>
                <ol className="breadcrumb mb-4" style={{ marginLeft: "10px" }}>
                    <li className="breadcrumb-item"><Link to="/customer" style={{ textDecoration: "none", color: "black" }}>Customer</Link></li>
                    <li className="mx-2">/</li>
                    <li className="breadcrumb-item active">Form Input Kategori</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card p-3" style={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px'}}>
                        <div className="mt-4 ps-3" style={{ width: "550px", marginLeft: "18px" }}>
                            <button className="btn btn-warning btn-sm fw-bold" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px'}} title="Kembali" onClick={() => navigate("/customer")}>
                                <i className="fa fa-arrow-circle-left"></i> Back
                            </button>
                        </div>
                        <div className="card-body p-5">
                            <h3 className="card-title text-center mb-5">Form Add Customer</h3>
                            <form className="row g-3" onSubmit={handleAddCustomer}>
                                <div className="col-6">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                        value={newCustomer.fullName}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, fullName: e.target.value })}
                                        style={{ borderColor: 'red'}} 
                                    />

                                    <div className="invalid-feedback">{errors.fullName}</div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="genderTypeId" className="form-label">Gender</label>
                                    <select
                                        id="genderTypeId"
                                        className={`form-select ${errors.genderTypeId ? 'is-invalid' : ''}`}
                                        value={newCustomer.genderTypeId}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, genderTypeId: e.target.value })}
                                    >
                                        <option value="" disabled>Select gender</option>
                                        {genderTypes.map(gender => (
                                            <option key={gender.id} value={gender.id}>{gender.name}</option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">{errors.genderTypeId}</div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            onChange={handleChangePassword}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        />
                                        <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    <div className={passwordMatch ? "text-success" : "text-danger"}>{passwordIndicator}</div>
                                    <div className="invalid-feedback">{errors.password}</div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        value={newCustomer.username}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, username: e.target.value })}
                                    />
                                    <div className="invalid-feedback">{errors.username}</div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        value={newCustomer.address}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                                    />
                                    <div className="invalid-feedback">{errors.address}</div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                        value={newCustomer.phoneNumber}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                                    />
                                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={newCustomer.email}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                    />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>
                                <div className="text-center" style={{paddingTop: '30px'}}>
                                    <button type="submit" className="btn btn-success me-3" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px'}}>Add Customer</button>
                                    <button type="button" className="btn btn-dark" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px'}} onClick={handleResetForm}>Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddCustomer;
