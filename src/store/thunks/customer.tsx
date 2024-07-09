/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomers } from "../../server/customers";

interface LoginArgs {
  params: any;
  onSuccess: () => void;
  onError: () => void;
}

// Create the async thunk
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomer",
  async ({ params, onSuccess, onError }: LoginArgs) => {
    console.log('params',params)
    return await getCustomers(params, onSuccess, onError);
  }
);
