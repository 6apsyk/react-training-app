import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  error: false,
  loading: false,
  userEmail: "",
  uid: "none",
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuth, setUserEmail, setLoading, setError, setUserUid } = appSlice.actions;

export default appSlice.reducer;
