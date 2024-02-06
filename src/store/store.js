// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import authenticationReducer from "./authSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    authentication: authenticationReducer,
  },
});

export default store;
