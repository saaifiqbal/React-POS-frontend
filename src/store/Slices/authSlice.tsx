import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [], user: {} };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authAction: (state, action) => {
      state.data = action.payload;
    },
    userAction: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default authSlice.reducer;
export const { authAction, userAction } = authSlice.actions;
