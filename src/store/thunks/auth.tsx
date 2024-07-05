/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser, onLogin, onLogout } from "../../server/auth";

interface LoginArgs {
  data: any;
  onSuccess: () => void;
  onError: () => void;
}

interface UserArgs {
  onSuccess: () => void;
  onError: () => void;
}

// Create the async thunk
export const fetchLogin = createAsyncThunk(
  "auth/login",
  async ({ data, onSuccess, onError }: LoginArgs) => {
    return await onLogin(data, onSuccess, onError);
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/logout",
  async ({ onSuccess, onError }: UserArgs) => {
    return await onLogout(onSuccess, onError);
  }
);

export const getUser = createAsyncThunk<void, UserArgs>(
    "auth/getUser",
    async ({ onSuccess, onError }) => {
      try {
        const response = await currentUser();
        onSuccess();
        console.log("response", response)
        return response; // Adjust this based on your API response structure
      } catch (error) {
        onError();
        throw error;
      }
    }
  );