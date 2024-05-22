import { createSlice } from "@reduxjs/toolkit";

const initialState = {data:[]}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        authAction: (state, action) => {
            state.data = action.payload;
        }
    }
});
export default authSlice.reducer;
export const {authAction} = authSlice.actions;