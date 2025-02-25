import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authenticationSlice";
const store = configureStore({
  reducer: { auth: authenticationSlice.reducer },
});
export default store;
