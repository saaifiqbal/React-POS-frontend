import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateUpdateCustomer,
  fetchCustomers,
  fetchDeleteCustomer,
} from "../thunks/customer";

interface initialType {
  customers: Array<object>;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  total: number;
}

const initialState: initialType = {
  customers: [],
  isLoading: false,
  isError: false,
  error: "",
  total: 0,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload?.data?.data;
        state.total = action.payload?.data?.total;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchCreateUpdateCustomer.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCreateUpdateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Create customer", action.payload);
        // state.customers = action.payload?.data?.data;
        // state.total = action.payload?.data?.total;
      })
      .addCase(fetchCreateUpdateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchDeleteCustomer.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchDeleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("delete customer", action.payload);
        // state.customers = action.payload?.data?.data;
        // state.total = action.payload?.data?.total;
      })
      .addCase(fetchDeleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});
export default customerSlice.reducer;
