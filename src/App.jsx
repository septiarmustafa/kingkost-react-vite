import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { setAuthenticated, setAuthUserId, setAuthUsername, setAuthEmail, setAuthRole } from './store/authSlice';

import Home from "./pages/Home";
import PageAbout from "./pages/PageAbout";
import PageTestimonial from "./pages/PageTestimonial";
import PageTeam from "./pages/PageTeam";
// import Login from "./components/Login/Login";
import PageContact from "./pages/PageContact";
import PageTermsAndConditions from "./pages/PageTermsAndConditions";
import PageKosan from "./pages/PageKosan";
import PageBooking from "./pages/PageBooking";
import PageDetailKosan from "./pages/PageDetailKosan";
import PageProfile from "./pages/PageProfile";

const cliendId = "574506119134-iobilhshvcia2ums2k0h0bp9kaoetcma.apps.googleusercontent.com";

import { gapi } from "gapi-script";
import PageRegisterCustomer from "./pages/PageRegisterCustomer";
import PageSelectRegister from "./pages/PageSelectRegister";
import PageRegisterSeller from "./pages/PageRegisterSeller";
import PageEditProfile from "./pages/PageEditProfile";
import LoginCustomer from "./components/Login/LoginCustomer";
import LoginSeller from "./components/Login/LoginSeller";
import LoginAdmin from "./components/Login/LoginAdmin";
import SelectLogin from "./components/Login/SelectLogin";
import PageDashboard from "./pages/Admin/PageDashboard/PageDashboard";
import PageCustomer from "./pages/Admin/PageCustomer/PageCustomer";
import PageAddCustomer from "./pages/Admin/PageCustomer/PageAddCustomer";
import PageUpdateCustomer from "./pages/Admin/PageCustomer/PageUpdateCustomer";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        cliendId: cliendId,
        scope: "",
      })
    };
    gapi.load('client:auth2', start)
  })
  
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authentication.isAuthenticated);

  useEffect(() => {
    const initializeUserData = () => {
      const storedUserData = localStorage.getItem('userLogin');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        dispatch(setAuthenticated(true));
        dispatch(setAuthUserId(userData.userId));
        dispatch(setAuthUsername(userData.username));
        dispatch(setAuthEmail(userData.email));
        dispatch(setAuthRole(userData.role));
      }
    };

    initializeUserData();
  }, [dispatch]);

  // Logika redirect berdasarkan role
  const role = useSelector((state) => state.authentication.role);

  return (
    <>
      <Routes>
      {/* <Route
        path="/login"
        element={isLoggedIn ? (
          // Jika pengguna sudah login
          role === "ROLE_SELLER" || role === "ROLE_ADMIN" ? (
            // Jika role adalah ROLE_SELLER atau ROLE_ADMIN, redirect ke Dashboard
            <Navigate to="/dashboard" replace />
          ) : role === "ROLE_CUSTOMER" ? (
            // Jika role adalah ROLE_CUSTOMER, redirect ke Home
            <Navigate to="/" replace />
          ) : (
            // Jika role tidak sesuai dengan yang diharapkan, tampilkan halaman Home
            <Home />
          )
        ) : (
          // Jika pengguna belum login, tampilkan halaman Login
          <Login />
        )}
      /> */}

        <Route path={"/login"} element={<SelectLogin />} />

        <Route
          path="/login/customer"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role === "ROLE_SELLER" || role === "ROLE_ADMIN" ? (
                // Jika role adalah ROLE_SELLER atau ROLE_ADMIN, redirect ke Dashboard
                <Navigate to="/dashboard" replace />
              ) : role === "ROLE_CUSTOMER" ? (
                // Jika role adalah ROLE_CUSTOMER, redirect ke Home
                <Navigate to="/" replace />
              ) : (
                // Jika role tidak sesuai dengan yang diharapkan, tampilkan halaman Home
                <Home />
              )
            ) : (
              // Jika pengguna belum login, tampilkan halaman LoginCustomer
              <LoginCustomer />
            )
        }
        />

        <Route
          path="/login/seller"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role === "ROLE_SELLER" ? (
                // Jika role adalah ROLE_SELLER, redirect ke halaman Seller Dashboard
                <Navigate to="/dashboard" replace />
              ) : (
                // Jika role pengguna bukan ROLE_SELLER, tampilkan halaman Home
                <Home />
              )
            ) : (
              // Jika pengguna belum login, tampilkan halaman LoginSeller
              <LoginSeller />
            )
        }
        />

        <Route
          path="/login/admin"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role === "ROLE_ADMIN" ? (
                // Jika role adalah ROLE_ADMIN, redirect ke halaman Admin Dashboard
                <Navigate to="/dashboard" replace />
              ) : (
                // Jika role pengguna bukan ROLE_ADMIN, tampilkan halaman Home
                <Home />
              )
            ) : (
              // Jika pengguna belum login, tampilkan halaman LoginAdmin
              <LoginAdmin />
            )
        }
        />


        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register/customer" element={<PageRegisterCustomer />} />
        <Route path="/register/seller" element={<PageRegisterSeller />} />
        <Route path="/register" element={<PageSelectRegister />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/testimonial" element={<PageTestimonial />} />
        <Route path="/team" element={<PageTeam />} />

        <Route path="/contact" element={<PageContact />} />
        <Route path="/TermsAndConditions" element={<PageTermsAndConditions />} />

        <Route path="/kosan" element={<PageKosan />} />
        {/* <Route path="/detailkosan/:id" component={PageDetailKosan} /> */}

        <Route path="/detailkosan/:id" element={<PageDetailKosan/>} />

        <Route path="/booking" element={<PageBooking />} />

        <Route path="/profile" element={<PageProfile />} />
        <Route path="/edit-profile/:id" element={<PageEditProfile />} />


        <Route path="/dashboard" element={<PageDashboard />} />
        <Route path="/customer" element={<PageCustomer />} />
        <Route path="/addCustomer" element={<PageAddCustomer />} />
        <Route path="/updateCustomer/:id" element={<PageUpdateCustomer />} />

      </Routes>
    </>
  );
}

export default App;
