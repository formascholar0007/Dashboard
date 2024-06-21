import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      console.log(action.payload)
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUser: (state, action) => {
      state.userInfo = null;
      // localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
