import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { setAuthenticated, setAuthId, setAuthUsername, setAuthEmail, setAuthRole } from './store/authSlice';

import Home from "./pages/Home";
import PageAbout from "./pages/PageAbout";
import PageTestimonial from "./pages/PageTestimonial";
import PageTeam from "./pages/PageTeam";
import Login from "./components/Login/Login";
import PageRegister from "./pages/PageRegister";
import PageContact from "./pages/PageContact";
import PageTermsAndConditions from "./pages/PageTermsAndConditions";
import PageKosan from "./pages/PageKosan";
import PageBooking from "./pages/PageBooking";
import DetailKosan from "./components/Kosan/DetailKosan";
import PageDetailKosan from "./pages/PageDetailKosan";

function App() {
  
  const isLoggedIn = useSelector((state) => state.authentication.isAuthenticated);
  console.log(isLoggedIn)

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUserData = () => {
  
      //untuk admin
      const storedAdmin = localStorage.getItem('adminData');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (storedAdmin && isLoggedIn) {
        const user = JSON.parse(storedAdmin);

        dispatch(setAuthenticated(true));
        dispatch(setAuthId(user.id));
        dispatch(setAuthUsername(user.username));
        dispatch(setAuthEmail(user.email));
        dispatch(setAuthRole(user.role));
      }

      //untuk customer
      const storedCustomer = localStorage.getItem('customerData');
      const isLoggedInCs = localStorage.getItem('isLoggedIn') === 'true';

      if (storedCustomer && isLoggedInCs) {
        const customer = JSON.parse(storedCustomer);

        dispatch(setAuthenticated(true));
        dispatch(setAuthId(customer.id));
        dispatch(setAuthUsername(customer.username));
        dispatch(setAuthEmail(customer.email));
        dispatch(setAuthRole(customer.role));
      }
    };

    initializeUserData();
  }, [dispatch]);


  return (
    <>
      <Routes>
        {/* <Route
          path={"/login"}
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path={"/addOrder"}
          element={isLoggedIn ? <PageAddOrder/> : <Login />}
        /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<PageRegister />} />

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





      </Routes>
    </>
  );
}

export default App;
