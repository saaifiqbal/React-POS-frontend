import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Auth/authSlice';
const store = configureStore({
    reducer:{
        authenticate: authReducer,
    }
})
export default store;