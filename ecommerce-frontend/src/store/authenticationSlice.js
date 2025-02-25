import { createSlice } from "@reduxjs/toolkit";
const authenticationSlide = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userProfile: {},
  },
  reducers: {
    authenticate(state, action) {
      state.isAuthenticated = true;
      state.userProfile = action.payload;
    },
    unAuthenticate(state) {
      state.isAuthenticated = false;
      state.userProfile = {};
    },
  },
});
export const authenticationActions = authenticationSlide.actions;
export default authenticationSlide;
