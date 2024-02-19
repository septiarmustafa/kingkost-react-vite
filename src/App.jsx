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


import PageRegisterCustomer from "./pages/PageRegisterCustomer";
import PageSelectRegister from "./pages/PageSelectRegister";
import PageRegisterSeller from "./pages/PageRegisterSeller";
import PageEditProfile from "./pages/PageEditProfile";


import Login from "./components/Login/Login";
// import LoginCustomer from "./components/Login/LoginCustomer";
// import LoginSeller from "./components/Login/LoginSeller";
// import LoginAdmin from "./components/Login/LoginAdmin";
// import SelectLogin from "./components/Login/SelectLogin";
import PageDashboard from "./pages/Admin/PageDashboard/PageDashboard";
import PageCustomer from "./pages/Admin/PageCustomer/PageCustomer";
import PageAddCustomer from "./pages/Admin/PageCustomer/PageAddCustomer";
import PageUpdateCustomer from "./pages/Admin/PageCustomer/PageUpdateCustomer";
import PageDataKosan from "./pages/Admin/PageKosan/PageDataKosan";
import PageDataSeller from "./pages/Admin/PageSeller/PageDataSeller";
import PageAddSeller from "./pages/Admin/PageSeller/PageAddSeller";
import PageUpdateSeller from "./pages/Admin/PageSeller/PageUpdateSeller";
import PageDataTestimonial from "./pages/Admin/PageTestimonial/PageTestimonial";
import PageAddTestimonial from "./pages/Admin/PageTestimonial/PageAddTestimonial";
import PageUpdateTestimonial from "./pages/Admin/PageTestimonial/PageUpdateTestimonial";
import PageAddDataKosan from "./pages/Admin/PageKosan/PageAddDataKosan";
import PageUpdateDataKosan from "./pages/Admin/PageKosan/PageUpdateDataKosan";
import PageMyProfile from "./pages/Admin/PageMyProfile/PageMyProfile";
import PageEditMyProfile from "./pages/Admin/PageMyProfile/PageEditMyProfile";
import PageAddTestimonialCustomer from "./pages/PageAddTestimonialCustomer";

import PageSellectForgotPassword from "./pages/PageSellectForgotPassword.jsx";
import ForgotPasswordCustomer from "./components/ForgotPassword/ForgotPasswordCustomer.jsx";
import ForgotPasswordSeller from "./components/ForgotPassword/ForgotPasswordSeller.jsx";
import PageDataBooking from "./pages/Admin/PageBooking/PageDataBooking.jsx";
import PageAddDataBooking from "./pages/Admin/PageBooking/PageAddDataBooking.jsx";
import PageApproveBooking from "./pages/Admin/PageBooking/PageApproveBooking.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import PageTransactionCust from "./pages/PageTransactionCust.jsx";

