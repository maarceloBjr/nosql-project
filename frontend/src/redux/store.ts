import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../pages/users/store/reducers";
import authReducer, { login } from "../pages/login/store/reducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

const token = localStorage.getItem("token");
if (token) {
  store.dispatch(login(token));
}


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
