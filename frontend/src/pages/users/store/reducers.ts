import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interface";

export interface UserState {
  loading: boolean;
  users: IUser[];
  error: string;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.error = "";
    },
    fetchUsersFailure: (state, { payload }) => {
      state.loading = false;
      state.users = [];
      state.error = payload;
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions;

export default usersSlice.reducer;