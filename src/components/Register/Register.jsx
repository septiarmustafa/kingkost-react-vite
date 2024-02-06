import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eye from '../../assets/img/eye.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import logo from '../../assets/img/regis.png'

function RegisterAdmin() {
    const togglePass = "../assets/images/eye.svg";
    const url = "http://localhost:8080/api/auth/register/admin";

    const navigate = useNavigate();

    const [newAdmin, setNewAdmin] = useState({
        fullname: "",
        gender: "",
        email: "",
        address: "",
        phoneNumber: "",
        username: "",
        password: "",
    });

    const handleShowPass = () => {
        let input = document.getElementById("setPassword");
        if (input.type === "password") input.type = "text";
        else input.type = "password";
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();

        if (newAdmin.email !== "" && newAdmin.username !== "" && newAdmin.password !== "" && newAdmin.fullname !== "") {
            axios.post(url, newAdmin)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'You have successfully registered as an admin!',
                    });
                    navigate("/");
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Error',
                        text: 'An error occurred during registration. Please try again later.',
                    });
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Input Error',
                text: 'Fields cannot be empty. Please fill in all the required information.',
            });
        }
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
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                                                Admin Registration
                                            </p>
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center ">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control mt-4"
                                                            onChange={e => setNewAdmin({ ...newAdmin, fullname: e.target.value })}
                                                        />
                                                        <label className="form-label mt-2" htmlFor="form3Example1c">
                                                            Full Name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select
                                                            id="form3Example1c"
                                                            className="form-select mt-4"
                                                            onChange={e => setNewAdmin({ ...newAdmin, gender: e.target.value })}
                                                        >
                                                            <option value="" disabled selected>Select gender</option>
                                                            <option value="Putra">Putra</option>
                                                            <option value="Putri">Putri</option>
                                                        </select>
                                                        <label className="form-label mt-2" htmlFor="form3Example1c">
                                                            Gender
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" style={{ marginTop: '-1.5em' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="setPassword"
                                                            className="form-control mt-4"
                                                            onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                                        />
                                                        <label className="form-label mt-2" htmlFor="form3Example4c">
                                                            Password
                                                        </label>
                                                        <div className='mt-1'>
                                                            <img src={eye} style={{ height: '20px', width: '20px', cursor: 'pointer' }} id="showHidePass" onClick={handleShowPass} /> Show Password
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center ">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control mt-4"
                                                            onChange={e => setNewAdmin({ ...newAdmin, username: e.target.value })}
                                                        />
                                                        <label className="form-label mt-2" htmlFor="form3Example1c">
                                                            Username
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center ">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control mt-4"
                                                            onChange={e => setNewAdmin({ ...newAdmin, address: e.target.value })}
                                                        />
                                                        <label className="form-label mt-2" htmlFor="form3Example1c">
                                                            Address
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center ">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control mt-4"
                                                            onChange={e => setNewAdmin({ ...newAdmin, phoneNumber: e.target.value })}
                                                        />
                                                        <label className="form-label mt-2" htmlFor="form3Example1c">
                                                            Phone Number
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* Email */}
                                                <div className="d-flex flex-row align-items-center">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control mt-4"
                                                            onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                                        />
                                                        <label className="form-label mt-2" htmlFor="form3Example3c">
                                                            Email
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="mt-4 mx-4 mb-3 mb-lg-4" style={{ paddingLeft: '1em' }}>
                                                    <button type="button" className="btn btn-primary" onClick={handleAddAdmin}>
                                                        Register
                                                    </button>
                                                </div>
                                                <p className="pb-lg-2" style={{ color: '#393f81', paddingLeft: '2.8em' }}>
                                                    Have an account ?
                                                    <Link to="/" className="mx-2" style={{ color: 'blue' }}>
                                                        Login here
                                                    </Link>
                                                </p>
                                                <p className="" style={{ color: '#393f81', paddingLeft: '2.8em', paddingBottom: '2em' }}>
                                                    You are not an admin ?
                                                    <Link to="/register/customer" className="mx-2" style={{ color: 'blue' }}>
                                                        Register here
                                                    </Link>
                                                </p>
                                                <Link to="#!" className="small text-muted">Terms of use. </Link>
                                                <Link to="#!" className="small text-muted">Privacy policy</Link>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src={logo}
                                                className="img-fluid"
                                                alt="Sample image"
                                                style={{paddingLeft: '10em', height: '60%'}}
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

export default RegisterAdmin;
