/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
} from "../../server/customers";

interface LoginArgs {
  params: any;
  onSuccess: () => void;
  onError: () => void;
}
interface createArgs {
  data: any;
  onSuccess: () => void;
  onError: () => void;
}

// Create the async thunk
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomer",
  async ({ params, onSuccess, onError }: LoginArgs) => {
    console.log("params", params);
    return await getCustomers(params, onSuccess, onError);
  }
);

export const fetchCreateUpdateCustomer = createAsyncThunk<void, createArgs>(
  "customers/fetchCreateUpdateCustomer",
  async ({ data, onSuccess, onError }, { rejectWithValue }) => {
    try {
      if (data.id)
        return await updateCustomer(data.id, data, onSuccess, onError);
      else return await createCustomer(data, onSuccess, onError);
    } catch (error) {
      onError();
      return rejectWithValue(error);
    }
  }
);
