import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { createHashHistory } from "history";
import { createSlice } from "@reduxjs/toolkit";
// const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true"
//   );

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("LoginValue", action.payload);

      // console.log(action);
      // return { ...state, isLoggedIn: localStorage.setItem("isLoggedIn", true),  };
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      // localStorage.removeItem("LoginValue");
      // localStorage.removeItem("avatar");
      // localStorage.removeItem("age");
    },
  },
});
export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
// export default authSlice.reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
