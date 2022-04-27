import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0
};


const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state, action) {
      return { ...state, value: state.value + 1 };
    },
    decrement(state, action) {
      return { ...state, value: state.value - 1 };
    },
    incrementByAmount(state, action) {
      return { ...state, value: state.value + action.payload };
    },
    decrementByAmount(state, action) {
      return { ...state, value: state.value - action.payload };
    }
  }
});
export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount
} = counterSlice.actions;
export default counterSlice.reducer;

