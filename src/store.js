import userSlice from "./features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./features/job/jobSlice";

export const store = configureStore({
  reducer: { user: userSlice, job: jobSlice },
});
