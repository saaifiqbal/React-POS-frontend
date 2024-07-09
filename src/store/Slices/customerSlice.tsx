import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomers } from "../thunks/customer";

interface initialType {
  customers: Array<object>;
  select: object;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  total: number
}

const initialState: initialType = {
  customers: [],
  select: {},
  isLoading: false,
  isError: false,
  error: "",
  total: 0
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
        console.log("state Select Data for customer", action.payload?.data);
        state.customers = action.payload?.data?.data;
        state.total = action.payload?.data?.total;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});
export default customerSlice.reducer;
