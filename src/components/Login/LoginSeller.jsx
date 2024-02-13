import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUserSeller, selectLoading } from "../../store/userSlice";
import { Link } from 'react-router-dom';
import Logo1 from '../../assets/img/logo_king.png';
import { GoogleLogin } from "react-google-login";

import Swal from 'sweetalert2';

const clientId = "574506119134-iobilhshvcia2ums2k0h0bp9kaoetcma.apps.googleusercontent.com";

function LoginSeller() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const validateForm = () => {
    const validationErrors = {
      username: username.trim() === "" ? "Username is required" : "",
      password: password.trim() === "" ? "Password is required" : "",
    };

    setErrors(validationErrors);

    return Object.values(validationErrors).every(error => error === "");
  };

const handleLogin = async () => {
  try {
    if (!validateForm()) {
      // Display error message if form is not valid
      return;
    }

    if (location.pathname.startsWith("/login")) {
      await dispatch(loginUserSeller(username, password));

      // Ambil data user dari local storage setelah login berhasil
      const user = JSON.parse(localStorage.getItem("userLogin"));

      if (user && user.active) { // Memeriksa apakah status seller aktif setelah login berhasil
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successful!',
          showConfirmButton: false,
          timer: 1500 // Menutup alert setelah 1.5 detik
        });
      } else if (user && !user.active) { // Jika status seller tidak aktif
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Status seller belum aktif!',
          confirmButtonText: 'OK'
        });
      }
    }
  } catch (error) {
    console.error("Login failed:", error);
    // Handle error, if needed
    setErrors({ ...errors, general: "Invalid username or password" }); // Set error message for invalid login
  }
};

  

  const onSuccess = (res) => {
    console.log("Successfully logged in, Current User: ", res.profileObj);
    navigate('/'); 
  }
  
  const onFailure = (res) => {
    console.log("Login Failed, Res : " + res)
  }

  return (
    <>
        <section className="nav" style={{ background: 'linear-gradient(to bottom, #a36903, #873f00)', padding: '4em' }}>
          <div className="container" style={{padding: '2em'}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-12">
                <div className="card" style={{ borderRadius: '2rem'}}>
                  <div className="row container-fluid">
                    <div className="col-md-6 col-lg-6 d-none d-md-block py-5 px-5">
                      <img src={Logo1} alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', paddingTop: '5em' }} />
                    </div>
                    <div className="col-md-6 col-lg-6 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form>
                          <div className='w-20 mb-3'>
                            <Link to="/login" className="btn btn-outline-primary" style={{ borderRadius: '10px' }}>
                                <i className="fas fa-arrow-left"> Back </i>
                            </Link>
                          </div>

                          <div className="d-flex align-items-center mb-3 pb-1 ms-5 mt-4">
                            <i className="fas fa-crown fa-2x mx-4 mb-4" style={{ color: 'black' }}></i>
                            <span className="h1 fw-bold mb-3">KingKos App</span>
                          </div>

                          <h5 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                          <div className="mb-3">
                            <label htmlFor="inputUsername" className="form-label">
                              Username <label htmlFor="" style={{color: 'red'}}>*</label>
                            </label>
                            <input
                              type="text" 
                              className="form-control"
                              id="inputUsername"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)} 
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                          </div>

                          <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">
                              Password <label htmlFor="" style={{color: 'red'}}>*</label>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                          </div>

                          {errors.general && <div className="text-danger mb-4">{errors.general}</div>}

                          <div className="mb-3 form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="rememberMe"
                              defaultChecked
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                              Remember me
                            </label>
                          </div>

                          <div className="mb-3">
                            <a href="#!" className="text-decoration-none" style={{color: 'blue'}}>
                              Forgot password?
                            </a>
                          </div>

                          <button
                            type="button"
                            className="btn btn-warning btn-block mb-3 fw-bold"
                            style={{borderRadius: '10px'}}
                            onClick={handleLogin}
                          >
                            Sign in
                          </button>

                          <p className="pb-lg-2" style={{ color: '#393f81', paddingTop: '1em' }}>
                            Don't have an account ? 
                            <Link to="/register" className="mx-2" style={{color: 'blue'}}>
                              Register here
                            </Link>
                          </p>

                          <div className=" mb-4">
                            <p>Login with:</p>
                            <div id="signInButton" >
                              <GoogleLogin 
                                clientId={clientId}
                                buttonText="Login"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                              />
                            </div>
                          </div>

                          <Link to="#!" className="small text-muted">Terms of use. </Link>
                          <Link to="#!" className="small text-muted">Privacy policy</Link>
                        </form>
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

export default LoginSeller;
