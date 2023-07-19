import { createSlice } from "@reduxjs/toolkit";

const getAllUserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAllUsers, setLoading, setError } = getAllUserSlice.actions;

export default getAllUserSlice.reducer;
