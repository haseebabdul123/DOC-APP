import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlide";
import { userSlice } from "./features/userSlice";

export default configureStore({
  reducer: {
    alert: alertSlice.reducer,
    user: userSlice.reducer,
  },
});
