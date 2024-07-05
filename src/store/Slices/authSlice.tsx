/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLogin, fetchLogout, getUser } from "../thunks/auth";


interface AuthState {
  authData: any[]; // Replace with the actual type
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: AuthState = {
  authData: [],
  isLoading: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    };

    const handleRejected = (state: AuthState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message ?? "Unknown error";
      localStorage.removeItem("token");
    };

    builder
      // Login  
      .addCase(fetchLogin.pending, handlePending)
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        console.log(" login payload", action.payload )
        state.authData = action.payload?.data ?? [];
        const token = action.payload?.access_token;
        if (token) {
          localStorage.setItem("token", token);
        }
      })
      .addCase(fetchLogin.rejected, handleRejected)

      // Logout  
      .addCase(fetchLogout.pending, handlePending)
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.authData = [];
        localStorage.removeItem("token");
      })
      .addCase(fetchLogout.rejected, handleRejected)

      // get user 
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        console.log("payload",action.payload?.data)
        state.authData = action.payload?.data ?? [];
        const token = action.payload?.access_token;
        if (token) {
          localStorage.setItem("token", token);
        }
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        handleRejected(state, action); // Handle rejection in the same way as other actions
        // Optionally handle additional onError logic here if needed
      });
  },
});

export default authSlice.reducer;
