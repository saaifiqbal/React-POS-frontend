import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCustomers } from "../../server/customers";

const initialState: {
  data: Array<object>;
  select: object;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
} = {
  data: [],
  select: {},
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomer",
  async () => {
    const customers = await getCustomers();
    return customers;
  }
);
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setAllCustomerAction: (state, action) => {
      state.data = action.payload;
    },
    setSelectCustomerAction: (state, action) => {
      state.select = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state)=>{
      state.isError = false;
      state.isLoading = true;
    }).addCase(fetchCustomers.fulfilled, (state, action)=> {
      state.isLoading = false;
      state.data = action.payload;
    }).addCase(fetchCustomers.rejected, (state, action)=>{
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    })


  },
});
export default customerSlice.reducer;
export const { setAllCustomerAction, setSelectCustomerAction } =
  customerSlice.actions;
