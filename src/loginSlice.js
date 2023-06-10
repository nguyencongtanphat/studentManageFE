import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setState: (state, action) => {
     console.log("state here", action.payload);
     state.value = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, setState } = loginSlice.actions;

export default loginSlice.reducer;
