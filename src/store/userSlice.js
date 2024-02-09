// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthenticated } from "./authSlice";
import Swal from 'sweetalert2'; 

import {  setAuthUserId, setAuthUsername, setAuthEmail, setAuthRole, } from "./authSlice";
import { useNavigate } from "react-router-dom";

const initialIsLoggedIn =
localStorage.getItem("isLoggedIn") === "true" || false;

const initialUserData = JSON.parse(localStorage.getItem("userLogin")) || {};

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: initialUserData.id || "",
    username: initialUserData.username || "",
    email: initialUserData.email || "",
    role: initialUserData.role || "",
    isLoggedIn: initialIsLoggedIn,
    loading: false,
    error: null,   
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.role = "";
      state.isLoggedIn = false;
      localStorage.removeItem("userLogin");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const {
  setUsername,
  setId,
  setEmail,
  setRole,
  setLoggedIn,
  setLoading,
  setError,
  clearError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;

export const selectLoading = (state) => state.user.loading;


export const loginUserCustomer = (username, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post("http://localhost:8080/api/auth/login/customer", {
      username,
      password,
    });

    console.log(response);

    const user = response.data.data; 

    console.log(user);

    if (user) {
      const { userId, username, email, role } = user;

      dispatch(setAuthUserId(userId));
      dispatch(setAuthUsername(username));
      dispatch(setAuthEmail(email));
      dispatch(setAuthRole(role));
      dispatch(setAuthenticated(true));

      console.log(user.token)
      console.log(user.username)
      console.log(user.userId)

      localStorage.setItem("userLogin", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", true);
      console.log("Login Successful!");
      console.log(user, "User Data");

   
    } else {
      dispatch(setError("Invalid credentials"));
      console.log("Login failed: Invalid credentials");

      const navigate = useNavigate();
      navigate('/login');
    }
  } catch (error) {
    dispatch(setError("Error during login"));
    console.error("Error during login:", error);


    const navigate = useNavigate();
    navigate('/login');
  } finally {
    dispatch(setLoading(false));
  }
};


export const loginUserSeller = (username, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post("http://localhost:8080/api/auth/login/seller", {
      username,
      password,
    });

    console.log(response);

    const user = response.data.data; 

    console.log(user);

    if (user) {
      const { userId, username, email, role } = user;

      dispatch(setAuthUserId(userId));
      dispatch(setAuthUsername(username));
      dispatch(setAuthEmail(email));
      dispatch(setAuthRole(role));
      dispatch(setAuthenticated(true));

      console.log(user.token)
      console.log(user.username)
      console.log(user.userId)

      localStorage.setItem("userLogin", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", true);
      console.log("Login Successful!");
      console.log(user, "User Data");

    } else {
      dispatch(setError("Invalid credentials"));
      console.log("Login failed: Invalid credentials");

      const navigate = useNavigate();
      navigate('/login');
    }
  } catch (error) {
    dispatch(setError("Error during login"));
    console.error("Error during login:", error);


    const navigate = useNavigate();
    navigate('/login');
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUserAdmin = (username, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post("http://localhost:8080/api/auth/login/admin", {
      username,
      password,
    });

    console.log(response);

    const user = response.data.data; 

    console.log(user);

    if (user) {
      const { userId, username, email, role } = user;

      dispatch(setAuthUserId(userId));
      dispatch(setAuthUsername(username));
      dispatch(setAuthEmail(email));
      dispatch(setAuthRole(role));
      dispatch(setAuthenticated(true));

      console.log(user.token)
      console.log(user.username)
      console.log(user.userId)

      localStorage.setItem("userLogin", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", true);
      console.log("Login Successful!");
      console.log(user, "User Data");

   
    } else {
      dispatch(setError("Invalid credentials"));
      console.log("Login failed: Invalid credentials");

      const navigate = useNavigate();
      navigate('/login');
    }
  } catch (error) {
    dispatch(setError("Error during login"));
    console.error("Error during login:", error);


    const navigate = useNavigate();
    navigate('/login');
  } finally {
    dispatch(setLoading(false));
  }
};