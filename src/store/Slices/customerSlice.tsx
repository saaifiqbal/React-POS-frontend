import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [], select: {} };
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
});
export default customerSlice.reducer;
export const { setAllCustomerAction, setSelectCustomerAction } =
  customerSlice.actions;