function App() {

  
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
        <Route
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
        />

        {/* <Route path={"/login"} element={<SelectLogin />} /> */}
{/* 
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
        /> */}

        {/* <Route
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
        /> */}


        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register/customer" element={<PageRegisterCustomer />} />
        <Route path="/register/seller" element={<PageRegisterSeller />} />
        <Route path="/register" element={<PageSelectRegister />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PageAbout />} />

        <Route path="/testimonial" element={<PageTestimonial />} />
        <Route path="/addTestimonial" element={<PageAddTestimonialCustomer />} />
        
        <Route path="/team" element={<PageTeam />} />

        <Route path="/contact" element={<PageContact />} />
        <Route path="/TermsAndConditions" element={<PageTermsAndConditions />} />

        <Route path="/kosan" element={<PageKosan />} />
        {/* <Route path="/detailkosan/:id" component={PageDetailKosan} /> */}


        <Route path="/booking" element={<PageBooking />} />

        {/* customer */}
        <Route path="/profile" element={<PageProfile />} />
        <Route path="/edit-profile/:id" element={<PageEditProfile />} />


        <Route path="/dashboard" element={<PageDashboard />} />
        
        <Route path="/customer" element={<PageCustomer />} />
        <Route path="/addCustomer" element={<PageAddCustomer />} />
        <Route path="/updateCustomer/:id" element={<PageUpdateCustomer />} />

        <Route path="/datakosan" element={<PageDataKosan />} />
        <Route path="/addDataKosan" element={<PageAddDataKosan />} />
        <Route path="/updateDataKosan/:id" element={<PageUpdateDataKosan />} />

        <Route path="/dataSeller" element={<PageDataSeller />} />
        <Route path="/addDataSeller" element={<PageAddSeller />} />
        <Route path="/updateSeller/:id" element={<PageUpdateSeller />} />

        <Route path="/dataTestimoni" element={<PageDataTestimonial />} />
        <Route path="/addDataTestimoni" element={<PageAddTestimonial />} />
        <Route path="/updateDataTestimoni/:id" element={<PageUpdateTestimonial />} />

        {/* Seller */}
        <Route path="/myProfile" element={<PageMyProfile />} />
        <Route path="/edit-myProfile/:id" element={<PageEditMyProfile />} />

        <Route path="forgot-password" element={<PageSellectForgotPassword/>}/>
        <Route path="/forgot-password/seller" element={<ForgotPasswordSeller/>}/>
        <Route path="/forgot-password/customer" element={<ForgotPasswordCustomer/>}/>

        <Route path="/dataBooking" element={<PageDataBooking />} />
        <Route path="/addDataBooking" element={<PageAddDataBooking />} />

        <Route path="/approveBooking/:id" element={<PageApproveBooking />} />

        <Route path="/notFound" element={<PageNotFound />} />


        <Route path="/detailkosan/:id" element={<PageDetailKosan/>}/>
        <Route path="/myBooking" element={<PageTransactionCust/>}/>


         {/* <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role === "ROLE_ADMIN" || role === "ROLE_SELLER" ? (
                // Jika rolenya adalah ROLE_ADMIN atau ROLE_SELLER, tampilkan halaman Dashboard
                <PageDashboard />
              ) : (
                // Jika rolenya bukan ROLE_ADMIN atau ROLE_SELLER, redirect ke halaman Home
                <Navigate to="/" replace />
              )
            ) : (
              // Jika pengguna belum login, redirect ke halaman Login
              <Navigate to="/loginfsfs" replace />
            )
          }
        /> */}



        {/* <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role === "ROLE_ADMIN" || role === "ROLE_SELLER" ? (
                // Jika rolenya adalah ROLE_ADMIN atau ROLE_SELLER, tampilkan halaman Dashboard
                <PageDashboard />
              ) : (
                // Jika rolenya bukan ROLE_ADMIN atau ROLE_SELLER, redirect ke halaman Home
                <Navigate to="/" replace />
              )
            ) : (
              // Jika pengguna belum login, redirect ke halaman Login
              <Navigate to="/login" replace />
            )
        }
        />


        <Route
          path="/customer"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role !== "ROLE_CUSTOMER" ? (
                // Jika rolenya bukan ROLE_CUSTOMER, tampilkan halaman Customer
                <PageCustomer />
              ) : (
                // Jika rolenya adalah ROLE_CUSTOMER, redirect ke halaman Home
                <Navigate to="/" replace />
              )
            ) : (
              // Jika pengguna belum login, redirect ke halaman Login
              <Navigate to="/login" replace />
            )
        }
        />

        <Route
          path="/addCustomer"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role !== "ROLE_CUSTOMER" ? (
                // Jika rolenya bukan ROLE_CUSTOMER, tampilkan halaman Add Customer
                <PageAddCustomer />
              ) : (
                // Jika rolenya adalah ROLE_CUSTOMER, redirect ke halaman Home
                <Navigate to="/" replace />
              )
            ) : (
              // Jika pengguna belum login, redirect ke halaman Login
              <Navigate to="/login" replace />
            )
        }
        />

        <Route
          path="/updateCustomer/:id"
          element={
            isLoggedIn ? (
              // Jika pengguna sudah login
              role !== "ROLE_CUSTOMER" ? (
                // Jika rolenya bukan ROLE_CUSTOMER, tampilkan halaman Update Customer
                <PageUpdateCustomer />
              ) : (
                // Jika rolenya adalah ROLE_CUSTOMER, redirect ke halaman Home
                <Navigate to="/" replace />
              )
            ) : (
              // Jika pengguna belum login, redirect ke halaman Login
              <Navigate to="/login" replace />
            )
        }
        /> */}

      </Routes>
    </>
  );
}

export default App;
