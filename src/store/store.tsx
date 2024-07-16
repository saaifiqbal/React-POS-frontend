import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import customersReducer from "./Slices/customerSlice";

const store = configureStore({
  reducer: {
    authenticate: authReducer,
    customers: customersReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
