import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../pages/users/store/reducers";
import authReducer, { login } from "../pages/login/store/reducers";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  exp: number;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const token = localStorage.getItem("token");

console.log("token", token);

if (token && isTokenValid(token)) {
  store.dispatch(login(token));
}else{
    localStorage.removeItem("token");
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
